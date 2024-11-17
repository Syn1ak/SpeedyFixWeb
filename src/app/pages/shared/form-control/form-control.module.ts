import {NgModule} from '@angular/core';
import {FormControlComponent} from './form-control.component';
import {FormElementDirective} from "./form-element.directive";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [FormControlComponent, FormElementDirective],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  exports: [FormControlComponent, FormElementDirective],
})
export class FormElementModule {
}
