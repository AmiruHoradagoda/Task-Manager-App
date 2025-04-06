package com.example.taskmanager.repository;

import com.example.taskmanager.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface TaskRepo extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.user.userId = :userId")
    Page<Task> findByUserUserId(@Param("userId") String userId, Pageable pageable);

    @Query("SELECT t FROM Task t WHERE t.status = :status AND t.user.userId = :userId")
    Page<Task> findByStatusAndUserUserId(@Param("status") String status, @Param("userId") String userId, Pageable pageable);
}