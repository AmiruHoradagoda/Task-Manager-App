package com.example.taskmanager.service.Impl;

import com.example.taskmanager.dto.request.RequestUserDto;
import com.example.taskmanager.dto.response.AuthResponseDto;
import com.example.taskmanager.dto.response.UserResponseData;
import com.example.taskmanager.entity.ApplicationUser;
import com.example.taskmanager.exception.DuplicateEntryException;
import com.example.taskmanager.exception.EntryNotFoundException;
import com.example.taskmanager.jwt.JwtConfig;
import com.example.taskmanager.repository.ApplicationUserRepo;
import com.example.taskmanager.service.ApplicationUserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ApplicationUserServiceImpl implements ApplicationUserService {
    private final ApplicationUserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;
    private final SecretKey secretKey;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<ApplicationUser> selectedUserData = userRepo.findByUsername(username);
        if (selectedUserData.isEmpty()) {
            throw new EntryNotFoundException(String.format("username %s not found", username));
        }

        ApplicationUser user = selectedUserData.get();

        // Create a Spring Security User with empty authorities (no roles)
        return new User(
                user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                user.isAccountNonExpired(),
                user.isCredentialsNonExpired(),
                user.isAccountNonLocked(),
                Collections.emptyList()  // No authorities/roles
        );
    }

    @Override
    public AuthResponseDto create(RequestUserDto dto) throws IOException {
        Optional<ApplicationUser> selectedUser = userRepo.findByUsername(dto.getUsername());
        if (selectedUser.isPresent()) {
            throw new DuplicateEntryException(String.format("user with email (%s) exists", dto.getUsername()));
        }

        // Save the new user
        ApplicationUser savedUser = userRepo.save(createApplicationUser(dto));

        // Generate JWT token for the new user
        String token = Jwts.builder()
                .setSubject(savedUser.getUsername())
                .claim("authorities", Collections.emptyList()) // No specific authorities for basic auth
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                .signWith(secretKey)
                .compact();

        // Return response with token and user details
        return AuthResponseDto.builder()
                .username(dto.getUsername())
                .fullName(dto.getFullName())
                .token(token)
                .build();
    }

    @Override
    public void initializeUser() throws IOException {
        Optional<ApplicationUser> selectedUser = userRepo.findByUsername("amiru@gmail.com");
        if (selectedUser.isPresent()) {
            return;
        }

        userRepo.save(
                ApplicationUser.builder()
                        .userId(UUID.randomUUID().toString())
                        .username("amiru@gmail.com")
                        .password(passwordEncoder.encode("amiru@1234"))
                        .fullName("Amiru Mithsara")
                        .isAccountNonExpired(true)
                        .isAccountNonLocked(true)
                        .isCredentialsNonExpired(true)
                        .isEnabled(true).build()
        );
    }

    @Override
    public UserResponseData findData(String tokenHeader) {
        String realToken = tokenHeader.replace(jwtConfig.getTokenPrefix(), "");
        Jws<Claims> claimsJws = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(realToken);
        String username = claimsJws.getBody().getSubject();
        Optional<ApplicationUser> selectedUser = userRepo.findByUsername(username);
        if (selectedUser.isEmpty()) {
            throw new EntryNotFoundException(String.format("username %s not found", username));
        }
        return UserResponseData.builder()
                .username(selectedUser.get().getUsername())
                .fullName(selectedUser.get().getFullName())
                .build();
    }

    private ApplicationUser createApplicationUser(RequestUserDto dto) throws IOException {
        if (dto == null) {
            throw new RuntimeException("something went wrong..");
        }

        return ApplicationUser.builder()
                .userId(UUID.randomUUID().toString())
                .username(dto.getUsername().trim())
                .password(passwordEncoder.encode(dto.getPassword()))
                .fullName(dto.getFullName().trim())
                .isAccountNonExpired(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .isEnabled(true)
                .build();
    }
}