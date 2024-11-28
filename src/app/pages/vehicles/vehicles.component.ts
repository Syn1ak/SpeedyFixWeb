import {Component, inject, OnInit, signal} from '@angular/core';
import {DisplayEmployeesPipe} from "../../shared/pipes/display-employees.pipe";
import {MatButton, MatFabButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {VehiclesService} from "./vehicles.service";
import {of, switchMap, take} from "rxjs";
import {EngineType, TransmissionType, VehicleDto} from "../../core/dto/vehicles-dto";
import {LocalizeEngineTypePipe} from "../../shared/pipes/localize-engine-type.pipe";
import {LocalizeTransmissionTypePipe} from "../../shared/pipes/localize-transmission-type.pipe";
import {RouterLink} from "@angular/router";
import {ModalService} from "../../core/services/modals/modal.service";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    DisplayEmployeesPipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatFabButton,
    MatIcon,
    LocalizeEngineTypePipe,
    LocalizeTransmissionTypePipe,
    RouterLink
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  private authService = inject(AuthService);
  private vehiclesService = inject(VehiclesService);
  private modalService = inject(ModalService);

  $vehicles = signal<VehicleDto[]>([]);

  ngOnInit() {
    this.fetchListOfVehicles();
  }

  fetchListOfVehicles() {
    const id = this.authService.$userInfo()?.id;
    this.vehiclesService.getVehiclesByOwner(id)
      .pipe(take(1))
      .subscribe({
        next: val => this.$vehicles.set(val)
      });
  }

  delete(id: number) {
    this.modalService.deleteModal({ message: "Are you sure you want to delete that vehicle?" })
      .pipe(switchMap((res) => {
        if (!res) return of(null);
        return this.vehiclesService.deleteVehicle(id)
      })).subscribe({
      next: (val) => {
        if (!val) return;
        this.fetchListOfVehicles()
      }
    });
  }
}
