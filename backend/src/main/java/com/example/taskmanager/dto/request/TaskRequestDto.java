package com.example.taskmanager.dto.request;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TaskRequestDto {
    private String title;
    private String description;
    private String status;          // TO_DO | IN_PROGRESS | DONE
}
