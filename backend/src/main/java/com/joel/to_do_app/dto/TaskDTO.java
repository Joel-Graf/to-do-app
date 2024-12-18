package com.joel.to_do_app.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskDTO {

    private Long id;

    @NotBlank(message = "Description must not be blank")
    private String description;

    @NotNull(message = "Checked status must not be null")
    private boolean checked;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public TaskDTO(Long id, String description, boolean checked, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.description = description;
        this.checked = checked;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
