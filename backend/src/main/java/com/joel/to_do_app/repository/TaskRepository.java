package com.joel.to_do_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.joel.to_do_app.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
