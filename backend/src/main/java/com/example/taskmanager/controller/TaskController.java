package com.example.taskmanager.controller;

import com.example.taskmanager.service.TaskService;
import com.example.taskmanager.utility.StandardResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    private TaskService taskService;
    @Autowired
    TaskController(TaskService taskService ){
        this.taskService = taskService;
    }
    @GetMapping("/{id}")
    private ResponseEntity<StandardResponseDto> getTaskById(@PathVariable("id") Long taskId){
        return null;
    }
    @GetMapping
    private ResponseEntity<StandardResponseDto> getAllTasks(){
        return null;
    }
    @PostMapping
    private ResponseEntity<StandardResponseDto> saveTask(){
        return null;
    }
    @PutMapping("/{id}")
    private ResponseEntity<StandardResponseDto> updateTask(@PathVariable("id") Long taskId){
        return null;
    }
    @DeleteMapping("/{id}")
    private ResponseEntity<StandardResponseDto> getAllTasks(@PathVariable("id") Long taskId){
        return null;
    }
}
