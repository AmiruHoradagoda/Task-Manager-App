package com.example.taskmanager.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String status;          // TO_DO | IN_PROGRESS | DONE
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private ApplicationUser user;
}

