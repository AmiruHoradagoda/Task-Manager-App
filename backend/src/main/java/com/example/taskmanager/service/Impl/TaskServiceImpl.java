package com.example.taskmanager.service.Impl;

import com.example.taskmanager.dto.request.TaskRequestDto;
import com.example.taskmanager.dto.response.TaskResponseDto;
import com.example.taskmanager.dto.response.paginate.TaskResponsePaginatedDto;
import com.example.taskmanager.entity.ApplicationUser;
import com.example.taskmanager.entity.Task;
import com.example.taskmanager.exception.EntryNotFoundException;
import com.example.taskmanager.repository.ApplicationUserRepo;
import com.example.taskmanager.repository.TaskRepo;
import com.example.taskmanager.service.TaskService;
import com.example.taskmanager.utility.mappers.TaskMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private final ApplicationUserRepo userRepo;
    private final TaskRepo taskRepo;
    private final TaskMapper taskMapper;
    @Autowired
    TaskServiceImpl(TaskRepo taskRepo,TaskMapper taskMapper,ApplicationUserRepo userRepo){
        this.userRepo = userRepo;
        this.taskRepo = taskRepo;
        this.taskMapper=taskMapper;
    }


    @Override
    public TaskResponsePaginatedDto getAllTasks(int page, int size, String userId) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Task> taskPage = taskRepo.findByUserUserId(userId, pageable);

        List<TaskResponseDto> taskDtoList = taskPage.getContent()
                .stream()
                .map(taskMapper::toTaskResponse)
                .toList();

        return TaskResponsePaginatedDto.builder()
                .dataCount(taskPage.getTotalElements())
                .dataList(taskDtoList)
                .build();
    }

    @Override
    public TaskResponsePaginatedDto getAllTasksByStatus(int page, int size, String taskStatusStr, String userId) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Task> taskPage = taskRepo.findByStatusAndUserUserId(taskStatusStr, userId, pageable);

        List<TaskResponseDto> taskDtoList = taskPage.getContent()
                .stream()
                .map(taskMapper::toTaskResponse)
                .toList();

        return TaskResponsePaginatedDto.builder()
                .dataCount(taskPage.getTotalElements())
                .dataList(taskDtoList)
                .build();
    }
    @Override
    public TaskResponseDto getTaskById(Long taskId) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(()->new EntryNotFoundException("Task is Not Found"));
        return taskMapper.toTaskResponse(task);
    }

    @Override
    public Void saveTask(TaskRequestDto taskDto, String userId) {
        Task task = taskMapper.toTask(taskDto);
        task.setCreatedAt(LocalDateTime.now());

        ApplicationUser user = userRepo.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        task.setUser(user);

        taskRepo.save(task);
        return null;
    }

    @Override
    public TaskResponseDto updateTask(Long taskId, TaskRequestDto taskDto) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(()->new EntryNotFoundException("Task is Not Found"));
        taskMapper.updateTaskFromDto(taskDto, task);
        // Set current date and time
        task.setCreatedAt(LocalDateTime.now());
        Task updatedTask = taskRepo.save(task);
        return taskMapper.toTaskResponse(updatedTask);
    }

    @Override
    public Void deleteTask(Long taskId) {
        taskRepo.deleteById(taskId);
        return null;
    }
}
