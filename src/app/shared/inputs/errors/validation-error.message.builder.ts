import {InjectionToken, Provider} from "@angular/core";

type TErrorConfigFn = (args?: any) => string;
type TFormErrorValue<T extends Record<string, any> = any> = {
  highlightedFields: Array<keyof T>,
  fieldWithComment: keyof T
  errorValue: TErrorConfigFn,
}

export const DEFAULT_INPUT_ERROR_MESSAGES: { [key: string]: TErrorConfigFn } = {
  required: () => "Field is required",
  email: () => "Invalid email format",
  minlength: ({requiredLength}) => `Minimum length is ${requiredLength} characters`,
  maxlength: ({requiredLength}) => `Maximum length is ${requiredLength} characters`,
  min: ({min}) => `Minimum value is ${min}`,
  max: ({max}) => `Maximum value is ${max}`,
  pattern: () => `Invalid format`,
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
