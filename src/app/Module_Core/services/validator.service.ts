import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorService {

  constructor() { }

  // useage: fieldName: [value, NumberValidators.range(1,5)]
  numberRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value)) || c.value < min || c.value > max) {
        return { 'range': true };
      }
      return null;
    }
  }
}
