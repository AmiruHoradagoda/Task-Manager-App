import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService } from '../../../core/services/task.service';
import { TaskRequestDto, TaskStatus } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  isLoading = false;
  error = '';
  readonly TaskStatus = TaskStatus;

  statusOptions = [
    { value: TaskStatus.TO_DO, viewValue: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, viewValue: 'In Progress' },
    { value: TaskStatus.DONE, viewValue: 'Done' },
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.createForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      status: [TaskStatus.TO_DO, [Validators.required]],
    });
  }

  loadTask(id: number): void {
    this.isLoading = true;
    this.error = '';

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
        this.showErrorMessage('Failed to load task');
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.taskForm.controls).forEach((key) => {
        const control = this.taskForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.error = '';

    const taskData: TaskRequestDto = {
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value,
      status: this.taskForm.get('status')?.value,
    };

    if (this.isEditMode && this.taskId) {
      // Update existing task
      this.taskService.updateTask(this.taskId, taskData).subscribe({
        next: () => {
          this.isLoading = false;
          this.showSuccessMessage('Task updated successfully');
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
          this.showErrorMessage('Failed to update task');
        },
      });
    } else {
      // Create new task
      this.taskService.createTask(taskData).subscribe({
        next: () => {
          this.isLoading = false;
          this.showSuccessMessage('Task created successfully');
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
          this.showErrorMessage('Failed to create task');
        },
      });
    }
  }

  // Helper method to get form control
  get f() {
    return this.taskForm.controls;
  }

  // Navigation methods
  onCancel(): void {
    this.router.navigate(['/tasks']);
  }

  // Notification messages
  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
