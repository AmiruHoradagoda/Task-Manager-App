import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';
import { StandardResponseDto } from '../models/standard-response.model';

export interface AuthResponseDto {
  username: string;
  fullName: string;
  token: string;
}

export interface RegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  private isBrowser: boolean;

  private currentUserSubject: BehaviorSubject<AuthResponseDto | null>;
  public currentUser: Observable<AuthResponseDto | null>;

  constructor(private http: HttpClient, private router: Router) {
    // Check if we're in a browser environment
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    // Initialize with null if not in browser
    const userData = this.isBrowser ? this.getUserData() : null;
    this.currentUserSubject = new BehaviorSubject<AuthResponseDto | null>(
      userData
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponseDto | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<AuthResponseDto> {
    return this.http
      .post<StandardResponseDto<AuthResponseDto>>(
        `${this.apiUrl}/api/v1/auth/login`,
        {
          username,
          password,
        }
      )
      .pipe(
        tap((response) => {
          // Extract the user data from the nested 'data' property
          const user = response.data;

          console.log('Login response:', response);
          console.log('User data:', user);

          if (this.isBrowser) {
            // Store the token and user data
            localStorage.setItem(this.tokenKey, user.token);
            localStorage.setItem(this.userKey, JSON.stringify(user));
          }

          this.currentUserSubject.next(user);
          return user;
        }),
        // Map the response to just return the data part
        map((response) => response.data),
        catchError((error) => {
          console.error('Login error', error);
          return throwError(() => error);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponseDto> {
    return this.http
      .post<StandardResponseDto<AuthResponseDto>>(
        `${this.apiUrl}/api/v1/auth/register`,
        userData
      )
      .pipe(
        // Map the response to just return the data part
        map((response) => response.data),
        catchError((error) => {
          console.error('Registration error', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    if (this.isBrowser) {
      // Only try to access localStorage in browser environment
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  getUserData(): AuthResponseDto | null {
    if (!this.isBrowser) {
      return null;
    }
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }
  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
