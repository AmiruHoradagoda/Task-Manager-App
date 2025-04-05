export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface TaskResponsePaginatedDto {
  dataCount: number;
  dataList: TaskResponseDto[];
}

export interface TaskResponseDto {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

export interface TaskRequestDto {
  title: string;
  description: string;
  status: string;
}
