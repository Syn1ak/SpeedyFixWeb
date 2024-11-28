import {UserDto, UserViewDto} from "./auth-dto";
import {EnumToSelectList} from "../utils/enum-to-select-list.util";

export interface EmployeeDto {
  id: number;
  position: string;
  type: EmployeeType;
  user: UserDto; // ??
}

export interface EmployeeView {
  id?: number;
  position: string;
  type: EmployeeType;
}

export interface EmployeeViewDto {
  employee: EmployeeView;
  user: UserViewDto;
}

export enum EmployeeType {
  ADMIN = 'ADMIN',
  MECHANIC = 'MECHANIC'
}

export const EmployeeType_l18 = {
  [EmployeeType.ADMIN]: 'Admin',
  [EmployeeType.MECHANIC]: 'Mechanic',
}

export const getEmployeeTypes = () => EnumToSelectList<EmployeeType>(EmployeeType_l18);

