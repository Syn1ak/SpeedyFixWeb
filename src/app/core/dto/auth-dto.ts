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

export interface EmployeeDto {
  id: number;
  position: string;
  type: EmployeeType;
  user: UserDto; // ??
}

export enum EmployeeType {
  ADMIN = 'ADMIN',
  MECHANIC = 'MECHANIC'
}
