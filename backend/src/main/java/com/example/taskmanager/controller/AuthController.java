package com.example.taskmanager.controller;

import com.example.taskmanager.dto.request.AuthRequestDto;
import com.example.taskmanager.dto.request.RequestUserDto;
import com.example.taskmanager.dto.response.AuthResponseDto;
import com.example.taskmanager.service.ApplicationUserService;
import com.example.taskmanager.service.Impl.AuthenticationService;
import com.example.taskmanager.utility.StandardResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final ApplicationUserService userService;
    private final AuthenticationService authenticationService;
    @Autowired
    public AuthController(ApplicationUserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<StandardResponseDto> login(@RequestBody AuthRequestDto request) {
        AuthResponseDto authResponse = authenticationService.login(request.getUsername(), request.getPassword());

        return ResponseEntity.ok(
                StandardResponseDto.builder()
                        .code(200)
                        .message("Login successful")
                        .data(authResponse)
                        .build()
        );
    }
    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Register a new user in the system")
    public ResponseEntity<StandardResponseDto> registerUser(@RequestBody RequestUserDto userDto) throws IOException {
        AuthResponseDto authResponseDto = userService.create(userDto);
        return new ResponseEntity<>(
                StandardResponseDto.builder()
                        .code(201)
                        .message("User registered successfully")
                        .data(authResponseDto)
                        .build(),
                HttpStatus.CREATED
        );
    }

}