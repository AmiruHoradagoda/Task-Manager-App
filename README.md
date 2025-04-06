# Task Master

A Full-stack Task management application built with Angular and Spring Boot.

## Quick Start with Docker Compose

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmiruHoradagoda/Task-Manager-App.git
   cd Task-Manager-App
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up
   ```

   This will:
   - Set up a MySQL database
   - Build and run the Spring Boot backend
   - Build and run the Angular frontend

3. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8081
   - MySQL Database: localhost:3306

## Default Login Credentials

- Email: amiru@gmail.com
- Password: amiru@1234

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and receive JWT token

### Tasks
- `GET /api/v1/tasks/user/{userId}` - Get all tasks for a user
- `GET /api/v1/tasks/status/{status}/user/{userId}` - Get tasks by status
- `GET /api/v1/tasks/task/{id}` - Get a task by ID
- `POST /api/v1/tasks/user/{userId}` - Create a new task
- `PUT /api/v1/tasks/{id}` - Update a task
- `DELETE /api/v1/tasks/{id}` - Delete a task

## Manual Setup (without Docker)

### Backend Setup

1. Configure MySQL in `application.properties`
   ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager_db?createDatabaseIfNotExist=true
    spring.datasource.username=yourusername
    spring.datasource.password=yourpassword
   ```

2. Run the backend
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Install dependencies and run
   ```bash
   cd frontend
   npm install
   ng serve
   ```