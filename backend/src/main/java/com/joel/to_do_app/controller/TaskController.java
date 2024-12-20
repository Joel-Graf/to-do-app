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

/**
 * TaskController handles the REST API endpoints for Task operations.
 */
@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://to-do-app-seven-ashen.vercel.app", "https://localhost:3030"})
public class TaskController {

    // TaskService instance to handle business logic
    private final TaskService taskService;

    /**
     * Endpoint to create a new task.
     *
     * @param taskDTO Task data transfer object containing task details
     * @return ResponseEntity containing the created TaskDTO and HTTP status CREATED
     */
    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@Valid @RequestBody TaskDTO taskDTO) {
        try {
            // Convert DTO to entity and save it
            Task task = taskService.toEntity(taskDTO);
            Task savedTask = taskService.createTask(task);
            TaskDTO savedTaskDTO = taskService.toDTO(savedTask);
            return new ResponseEntity<>(savedTaskDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            // Handle unexpected exceptions
            throw new InternalServerErrorException("An error occurred while creating the task: " + e.getMessage());
        }
    }

    /**
     * Endpoint to retrieve all tasks.
     *
     * @return ResponseEntity containing a list of TaskDTOs and HTTP status OK
     */
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

    /**
     * Endpoint to retrieve a task by its ID.
     *
     * @param id ID of the task to fetch
     * @return ResponseEntity containing the TaskDTO and HTTP status OK
     */
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

    /**
     * Endpoint to update a task.
     *
     * @param id      ID of the task to update
     * @param taskDTO TaskDTO containing updated task details
     * @return ResponseEntity containing the updated TaskDTO and HTTP status OK
     */
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

    /**
     * Endpoint to delete a task by its ID.
     *
     * @param id ID of the task to delete
     * @return ResponseEntity with no content status if task is deleted successfully
     */
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
