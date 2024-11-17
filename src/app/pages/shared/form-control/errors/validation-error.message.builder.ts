import {InjectionToken, Provider} from "@angular/core";

type TErrorConfigFn = (args?: any) => string;
type TFormErrorValue<T extends Record<string, any> = any> = {
  highlightedFields: Array<keyof T>,
  fieldWithComment: keyof T
  errorValue: TErrorConfigFn,
}

export const DEFAULT_INPUT_ERROR_MESSAGES: { [key: string]: TErrorConfigFn } = {
  required: () => "Поле обов'язкове",
  email: () => "Email  в неправильному форматі",
  minlength: ({requiredLength}) => `Мінімальна довжина ${requiredLength} символів`,
  maxlength: ({requiredLength}) => `Максимальна довжина ${requiredLength} символів`,
  min: ({min}) => `Mінімальне значення ${min}`,
  max: ({max}) => `Mаксимальне значення ${max}`,
  pattern: () => `Невірний формат`,
};


export const DEFAULT_FORM_ERROR_MESSAGES: { [key: string]: TFormErrorValue } = {}

export const provideValidationErrorMessages = <T extends Record<string, any> = {}>(
  inputErrors: { [key: string]: TErrorConfigFn },
  formErrors: { [key: string]: TFormErrorValue<T> } = {}
): Provider => {
  return {
    provide: ValidationErrorMessageInjectionToken,
    useValue: {
      inputErrors: {
        ...DEFAULT_INPUT_ERROR_MESSAGES,
        ...inputErrors
      },
      formErrors: {
        ...DEFAULT_FORM_ERROR_MESSAGES,
        ...formErrors
      }
    }
  }
}

export type  TValidationErrorMessageInjectionToken = {
  inputErrors: { [key: string]: TErrorConfigFn },
  formErrors: { [key: string]: TFormErrorValue }
}

export const ValidationErrorMessageInjectionToken = new InjectionToken<TValidationErrorMessageInjectionToken>('Validation error messages', {
  providedIn: 'root',
  factory: () => ({
    inputErrors: DEFAULT_INPUT_ERROR_MESSAGES,
    formErrors: DEFAULT_FORM_ERROR_MESSAGES
  })
})
