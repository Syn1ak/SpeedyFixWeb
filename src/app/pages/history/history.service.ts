import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {OperationOrderDto, OperationOrderFullViewDto} from "../../core/dto/operation-order-dto";
import {UserDto} from "../../core/dto/auth-dto";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private http = inject(HttpClient);
  findAllByStatusAndCustomerId(status: string, id:number){
    return this.http.get<OperationOrderDto[]>(`${environment.apiUrl}/auth/api/operation/order/${status}/customer/${id}`);
  }

  findAllByStatus(status: string){
    return this.http.get<OperationOrderDto[]>(`${environment.apiUrl}/admin/api/operation/order/${status}`);
  }

  changeStatusOfOperation(id:number, status: string){
    return this.http.put(`${environment.apiUrl}/auth/api/operation/order/${id}/new/${status}`, {});
  }
}
