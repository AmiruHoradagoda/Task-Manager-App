import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  TaskRequestDto,
  TaskResponseDto,
  TaskResponsePaginatedDto,
  TaskStatus,
} from '../models/task.model';
import { StandardResponseDto } from '../models/standard-response.model';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/api/v1/tasks`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllTasks(
    page: number,
    size: number
  ): Observable<TaskResponsePaginatedDto> {
    const userId = this.authService.getCurrentUserId();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http
      .get<StandardResponseDto<TaskResponsePaginatedDto>>(
        `${this.apiUrl}/user/${userId}`,
        {
          params,
        }
      )
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  getTasksByStatus(
    status: TaskStatus,
    page: number = 0,
    size: number = 10
  ): Observable<TaskResponsePaginatedDto> {
    const userId = this.authService.getCurrentUserId();
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http
      .get<StandardResponseDto<TaskResponsePaginatedDto>>(
        `${this.apiUrl}/status/${status}/user/${userId}`,
        {
          params,
        }
      )
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  getTaskById(id: number): Observable<TaskResponseDto> {
    return this.http
      .get<StandardResponseDto<TaskResponseDto>>(`${this.apiUrl}/task/${id}`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  createTask(task: TaskRequestDto,): Observable<TaskResponseDto> {
    // Get the current user ID
    const userId = this.authService.getCurrentUserId();

    // Add the userId to the task
    const taskWithUserId = {
      ...task,
      userId: userId,
    };

    return this.http
      .post<StandardResponseDto<TaskResponseDto>>(
        `${this.apiUrl}/user/${userId}`,
        taskWithUserId
      )
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  updateTask(id: number, task: TaskRequestDto): Observable<TaskResponseDto> {
    // Get the current user ID
    const userId = this.authService.getCurrentUserId();

    // Add the userId to the task
    const taskWithUserId = {
      ...task,
      userId: userId,
    };

    return this.http
      .put<StandardResponseDto<TaskResponseDto>>(
        `${this.apiUrl}/${id}`,
        taskWithUserId
      )
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  deleteTask(id: number): Observable<any> {
    return this.http
      .delete<StandardResponseDto<any>>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && error.error.message) {
      // Server returned an error message
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
