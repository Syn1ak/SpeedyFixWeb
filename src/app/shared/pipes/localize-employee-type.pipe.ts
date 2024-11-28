import { Pipe, PipeTransform } from '@angular/core';
import {EmployeeType, EmployeeType_l18} from "../../core/dto/employees-dto";

@Pipe({
  name: 'localizeEmployeeType',
  standalone: true
})
export class LocalizeEmployeeTypePipe implements PipeTransform {
  private enum = EmployeeType_l18;

  transform(value: EmployeeType): string {
    return this.enum[value];
  }
}
