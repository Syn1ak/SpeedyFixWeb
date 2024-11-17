import {AfterContentInit, ChangeDetectorRef, Component, ContentChild, inject, Input, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, Validators} from "@angular/forms";
import {ValidationErrorMessageInjectionToken} from "./errors/validation-error.message.builder";
import {FormElementDirective} from "./form-element.directive";
import {MatFormField, MatFormFieldControl} from "@angular/material/form-field";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.scss'
})
export class FormControlComponent implements AfterContentInit {
  @Input() label: string = ''

  @ContentChild(FormElementDirective) formControl?: FormElementDirective;

  private formGroupDirective = inject(FormGroupDirective, {host: true, optional: true});
  private errorMessageConfiguration = inject(ValidationErrorMessageInjectionToken);

  @ContentChild(MatFormFieldControl) matFormFieldControl?: MatFormFieldControl<any>;

  @ViewChild(MatFormField, { static: true }) matFormField?: MatFormField;

  private cdr = inject(ChangeDetectorRef);

  ngAfterContentInit(): void {
    console.log("MatFormFieldControl", this.matFormFieldControl);

    if (!this.matFormFieldControl) {
      console.warn('Projected content inside <mat-form-field> must implement MatFormFieldControl.');
    } else if (this.matFormField) {
      this.matFormField._control = this.matFormFieldControl;
    }
    this.cdr.detectChanges();
  }

  get control(): FormControl | null {
    return this.formControl?.ngControl?.control as FormControl;
  }

  get isRequired(): boolean {
    const control = this.control;
    return control ? control.hasValidator(Validators.required) : false;
  }

  getErrors(): string[] {
    const inputErrors = this.getInputErrors();
    const formErrors = this.getFormErrors();
    return [...inputErrors, ...formErrors];
  }

  private getInputErrors(): string[] {
    const control = this.control;
    if (!control?.errors) return [];
    const config = this.errorMessageConfiguration.inputErrors;
    return Object.entries(control.errors).map(([key, value]) => config[key]?.(value) || `Unknown error: ${key}`);
  }

  private getFormErrors(): string[] {
    const group = this.formGroupDirective?.form;
    if (!group?.errors) return [];
    const config = this.errorMessageConfiguration.formErrors;
    return Object.entries(group.errors).map(([key, value]) => config[key]?.errorValue(value) || `Unknown form error: ${key}`);
  }
}
