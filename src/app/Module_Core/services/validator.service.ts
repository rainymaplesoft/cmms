import { ValidatorFn, AbstractControl } from '@angular/forms';

// useage: fieldName: [value, NumberValidators.range(1,5)]
export function NumberValidators(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if ((c.value && isNaN(c.value)) || c.value < min || c.value > max) {
      return { range: true };
    }
    return null;
  };
}

export function ValidateUrl(control: AbstractControl) {
  if (!control.value.startsWith('https') || !control.value.includes('.io')) {
    return { validUrl: true };
  }
  return null;
}

export class ValidatorService {}
