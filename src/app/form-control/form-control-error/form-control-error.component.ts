import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html'
})
export class FormControlErrorComponent {
  @Input() formInput: FormControl;

  /**
   * This input represents an array of error names that this components should react on (i.e. show the message).
   *
   * It accepts an array of strings, e.g. [errors]="['required', 'email']".
   *
   * By default it will equal to errors="required"
   *
   * You can also pass a string which will be converted into a single-item array, e.g. errors="required"
   * will be the same as [errors]="['required']".
   *
   * Array of error names will be matched with an OR operator, that means ANY of the
   * name must be present in the form control's errors list to show the error message.
   *
   * Instead of an error name you can pass a comma separated names, e.g. errors="required,email" - in such case
   * those 2 errors will be compared with an AND operator, that means ALL of the comma separated
   * items must be present in the form control errors list to show the error message.
   *
   * Every error name can be preceded with "!" to achieve a NOT comparison, e.g. you can pass
   * errors="!required,email" to show the message every time the "required" validator is NOT true AND "email"
   * validator IS true.
   */
  @Input() errors: string | string[];

  errorsMatch(): boolean {
    const errorsArray: string[] = this.getErrorsArray();

    return errorsArray.reduce((lastError: boolean, errorNameGroup: string) => {
      return lastError || this.errorGroupMatches(errorNameGroup);
    }, false);
  }

  errorGroupMatches(errorNameGroup: string): boolean {
    return errorNameGroup
      .split(',')
      .reduce((subError: boolean, subErrorName: string) => {
        if (subErrorName.indexOf('!') === 0) {
          return subError && !this.formInput.hasError(subErrorName.substr(1));
        }

        return subError && this.formInput.hasError(subErrorName);
      }, true);
  }

  getErrorsArray(): string[] {
    if (!this.errors) {
      return ['required'];
    }

    if (Array.isArray(this.errors)) {
      return this.errors;
    }

    return [this.errors];
  }

  isVisible(): boolean {
    return this.formInput.touched && this.formInput.invalid && this.errorsMatch();
  }
}
