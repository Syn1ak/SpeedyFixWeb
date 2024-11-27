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
import {take} from "rxjs";
import {EngineType, TransmissionType, VehicleDto} from "../../core/dto/vehicles-dto";
import {LocalizeEngineTypePipe} from "../../shared/pipes/localize-engine-type.pipe";
import {LocalizeTransmissionTypePipe} from "../../shared/pipes/localize-transmission-type.pipe";

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
    LocalizeTransmissionTypePipe
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent implements OnInit {
  private vehiclesService = inject(VehiclesService);

  $vehicles = signal<VehicleDto[]>([
    {
      id: 1,
      brand: 'Toyota',
      model: 'Camry',
      yearOfRelease: 2022,
      engineType: EngineType.PETROL_NATURALLY_ASPIRATED,
      displacement: 2500, // in cubic centimeters (cc)
      transmissionType: TransmissionType.MANUAL,
      wheelRadius: 18, // in inches
      registrationNumber: 'ABC-1234',
      owner: null,
    }
  ]);

  ngOnInit() {
    // this.vehiclesService.getListOfVehicles()
    //   .pipe(take(1))
    //   .subscribe({
    //     next: val => this.$vehicles.set(val)
    //   });
  }

  create() {

  }

  edit(vehicle: VehicleDto) {

  }

  delete(id: number) {

  }
}
