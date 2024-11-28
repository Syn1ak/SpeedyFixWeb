import {EnumToSelectList} from "../utils/enum-to-select-list.util";
import {EmployeeDto, EmployeeView} from "./employees-dto";

export interface OperationOrderViewDto {
  orderStatus: OperationOrderStatusType;
  endDate: string;
  operationIds: number[];
  vehicleId: number;
  customerId: number;
  employeeIds?: number[];
  employees?: EmployeeDto[];
}

export enum OperationOrderStatusType {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const OperationOrderStatusType_l18 = {
  [OperationOrderStatusType.PENDING]: 'Очікується',
  [OperationOrderStatusType.IN_PROGRESS]: 'У процесі',
  [OperationOrderStatusType.ON_HOLD]: 'Призупинено',
  [OperationOrderStatusType.COMPLETED]: 'Завершено',
  [OperationOrderStatusType.CANCELLED]: 'Скасовано',
};

export const operationOrderStatusTypes = () => EnumToSelectList<OperationOrderStatusType>(OperationOrderStatusType_l18);