import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { TaskResponseDto, TaskStatus } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent implements OnInit {
  task: TaskResponseDto | null = null;
  isLoading = true;
  error = '';
  readonly TaskStatus = TaskStatus;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadTask(+id);
    } else {
      this.error = 'Task ID is required';
      this.isLoading = false;
    }
  }

  loadTask(id: number): void {
    this.isLoading = true;
    this.error = '';

    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
        this.showErrorMessage('Failed to load task details');
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case TaskStatus.TO_DO:
        return 'status-todo';
      case TaskStatus.IN_PROGRESS:
        return 'status-in-progress';
      case TaskStatus.DONE:
        return 'status-done';
      default:
        return '';
    }
  }

  onEdit(): void {
    if (this.task) {
      this.router.navigate(['/tasks/edit', this.task.id]);
    }
  }

  onDelete(): void {
    if (!this.task) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          this.showSuccessMessage('Task deleted successfully');
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.error = error.message;
          this.showErrorMessage('Failed to delete task');
        },
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/tasks']);
  }

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
