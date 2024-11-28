export interface LoginDto {
  username: string;
  password: string;
}

export interface SignUpDto {
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
  password: string;
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
  password: string;
}

export interface UserViewDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  telephoneNumber: string;
  password: string;
}

export interface CustomerDto {
  id: number;
  user: UserDto;
}

export interface StoDto {
  startTime: string;
  endTime: string;
  weekend: string;
}
