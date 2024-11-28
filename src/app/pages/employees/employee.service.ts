import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {EmployeeDto, EmployeeViewDto} from "../../core/dto/employees-dto";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  getListOfOfEmployees() {
    return this.http.get<EmployeeDto[]>(`${environment.apiUrl}/public/api/employee`);
  }

  // ?? type needs clarification
  createEmployee(employee: EmployeeViewDto) {
    return this.http.post(`${environment.apiUrl}/admin/api/employee`, employee);
  }

  updateEmployee(employee: EmployeeViewDto) {
    return this.http.put(`${environment.apiUrl}/admin/api/employee`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/api/employee/${id}`);
  }
}
