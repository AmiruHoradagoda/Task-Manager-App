package com.example.taskmanager.service.Impl;

import com.example.taskmanager.dto.request.TaskRequestDto;
import com.example.taskmanager.dto.response.TaskResponseDto;
import com.example.taskmanager.repository.TaskRepo;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private TaskRepo taskRepo;
    @Autowired
    TaskServiceImpl(TaskRepo taskRepo){
        this.taskRepo = taskRepo;
    }


    @Override
    public List<TaskResponseDto> getAllTasks() {
        return null;
    }

    @Override
    public TaskResponseDto getTaskById(Long taskId) {
        return null;
    }

    @Override
    public Void saveTask(TaskRequestDto taskDto) {
        return null;
    }

    @Override
    public TaskResponseDto updateTask(Long taskId, TaskRequestDto taskDto) {
        return null;
    }

    @Override
    public Void deleteTask(Long taskId) {
        return null;
    }
}
