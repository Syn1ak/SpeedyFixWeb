import {Component, inject, OnInit} from '@angular/core';
import {ABaseInputControl} from "../ABaseInputControl";
import {FormControl, FormGroupDirective, NgControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidationErrorMessageInjectionToken} from "../errors/validation-error.message.builder";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './textarea-field.component.html',
  styleUrl: './textarea-field.component.scss'
})
export class TextareaFieldComponent extends ABaseInputControl<string> implements OnInit {
  private ngControl = inject(NgControl);
  private formGroupDirective = inject(FormGroupDirective, { host: true, optional: true });

  private errorMessageConfiguration = inject(ValidationErrorMessageInjectionToken);

  public formControl!: FormControl;

  constructor(
  ) {
    super();
    this.ngControl.valueAccessor = this;
  }

  private getFormGroup() {
    return this.formGroupDirective?.form
  }

  public ngOnInit(): void {
    this.formControl = this.ngControl.control as FormControl;
  }

  get isRequired(): boolean {
    return this.formControl?.hasValidator(Validators.required) ?? false;
  }


  private getGroupControlName(): string | undefined {
    const group = this.getFormGroup()
    const control = this.formControl;
    if (!group || !control) return undefined
    return Object.keys(group.controls)
      .find((controlName) => control === group.controls[controlName]);
  }

  private getFormErrors(getHighlightedFields: boolean = false) {
    const controlName = this.getGroupControlName()
    if (!controlName) return []
    const errorsArray = Array
      .from(Object.entries(this.getFormGroup()?.errors || {}), ([key, value]) => ({key, value}))
      .filter(el => el.value)
    if (!errorsArray?.length)
      return []
    const config = this.errorMessageConfiguration.formErrors
    return errorsArray
      .filter(error => {
        const errorConfig = config[error.key]
        if (!errorConfig) {
          console.error(`Form error ${JSON.stringify(error)} not specified!!!`)
          return false
        }
        if (errorConfig.fieldWithComment == controlName)
          return true
        if (errorConfig.highlightedFields.includes(controlName)) {
          return getHighlightedFields
        }
        return false
      })
      .map(error => config[error.key].errorValue(error.value))
  }

  private getInputErrors() {
    const control = this.formControl;
    if (!control?.errors) return []
    const errorsArray = Array
      .from(Object.entries(control.errors), ([key, value]) => ({key, value}))
      .filter(el => el.value)
    if (!errorsArray?.length)
      return []
    const config = this.errorMessageConfiguration.inputErrors
    return errorsArray
      .filter(error => {
        const errorConfig = config[error.key]
        if (!errorConfig) {
          console.error(`Input error ${JSON.stringify(error)} not specified!!!`)
        }
        return Boolean(errorConfig)
      })
      .map(error => config[error.key](error.value))
  }

  public getErrors(): string[] {
    if (!this.formControl?.touched) return [];
    return [
      ...this.getInputErrors(),
      ...this.getFormErrors()
    ]
  }
}
