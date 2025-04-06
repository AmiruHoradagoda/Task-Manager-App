package com.example.taskmanager.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDto {
    private String userId;
    private String fullName;
    private String username;
    private String token;
}