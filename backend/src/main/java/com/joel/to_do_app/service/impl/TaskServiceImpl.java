package com.joel.to_do_app.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joel.to_do_app.dto.TaskDTO;
import com.joel.to_do_app.entity.Task;
import com.joel.to_do_app.repository.TaskRepository;
import com.joel.to_do_app.service.TaskService;
import com.joel.to_do_app.service.mapper.TaskMapper;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Optional<Task> updateTask(Long id, Task updatedTask) {
        Optional<Task> task = taskRepository.findById(id);
        task.ifPresent(existingTask -> {
            existingTask.setDescription(updatedTask.getDescription());
            existingTask.setChecked(updatedTask.isChecked());
            taskRepository.save(existingTask);
        });
        return task;
    }

    @Override
    public boolean deleteTask(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        task.ifPresent(taskRepository::delete);
        return task.isPresent();
    }

    @Override
    public TaskDTO toDTO(Task task) {
        return TaskMapper.toDTO(task);
    }

    @Override
    public Task toEntity(TaskDTO taskDTO) {
        return TaskMapper.toEntity(taskDTO);
    }

    @Override
    public List<TaskDTO> toDTOList(List<Task> tasks) {
        return tasks.stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());
    }
}
