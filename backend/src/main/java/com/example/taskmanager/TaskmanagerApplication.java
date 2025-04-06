package com.example.taskmanager;

import com.example.taskmanager.service.ApplicationUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@SpringBootApplication
public class TaskmanagerApplication implements CommandLineRunner {

	private final ApplicationUserService applicationUserService;

	public TaskmanagerApplication(ApplicationUserService applicationUserService) {
		this.applicationUserService = applicationUserService;
	}

	public static void main(String[] args) {
		SpringApplication.run(TaskmanagerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		applicationUserService.initializeUser();
	}
}
