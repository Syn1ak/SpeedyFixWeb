import {Component, ElementRef, inject, Inject, OnInit, signal, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {OperationDto, OperationViewDto} from "../../../core/dto/operations-dto";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../core/utils/form/controls-of.util";
import {InputFieldComponent} from "../../../shared/inputs/input-field/input-field.component";
import {getFormControlsNames} from "../../../core/utils/form/get-form-controls.util";
import {TextareaFieldComponent} from "../../../shared/inputs/textarea-field/textarea-field.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {EmployeeService} from "../../../core/services/employee.service";
import {EmployeeDto, EmployeeType} from "../../../core/dto/auth-dto";
import {AsyncPipe} from "@angular/common";

interface OperationUpsertModal {
  title: string;
  initialModel: OperationDto;
}

type OperationFormDto = Omit<OperationDto, "id" | "employees"> & {
  employees: EmployeeDto[];
}

@Component({
  selector: 'app-operation-upsert-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton,
    ReactiveFormsModule,
    InputFieldComponent,
    TextareaFieldComponent,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './operation-upsert-modal.component.html',
  styleUrl: './operation-upsert-modal.component.scss'
})
export class OperationUpsertModalComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  title: string = '';

  formGroup = new FormGroup<ControlsOf<OperationFormDto>>({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    description: new FormControl(null, [Validators.required, Validators.min(10)]),
    employees: new FormControl([], Validators.required)
  });
  formControlNames = getFormControlsNames(this.formGroup);

  constructor(
    public dialogRef: MatDialogRef<OperationUpsertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OperationUpsertModal
  ) {
  }

  ngOnInit() {
    const {title, initialModel} = this.data;
    this.title = title;
    this.employeeService.getListOfOfEmployees()
      .subscribe({
        next: val => this.$employees.set(
          val.filter(item => item.type === EmployeeType.MECHANIC)
        )
      });
    if (!initialModel) return;
    const {employees, price, description, name} = initialModel;
    this.formGroup.setValue({
      employees, price, description, name
    });
    // this.employeesCtrl.valueChanges.subscribe({
    //     next: (query: string) => {
    //       console.log(query);
    //       this.filteredEmployees = (query ? this._filter(query) : this.$employees().slice())
    //     }
    //   }
    // );
  }

  submit() {
    if (this.formGroup.invalid) return this.formGroup.markAllAsTouched();
    const {name, price, description, employees} = this.formGroup.value;
    console.log(employees)
    const employeeIds = employees.map(employee => employee.id);
    const operation: OperationViewDto = {
      name,
      price,
      description,
      employeeIds
    }
    console.log(operation);
    this.dialogRef.close(operation);
  }

  // filteredEmployees: EmployeeDto[];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  $employees = signal<EmployeeDto[]>([]);

  @ViewChild('employeesInput') employeeInput: ElementRef<HTMLInputElement>;

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

  // private _filter(value: string): EmployeeDto[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.$employees().filter(el => {
  //     const user = el.user;
  //     const userInfo = [user.firstName, user.lastName, el.position].join(" ");
  //     return userInfo.includes(filterValue)
  //   });
  // }
}
