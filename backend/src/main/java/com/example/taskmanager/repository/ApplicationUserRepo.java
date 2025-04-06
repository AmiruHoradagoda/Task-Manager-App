package com.example.taskmanager.repository;

import com.example.taskmanager.entity.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface ApplicationUserRepo extends JpaRepository<ApplicationUser,Long> {
    Optional<ApplicationUser> findByUsername(String username);
}
