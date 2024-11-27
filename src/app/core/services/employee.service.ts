import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {EmployeeDto} from "../dto/auth-dto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  getListOfOfEmployees() {
    return this.http.get<EmployeeDto[]>(`${environment.apiUrl}/admin/api/employee`);
  }
}
