import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputFieldComponent} from "../../shared/inputs/input-field/input-field.component";

@Component({
  selector: 'app-demo-components',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
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
