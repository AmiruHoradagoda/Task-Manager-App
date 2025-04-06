import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const userData = {
        fullName: this.registerForm.value.fullName,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.snackBar.open(
            'Registration successful! Please log in.',
            'Close',
            {
              duration: 5000,
              panelClass: ['success-snackbar'],
            }
          );
          this.router.navigate(['auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
          let errorMessage = 'Registration failed. Please try again.';

          // Check for specific error status
          if (error.status === 409) {
            errorMessage =
              'This username or email is already registered. Please use different credentials.';
          } else if (error.message) {
            errorMessage = error.message;
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      // Mark all fields as touched to trigger validation errors
      this.registerForm.markAllAsTouched();
    }
  }
  navigateToLogin(): void {
    this.router.navigate(['auth/login']);
  }
}
