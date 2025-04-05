package com.example.taskmanager.service;

import com.example.taskmanager.dto.request.TaskRequestDto;
import com.example.taskmanager.dto.response.TaskResponseDto;

import java.util.List;

public interface TaskService {
    List<TaskResponseDto> getAllTasks();

    TaskResponseDto getTaskById(Long taskId);

    Void saveTask(TaskRequestDto taskDto);

    TaskResponseDto updateTask(Long taskId, TaskRequestDto taskDto);

    Void deleteTask(Long taskId);

    ;
}
