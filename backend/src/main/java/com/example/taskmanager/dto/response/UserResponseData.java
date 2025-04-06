package com.example.taskmanager.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseData {
    private String username;
    private String fullName;
}