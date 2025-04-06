package com.example.taskmanager.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDto {
    private String username;
    private String fullName;
    private String token;
}