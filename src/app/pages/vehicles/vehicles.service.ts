import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {VehicleDto, VehicleViewDto} from "../../core/dto/vehicles-dto";

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private http = inject(HttpClient);

  getListOfVehicles() {
    return this.http.get<VehicleDto[]>(`${environment.apiUrl}/auth/api/vehicle`);
  }

  getVehicleById(id: number) {
    return this.http.get<VehicleDto>(`${environment.apiUrl}/auth/api/vehicle/${id}`);
  }

  getVehiclesByOwner(id: number) {
    return this.http.get<VehicleDto[]>(`${environment.apiUrl}/auth/api/vehicle/owner/${id}`);
  }

  createVehicle(vehicle: VehicleViewDto) {
    return this.http.post(`${environment.apiUrl}/user/api/vehicle`, vehicle);
  }

  updateVehicle(vehicle: VehicleViewDto) {
    return this.http.put(`${environment.apiUrl}/user/api/vehicle`, vehicle);
  }

  deleteVehicle(id: number) {
    return this.http.delete(`${environment.apiUrl}/user/api/vehicle/${id}`);
  }
}
