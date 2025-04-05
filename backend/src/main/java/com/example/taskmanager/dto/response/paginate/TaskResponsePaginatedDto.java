package com.example.taskmanager.dto.response.paginate;

import com.example.taskmanager.dto.response.TaskResponseDto;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@Builder
public class TaskResponsePaginatedDto {
    private long dataCount;
    private List<TaskResponseDto> dataList;
}