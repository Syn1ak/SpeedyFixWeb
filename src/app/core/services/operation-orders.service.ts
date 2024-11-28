import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OperationOrderViewDto} from "../dto/operation-order-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OperationOrdersService {
  private http = inject(HttpClient);

  createOperationOrder(view: OperationOrderViewDto) {
    return this.http.post(`${environment.apiUrl}/user/api/operation/order`, view)
  }
}
