import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { filter } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  title = 'Task Management System';
  currentRoute = '';

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Track current route for conditional display of components
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });

    this.registerCustomIcons();
  }

  // Method to toggle sidenav
  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  // Update this method to return a boolean value based on the current route
  shouldShowLayout(): boolean {
    return !this.currentRoute.includes('/auth/');
  }

  private registerCustomIcons(): void {
    // Example of how to register custom SVG icons if needed
    // this.matIconRegistry.addSvgIcon(
    //   'task_icon',
    //   this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/task-icon.svg')
    // );
  }
}
