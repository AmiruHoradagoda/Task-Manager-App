package com.example.taskmanager.dto.request;

import java.time.LocalDateTime;

public class TaskRequestDto {
    private Long id;
    private String title;
    private String description;
    private String status;          // TO_DO | IN_PROGRESS | DONE
    private LocalDateTime createdAt;
}
