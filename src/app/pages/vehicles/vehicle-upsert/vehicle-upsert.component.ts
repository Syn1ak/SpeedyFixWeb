import {Component, inject, Input, OnInit} from '@angular/core';
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
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {getFormControlsNames} from "../../../core/utils/form/get-form-controls.util";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-vehicle-upsert',
  standalone: true,
  imports: [
    FormsModule,
    InputFieldComponent,
    MatIcon,
    RouterLink,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatSelectModule,
    MatCardModule,
    MatButton,
  ],
  templateUrl: './vehicle-upsert.component.html',
  styleUrl: './vehicle-upsert.component.scss'
})
export class VehicleUpsertComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  @Input({required: true}) strategy: ABaseUpsertVehicleStrategy;

  formGroup = new FormGroup<ControlsOf<VehicleViewDto>>({
    brand: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    displacement: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
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
    console.log(this.strategy);
    this.route.data.subscribe(({strategy}) => {
      this.strategy = strategy;
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
              displacement,
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
    })
  }

  submit() {
    console.log(this.formGroup.invalid, this.formGroup.value);
    if (this.formGroup.invalid) return this.formGroup.markAllAsTouched();
    const {displacement,wheelRadius,yearOfRelease} = this.formGroup.value;
    const id = this.authService.$userInfo()?.id;
    const data = {
      ...this.formGroup.value,
      displacement: Number(displacement),
      wheelRadius: Number(wheelRadius),
      yearOfRelease: Number(yearOfRelease),
      ownerId: id,
    } as VehicleViewDto;
    if (this.strategy.id) {
      data['id'] = this.strategy.id
    }
    this.strategy.updateMethod$(data).subscribe({
      next: () => this.router.navigate(['/vehicles'])
    })
  }
}
