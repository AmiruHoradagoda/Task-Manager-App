import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/tasks/tasks.module').then((m) => m.TasksModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
