import {FormArray, FormControl, FormGroup} from "@angular/forms";

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]:
  T[K] extends File ? FormControl<T[K]> :
    T[K] extends Record<any, any>
      ? T[K] extends Array<any>
        ? FormControl<T[K]> | FormArray<T[K]>
        : FormGroup<T[K]>
      : FormControl<T[K]>;
};
