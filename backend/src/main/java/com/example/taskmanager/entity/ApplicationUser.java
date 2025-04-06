package com.example.taskmanager.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "application_user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationUser {
    @Id
    private String userId;
    private String username;
    private String password;
    private String fullName;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks = new ArrayList<>();
}
