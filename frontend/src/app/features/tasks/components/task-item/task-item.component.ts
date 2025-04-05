import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, DatePipe, SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  TaskResponseDto,
  TaskStatus,
} from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    SlicePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: TaskResponseDto;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();

  readonly TaskStatus = TaskStatus;

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

  onEdit(): void {
    this.edit.emit(this.task.id);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onView(): void {
    this.view.emit(this.task.id);
  }
}
