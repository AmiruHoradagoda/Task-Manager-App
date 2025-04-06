import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();

  private authService = inject(AuthService);
  private router = inject(Router);

  fullName: string = '';
  userInitial: string = '';

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.fullName = user.fullName;
        this.userInitial = user.fullName.charAt(0).toUpperCase();
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
