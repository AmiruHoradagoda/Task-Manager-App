export interface StandardResponseDto<T> {
  code: number;
  message: string;
  data: T;
}
