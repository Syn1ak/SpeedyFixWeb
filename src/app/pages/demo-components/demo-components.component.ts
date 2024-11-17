import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormElementModule} from "../shared/form-control/form-control.module";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatFieldComponent} from "../shared/mat-field/mat-field.component";

@Component({
  selector: 'app-demo-components',
  standalone: true,
  imports: [
    FormElementModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatFieldComponent
  ],
  templateUrl: './demo-components.component.html',
  styleUrl: './demo-components.component.scss'
})
export class DemoComponentsComponent {

  formGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  usernameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
}
