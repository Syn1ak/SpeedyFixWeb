import {Component, Input} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";

@Component({
  template: ""
})
export abstract class ABaseInputControl<T = any> implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() formControlName: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this._value = value;
  }

  private _value!: T;
  private onChange: any;
  private onTouched: any;

  public writeValue(value: T): void {
    this._value = value;
  }

  public registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  public updateValue(value: T): void {
    this.onChange(value);
    this.onTouched();
  }
}
