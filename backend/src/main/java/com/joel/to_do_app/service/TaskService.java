package com.joel.to_do_app.service;

import java.util.List;
import java.util.Optional;

import com.joel.to_do_app.dto.TaskDTO;
import com.joel.to_do_app.entity.Task;

public interface TaskService {

    Task createTask(Task task);

    List<Task> getAllTasks();

    Optional<Task> getTaskById(Long id);

    Optional<Task> updateTask(Long id, Task updatedTask);

    boolean deleteTask(Long id);

    TaskDTO toDTO(Task task);

    Task toEntity(TaskDTO taskDTO);

    List<TaskDTO> toDTOList(List<Task> tasks);
}
