package com.example.taskmanager.controller;

import com.example.taskmanager.dto.request.TaskRequestDto;
import com.example.taskmanager.dto.response.TaskResponseDto;
import com.example.taskmanager.dto.response.paginate.TaskResponsePaginatedDto;
import com.example.taskmanager.service.TaskService;
import com.example.taskmanager.utility.StandardResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin("*")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{id}")
    private ResponseEntity<StandardResponseDto> getTaskById(@PathVariable("id") Long taskId) {
        TaskResponseDto taskResponseDto = taskService.getTaskById(taskId);
        return new ResponseEntity<>(
                StandardResponseDto.
                        builder().
                        code(200).
                        message("Task data").
                        data(taskResponseDto).
                        build(), HttpStatus.OK
        );
    }

    @GetMapping
    private ResponseEntity<StandardResponseDto> getAllTasks(
            @RequestParam int page,
            @RequestParam int size
    ) {
        TaskResponsePaginatedDto taskResponseDtos = taskService.getAllTasks(page,size);
        return new ResponseEntity<>(
                StandardResponseDto.
                        builder().
                        code(201).
                        message("Task list").
                        data(taskResponseDtos).
                        build(), HttpStatus.OK
        );
    }
    @GetMapping("/status/{status}")
    private ResponseEntity<StandardResponseDto> getAllTasksByStatus(
            @PathVariable("status") String taskStatus,
            @RequestParam int page,
            @RequestParam int size
    ) {
        TaskResponsePaginatedDto taskResponseDtos = taskService.getAllTasksByStatus(page,size,taskStatus);
        return new ResponseEntity<>(
                StandardResponseDto.
                        builder().
                        code(201).
                        message("Task list").
                        data(taskResponseDtos).
                        build(), HttpStatus.OK
        );
    }

    @PostMapping
    private ResponseEntity<StandardResponseDto> saveTask(@RequestBody TaskRequestDto taskDto) {
        return new ResponseEntity<>(
                StandardResponseDto.
                        builder().
                        code(200).
                        message("Task Saved").
                        data(taskService.saveTask(taskDto)).
                        build(), HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    private ResponseEntity<StandardResponseDto> updateTask(@PathVariable("id") Long taskId,@RequestBody TaskRequestDto taskDto) {
        TaskResponseDto taskResponseDto = taskService.updateTask(taskId, taskDto);
        return new ResponseEntity<>(
                StandardResponseDto.
                        builder().
                        code(201).
                        message("Task update").
                        data(taskResponseDto).
                        build(), HttpStatus.CREATED
        );
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<StandardResponseDto> deleteTask(@PathVariable("id") Long taskId) {
        return new ResponseEntity<>(
                StandardResponseDto.
                        builder().
                        code(204).
                        message("Task deleted").
                        data(taskService.deleteTask(taskId)).
                        build(), HttpStatus.OK
        );
    }
}
