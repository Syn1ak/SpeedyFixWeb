import {Component, ElementRef, inject, Inject, OnInit, signal, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {OperationUpsertModal} from "../operation-upsert-modal/operation-upsert-modal.component";
import {ControlsOf} from "../../../core/utils/form/controls-of.util";
import {OperationOrderStatusType, OperationOrderViewDto} from "../../../core/dto/operation-order-dto";
import {getFormControlsNames} from "../../../core/utils/form/get-form-controls.util";
import {EmployeeDto} from "../../../core/dto/employees-dto";
import {AuthService} from "../../../core/services/auth.service";
import {VehiclesService} from "../../vehicles/vehicles.service";
import {take} from "rxjs";
import {VehicleDto} from "../../../core/dto/vehicles-dto";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {format} from "date-fns";

type OperationOrderModal = Omit<OperationUpsertModal, "title">;

@Component({
  selector: 'app-operation-order-modal',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule,
    MatDialogModule, MatSelectModule, MatButtonModule, MatChipsModule, MatIconModule, MatAutocompleteModule
  ],
  templateUrl: './operation-order-modal.component.html',
  styleUrl: './operation-order-modal.component.scss'
})
export class OperationOrderModalComponent implements OnInit {
  private authService = inject(AuthService);
  private vehiclesService = inject(VehiclesService);

  formGroup = new FormGroup<ControlsOf<OperationOrderViewDto>>({
    orderStatus: new FormControl(null, Validators.required),
    vehicleId: new FormControl(null, Validators.required),
    operationIds: new FormControl(null, Validators.required),
    endDate: new FormControl(null, [Validators.required]),
    employees: new FormControl(null, Validators.required),
    customerId: new FormControl(null, Validators.required),
  })
  formControlNames = getFormControlsNames(this.formGroup);

  $employees = signal<EmployeeDto[]>([]);
  $vehicles = signal<VehicleDto[]>([]);

  constructor(
    public dialogRef: MatDialogRef<OperationOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OperationOrderModal
  ) {
  }

  ngOnInit() {
    const {initialModel} = this.data;
    this.$employees.set(initialModel.employees);
    const {orderStatus, customerId, operationIds} = this.formGroup.controls;
    orderStatus.setValue(OperationOrderStatusType.PENDING);
    const userId = this.authService.$userInfo()?.id;
    customerId.setValue(userId);
    const id = initialModel.id;
    (operationIds as FormControl<number[]>).setValue([id]);
    this.vehiclesService.getVehiclesByOwner(userId)
      .pipe(take(1))
      .subscribe({
        next: (res) => this.$vehicles.set(res)
      })
  }

  submit() {
    console.log(this.formGroup.invalid, this.formGroup.value);
    if (this.formGroup.invalid) return this.formGroup.markAllAsTouched();
    const {orderStatus, operationIds, employees, endDate, customerId, vehicleId} = this.formGroup.value;
    let endDateFormatted = endDate;
    if (endDate) {
      endDateFormatted = format(new Date(endDate), 'yyyy-MM-dd');
    }
    const view: OperationOrderViewDto = {
      employeeIds: employees.map(employee => employee.id),
      orderStatus,
      endDate: endDateFormatted,
      operationIds,
      vehicleId,
      customerId
    }
    console.log(view);
    this.dialogRef.close(view);
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Скидаємо години, хвилини, секунди для порівняння лише дати
    return date ? date >= today : false;
  };

  @ViewChild('employeesInput') employeeInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  employeesCtrl = new FormControl('');

  announcer = inject(LiveAnnouncer);

  remove(id: number): void {
    const employeeIdsControl = this.formGroup.controls.employees as FormControl<EmployeeDto[]>;
    const employees = employeeIdsControl.value as EmployeeDto[];
    const index = employees.findIndex(el => el.id === id);

    if (index < 0) return;
    employees.splice(index, 1);
    employeeIdsControl.setValue(employees);

    this.announcer.announce(`Removed ${id}`);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const employeeIdsControl = this.formGroup.controls.employees as FormControl<EmployeeDto[]>;
    const employeeIds = employeeIdsControl.value as EmployeeDto[];
    const employee = event.option.value as EmployeeDto;
    const index = employeeIds.findIndex(el => el.id === employee.id);
    if (index >= 0) return;
    const newValue = [...employeeIds, employee];
    employeeIdsControl.setValue(newValue);

    this.employeeInput.nativeElement.value = '';
  }
}
