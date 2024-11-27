import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OperationDto, OperationViewDto} from "../../core/dto/operations-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private http = inject(HttpClient);

  getListOfOperations() {
    return this.http.get<OperationDto[]>(`${environment.apiUrl}/public/api/operation`);
  }

  createOperation(operationDto: OperationViewDto) {
    return this.http.post(`${environment.apiUrl}/admin/api/operation`, operationDto);
  }

  updateOperation(operationDto: OperationViewDto) {
    return this.http.put(`${environment.apiUrl}/admin/api/operation`, operationDto);
  }

  deleteOperation(id: number) {
    return this.http.delete(`${environment.apiUrl}/admin/api/operation/${id}`);
  }
}
