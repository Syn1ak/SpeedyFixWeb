import {Component, Input, OnInit} from '@angular/core';
import {ABaseUpsertVehicleStrategy} from "../constants/constants";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../core/utils/form/controls-of.util";
import {
  EngineType,
  getEngineTypes,
  getTransmissionTypes,
  TransmissionType,
  VehicleViewDto
} from "../../../core/dto/vehicles-dto";
import {InputFieldComponent} from "../../../shared/inputs/input-field/input-field.component";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {getFormControlsNames} from "../../../core/utils/form/get-form-controls.util";

@Component({
  selector: 'app-vehicle-upsert',
  standalone: true,
  imports: [
    FormsModule,
    InputFieldComponent,
    MatIcon,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './vehicle-upsert.component.html',
  styleUrl: './vehicle-upsert.component.scss'
})
export class VehicleUpsertComponent implements OnInit {
  @Input({required: true}) strategy: ABaseUpsertVehicleStrategy;

  formGroup = new FormGroup<ControlsOf<VehicleViewDto>>({
    brand: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    displacement: new FormControl(null, [Validators.required, Validators.min(0)]),
    engineType: new FormControl<EngineType>(null, Validators.required),
    model: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    registrationNumber: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    transmissionType: new FormControl<TransmissionType>(null, Validators.required),
    wheelRadius: new FormControl<number>(null, Validators.min(0)),
    yearOfRelease: new FormControl(null, [Validators.required, Validators.min(1975)]),
  });
  formControlNames = getFormControlsNames(this.formGroup);

  engineTypes = getEngineTypes();
  transmissionTypes = getTransmissionTypes();

  ngOnInit() {
    this.strategy.initialValue$
      .subscribe({
        next: val => {
          const {
            brand,
            wheelRadius,
            engineType,
            transmissionType,
            yearOfRelease,
            model,
            registrationNumber,
            displacement
          } = val;
          this.formGroup.setValue({
            brand,
            wheelRadius,
            engineType,
            transmissionType,
            yearOfRelease,
            model,
            registrationNumber,
            displacement
          });
        }
      })
  }
}
