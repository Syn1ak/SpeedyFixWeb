import {Component, inject} from '@angular/core';
import {InputFieldComponent} from "../../shared/inputs/input-field/input-field.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {ControlsOf} from "../../core/utils/form/controls-of.util";
import {LoginDto, SignUpDto} from "../../core/dto/auth-dto";
import {getFormControlsNames} from "../../core/utils/form/get-form-controls.util";
import {take} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputFieldComponent,
    ReactiveFormsModule,
    MatIcon,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  signUp = new FormGroup<ControlsOf<SignUpDto>>({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    telephoneNumber: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });
  formControlNames = getFormControlsNames(this.signUp);


  submit() {
    if (this.signUp.invalid) return this.signUp.markAllAsTouched();
    this.authService.signUpCustomer(this.signUp.value as SignUpDto)
      .pipe(take(1))
      .subscribe({
        next: (id) => this.router.navigate(['/login']),
        error: (err) => console.log(err)
      });
  }
}
