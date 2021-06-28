export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
