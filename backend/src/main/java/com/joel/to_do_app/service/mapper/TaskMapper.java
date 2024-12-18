package com.joel.to_do_app.service.mapper;

import com.joel.to_do_app.dto.TaskDTO;
import com.joel.to_do_app.entity.Task;

public class TaskMapper {

    public static TaskDTO toDTO(Task task) {
        if (task == null) {
            return null;
        }
        return TaskDTO.builder()
                .id(task.getId())
                .description(task.getDescription())
                .checked(task.isChecked())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }

    public static Task toEntity(TaskDTO taskDTO) {
        if (taskDTO == null) {
            return null;
        }
        Task task = new Task();
        task.setId(taskDTO.getId());
        task.setDescription(taskDTO.getDescription());
        task.setChecked(taskDTO.isChecked());
        return task;
    }
}
