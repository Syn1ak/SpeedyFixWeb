import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../core/utils/form/controls-of.util";
import {EmployeeView, EmployeeViewDto, getEmployeeTypes} from "../../../core/dto/employees-dto";
import {UserViewDto} from "../../../core/dto/auth-dto";
import {getFormControlsNames} from "../../../core/utils/form/get-form-controls.util";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {InputFieldComponent} from "../../../shared/inputs/input-field/input-field.component";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatButton} from "@angular/material/button";
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {TextareaFieldComponent} from "../../../shared/inputs/textarea-field/textarea-field.component";
import {MatSelect} from "@angular/material/select";

type EmployeeUpsertDto = EmployeeView & UserViewDto;

interface EmployeesUpsertModal {
  title: string;
  initialModel: EmployeeViewDto;
}

@Component({
  selector: 'app-employees-upsert',
  standalone: true,
  imports: [
    FormsModule,
    InputFieldComponent,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatDialogModule,
    MatError,
    MatFormField,
    MatIcon,
    MatOption,
    TextareaFieldComponent,
    ReactiveFormsModule,
    MatSelect,
    MatDialogClose
  ],
  templateUrl: './employees-upsert.component.html',
  styleUrl: './employees-upsert.component.scss'
})
export class EmployeesUpsertComponent implements OnInit {
  title: string = '';
  id: number;

  formGroup = new FormGroup<ControlsOf<EmployeeUpsertDto>>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    position: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    type: new FormControl(null, Validators.required),
    firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    telephoneNumber: new FormControl(null, [Validators.required, Validators.min(2)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  })
  formControlNames = getFormControlsNames(this.formGroup);

  employeeTypes = getEmployeeTypes();

  constructor(
    public dialogRef: MatDialogRef<EmployeesUpsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeesUpsertModal
  ) {
  }

  ngOnInit() {
    const {title, initialModel} = this.data;
    this.title = title;
    if (!initialModel) return;
    this.formGroup.removeControl("password");
    const {position, type, id} = initialModel.employee;
    this.id = id;
    const {email, telephoneNumber, lastName, firstName} = initialModel.user;
    this.formGroup.patchValue({
      position,
      type,
      firstName,
      lastName,
      telephoneNumber,
      email
    });
  }

  submit() {
    console.log(this.formGroup.invalid, this.formGroup.value);
    if (this.formGroup.invalid) return this.formGroup.markAllAsTouched();
    const {position, telephoneNumber, type, firstName, lastName, email, password} = this.formGroup.value;
    const view = {
      user: {
        email,
        password,
        telephoneNumber,
        lastName,
        firstName
      },
      employee: {
        type,
        position
      }
    } as EmployeeViewDto;
    if (this.id) view.employee.id = this.id
    this.dialogRef.close(view);
  }
}
