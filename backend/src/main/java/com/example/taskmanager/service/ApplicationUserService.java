package com.example.taskmanager.service;

import com.example.taskmanager.dto.request.RequestUserDto;
import com.example.taskmanager.dto.response.AuthResponseDto;
import com.example.taskmanager.dto.response.UserResponseData;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.IOException;

public interface ApplicationUserService
        extends UserDetailsService {
    public AuthResponseDto create(RequestUserDto dto) throws IOException;
    public void initializeUser() throws IOException;

    UserResponseData findData(String tokenHeader);
}