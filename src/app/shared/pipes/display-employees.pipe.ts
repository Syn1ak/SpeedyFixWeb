import {Pipe, PipeTransform} from '@angular/core';
import {EmployeeDto} from "../../core/dto/employees-dto";

@Pipe({
  name: 'displayEmployees',
  standalone: true
})
export class DisplayEmployeesPipe implements PipeTransform {

  transform(employees: EmployeeDto[]): unknown {
    return employees.map((item, index) => {
      const user = item.user;
      const employeeInfo = [user.firstName, user.lastName, "(" + item.position + ")"].join(" ");
      if (index == employees.length - 1) return employeeInfo;
      return employeeInfo + ", ";
    });
  }

}
