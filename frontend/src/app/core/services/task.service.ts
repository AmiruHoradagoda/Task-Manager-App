import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TaskRequestDto, TaskResponseDto, TaskResponsePaginatedDto, TaskStatus } from '../models/task.model';
import { StandardResponseDto } from '../models/standard-response.model';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/api/v1/tasks`;
  constructor(private http: HttpClient) {}

  getAllTasks(
    page: number,
    size: number
  ): Observable<TaskResponsePaginatedDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http
      .get<StandardResponseDto<TaskResponsePaginatedDto>>(this.apiUrl, {
        params,
      })
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
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('status', status);

    return this.http
      .get<StandardResponseDto<TaskResponsePaginatedDto>>(this.apiUrl, {
        params,
      })
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }
  getTaskById(id: number): Observable<TaskResponseDto> {
    return this.http
      .get<StandardResponseDto<TaskResponseDto>>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }
  createTask(task: TaskRequestDto): Observable<TaskResponseDto> {
    return this.http
      .post<StandardResponseDto<TaskResponseDto>>(this.apiUrl, task)
      .pipe(
        map((response) => response.data),
        catchError(this.handleError)
      );
  }
  updateTask(id: number, task: TaskRequestDto): Observable<TaskResponseDto> {
    return this.http
      .put<StandardResponseDto<TaskResponseDto>>(`${this.apiUrl}/${id}`, task)
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



