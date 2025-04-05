package com.example.taskmanager.entity;

import lombok.*;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Task {
    private Long id;
    private String title;
    private String description;
    private String status;          // TO_DO | IN_PROGRESS | DONE
    private LocalDateTime createdAt;
}

