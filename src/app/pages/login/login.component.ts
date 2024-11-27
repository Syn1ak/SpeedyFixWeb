import {Component, inject} from '@angular/core';
import {InputFieldComponent} from "../../shared/inputs/input-field/input-field.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginDto} from "../../core/dto/auth-dto";
import {ControlsOf} from "../../core/utils/form/controls-of.util";
import {getFormControlsNames} from "../../core/utils/form/get-form-controls.util";
import {AuthService} from "../../core/services/auth.service";
import {take} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputFieldComponent,
    ReactiveFormsModule,
    MatIcon,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup<ControlsOf<LoginDto>>({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });
  formControlNames = getFormControlsNames(this.loginForm);


  submit() {
    if (this.loginForm.invalid) return this.loginForm.markAllAsTouched();
    this.authService.login(this.loginForm.value as LoginDto)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate(['/home'])
        },
        error: (err) => console.log(err)
      });
  }
}
