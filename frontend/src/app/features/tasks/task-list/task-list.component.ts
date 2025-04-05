import { Component, OnInit, ViewChild } from '@angular/core';
import { NgIf, DatePipe, NgClass, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  PageEvent,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { TaskResponseDto, TaskStatus } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { TaskFilterComponent } from '../components/task-filter/task-filter.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    TaskFilterComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'description',
    'status',
    'createdAt',
    'actions',
  ];
  dataSource = new MatTableDataSource<TaskResponseDto>([]);
  isLoading = true;
  error = '';
  selectedStatus: TaskStatus | 'ALL' = 'ALL';

  // Pagination parameters
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions = [5, 10, 25, 50];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadTasks(): void {
    this.isLoading = true;
    this.error = '';

    if (this.selectedStatus === 'ALL') {
      this.taskService.getAllTasks(this.currentPage, this.pageSize).subscribe({
        next: (paginatedData) => {
          this.dataSource.data = paginatedData.dataList;
          this.totalItems = paginatedData.dataCount;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
          this.showErrorMessage('Failed to load tasks');
        },
      });
    } else {
      this.taskService
        .getTasksByStatus(this.selectedStatus, this.currentPage, this.pageSize)
        .subscribe({
          next: (paginatedData) => {
            this.dataSource.data = paginatedData.dataList;
            this.totalItems = paginatedData.dataCount;
            this.isLoading = false;
          },
          error: (error) => {
            this.error = error.message;
            this.isLoading = false;
            this.showErrorMessage('Failed to load tasks');
          },
        });
    }
  }

  onFilterChange(status: TaskStatus | 'ALL'): void {
    this.selectedStatus = status;
    this.currentPage = 0; // Reset to first page when filter changes
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadTasks();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTasks();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editTask(id: number): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  viewTaskDetails(id: number): void {
    this.router.navigate(['/tasks/detail', id]);
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
          this.showSuccessMessage('Task deleted successfully');
        },
        error: (error) => {
          this.error = error.message;
          this.showErrorMessage('Failed to delete task');
        },
      });
    }
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
