import {AfterContentInit, Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatFormFieldControl} from "@angular/material/form-field";

@Component({
  selector: 'app-mat-field',
  standalone: true,
  imports: [
    MatFormField
  ],
  template: `
    <mat-form-field>
      <ng-content></ng-content>
      <div>
        <!-- Some warning messages -->
      </div>
    </mat-form-field>
  `
})
export class MatFieldComponent implements AfterContentInit {
  @ContentChild(MatFormFieldControl) _control!: MatFormFieldControl<any>;
  @ViewChild(MatFormField, { static: true }) _matFormField!: MatFormField;

  ngAfterContentInit(): void {
    console.log(this._control, this._matFormField)
    this._matFormField._control = this._control;
  }
}
