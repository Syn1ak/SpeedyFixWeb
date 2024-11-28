import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CustomerDto, UserDto} from "../../core/dto/auth-dto";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  getCustomer(id:number){
    return this.http.get<CustomerDto>(`${environment.apiUrl}/auth/api/customer/${id}`);
  }

  updateCustomer(id:number, customer: UserDto){
    return this.http.put(`${environment.apiUrl}/auth/api/customer/${id}`, customer);
  }
}
