package com.joel.to_do_app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joel.to_do_app.dto.TaskDTO;
import com.joel.to_do_app.entity.Task;
import com.joel.to_do_app.exceptions.InternalServerErrorException;
import com.joel.to_do_app.exceptions.NotFoundException;
import com.joel.to_do_app.service.TaskService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // URL do frontend
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskDTO taskDTO) {
        try {
            Task task = taskService.toEntity(taskDTO);
            Task savedTask = taskService.createTask(task);
            TaskDTO savedTaskDTO = taskService.toDTO(savedTask);
            return new ResponseEntity<>(savedTaskDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while creating the task: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        try {
            List<Task> tasks = taskService.getAllTasks();
            List<TaskDTO> taskDTOs = taskService.toDTOList(tasks);
            return new ResponseEntity<>(taskDTOs, HttpStatus.OK);
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while fetching all tasks: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        try {
            Optional<Task> task = taskService.getTaskById(id);
            if (task.isEmpty()) {
                throw new NotFoundException("Task not found with id: " + id);
            }
            return ResponseEntity.ok(taskService.toDTO(task.get()));
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while fetching the task: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long id, @Valid @RequestBody TaskDTO taskDTO) {
        try {
            Task task = taskService.toEntity(taskDTO);
            Optional<Task> updatedTask = taskService.updateTask(id, task);
            if (updatedTask.isEmpty()) {
                throw new NotFoundException("Task not found with id: " + id);
            }
            return ResponseEntity.ok(taskService.toDTO(updatedTask.get()));
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while updating the task: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            boolean isDeleted = taskService.deleteTask(id);
            if (!isDeleted) {
                throw new NotFoundException("Task not found with id: " + id);
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new InternalServerErrorException("An error occurred while deleting the task: " + e.getMessage());
        }
    }
}
