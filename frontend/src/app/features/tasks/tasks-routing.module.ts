import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'new', component: TaskFormComponent },
  { path: 'edit/:id', component: TaskFormComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
