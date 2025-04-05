import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskStatus } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatIconModule],
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.scss',
})
export class TaskFilterComponent {
  @Input() selectedStatus: TaskStatus | 'ALL' = 'ALL';
  @Output() statusChanged = new EventEmitter<TaskStatus | 'ALL'>();

  readonly TaskStatus = TaskStatus;

  filters = [
    { value: 'ALL', label: 'All Tasks' },
    { value: TaskStatus.TO_DO, label: 'To Do' },
    { value: TaskStatus.IN_PROGRESS, label: 'In Progress' },
    { value: TaskStatus.DONE, label: 'Done' },
  ];

  selectStatus(status: TaskStatus | 'ALL'): void {
    this.selectedStatus = status;
    this.statusChanged.emit(status);
  }
}
