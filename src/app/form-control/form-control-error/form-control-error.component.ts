import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html'
})
export class FormControlErrorComponent {
  _alwaysShow: boolean;

  @Input() formInput: FormControl;
  @Input() errors: string | string[];

  @Input() set alwaysShow(value: string | boolean) {
    this._alwaysShow = value === '' || !!value;
  }

  get alwaysShow(): string | boolean {
    return this._alwaysShow;
  }

  isVisible(): boolean {
    return this.formInput.touched && this.formInput.invalid && this.hasErrors();
  }

  get errorsArray(): string[] {
    if (!this.errors) {
      return [];
    }

    if (Array.isArray(this.errors)) {
      return this.errors;
    }

    return [this.errors];
  }

  hasErrors(): boolean {
    const errorsArray: string[] = this.errorsArray;

    if (this.alwaysShow) {
      return this.errorsArray
        .map((error: string) => this.formInput.hasError(error))
        .reduce((lastError: boolean, thisError: boolean) => lastError && thisError, true);
    }

    return Object.keys(this.formInput.errors)
      .reduce((lastError: boolean, errorName: string) => {
        if (errorsArray.includes(errorName)) {
          return lastError && this.formInput.hasError(errorName);
        }

        return lastError && !this.formInput.hasError(errorName);
      }, true);
  }
}
