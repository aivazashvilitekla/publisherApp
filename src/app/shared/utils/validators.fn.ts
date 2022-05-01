import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function patternValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    const valid = regex.test(control.value);
    return valid ? null : { invalidPassword: true };
  };
}
export function MatchPassword(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPassword?.pristine) {
    return null;
  }

  if (passwordControl?.value === confirmPassword?.value) {
    return null;
  }

  return { match: true };
}
