export interface AuthResponseDto {
  userId: string;
  username: string;
  fullName: string;
  token: string;
}

export interface RegisterRequest {
  fullName: string;
  username: string;
  password: string;
}