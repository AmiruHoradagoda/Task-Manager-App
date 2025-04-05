package com.example.taskmanager.utility.mappers;
import com.example.taskmanager.dto.request.TaskRequestDto;
import com.example.taskmanager.dto.response.TaskResponseDto;
import com.example.taskmanager.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    Task toTask(TaskRequestDto taskRequestDto);

    TaskResponseDto toTaskResponse(Task task);

    void updateTaskFromDto(TaskRequestDto taskDto,@MappingTarget Task task);
}
