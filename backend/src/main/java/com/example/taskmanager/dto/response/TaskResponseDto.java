package com.example.taskmanager.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TaskResponseDto {
    private Long id;
    private String title;
    private String description;
    private String status;          // TO_DO | IN_PROGRESS | DONE
    private LocalDateTime createdAt;
}
