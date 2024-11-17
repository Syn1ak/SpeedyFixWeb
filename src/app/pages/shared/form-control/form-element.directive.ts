import {Directive, ElementRef, Inject, inject} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: `
    input
  `,
})
export class FormElementDirective {
  private nativeElement = inject(ElementRef).nativeElement;

  readonly ngControl = inject(NgControl, {
    self: true,
    optional: true
  });

  constructor() {
    this.checkNgControl();
    console.log("ngControl", this.ngControl?.control);
  }

  private checkNgControl(): void {
    if (!this.ngControl) {
      console.warn(`FormElementDirective: NgControl is not provided for element`);
    }
  }
}
