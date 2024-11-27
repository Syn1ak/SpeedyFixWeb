import {EmployeeDto} from "./auth-dto";

export interface OperationDto {
  id?: number;
  name: string;
  description: string;
  price: number;
  employees: EmployeeDto[];
}

export interface OperationViewDto {
  id?: number;
  name: string;
  description: string;
  price: number;
  employeeIds: number[];
}


