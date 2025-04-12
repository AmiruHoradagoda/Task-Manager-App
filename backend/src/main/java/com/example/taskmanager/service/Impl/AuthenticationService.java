package com.example.taskmanager.service.Impl;

import com.example.taskmanager.dto.response.AuthResponseDto;
import com.example.taskmanager.entity.ApplicationUser;
import com.example.taskmanager.exception.EntryNotFoundException;
import com.example.taskmanager.jwt.JwtConfig;
import com.example.taskmanager.repository.ApplicationUserRepo;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.LocalDate;
import java.util.Date;

@Service
public class AuthenticationService {
    private final ApplicationUserRepo userRepo;
    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            ApplicationUserRepo userRepo,
            JwtConfig jwtConfig,
            SecretKey secretKey,
            AuthenticationManager authenticationManager) {
        this.userRepo = userRepo;
        this.jwtConfig = jwtConfig;
        this.secretKey = secretKey;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponseDto login(String username, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            String token = Jwts.builder()
                    .setSubject(authentication.getName())
                    .claim("authorities", authentication.getAuthorities())
                    .setIssuedAt(new Date())
                    .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                    .signWith(secretKey)
                    .compact();

            ApplicationUser user = userRepo.findByUsername(username)
                    .orElseThrow(() -> new EntryNotFoundException("User not found"));

            return AuthResponseDto.builder()
                    .userId(user.getUserId())
                    .username(username)
                    .fullName(user.getFullName())
                    .token(token)
                    .build();
        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid username/password", e);
        }
    }
}