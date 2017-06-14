import { TestingPage } from '../../common/testing-page';
import { FormControlErrorComponent } from './form-control-error.component';
import { By } from '@angular/platform-browser';
import { FormControl, ValidatorFn } from '@angular/forms';

export class FormControlErrorPage extends TestingPage<FormControlErrorComponent> {
  initSpies(): void {}
  initStubs(): void {}

  get messageElementExists(): boolean {
    return this.debugElement.query(By.css('app-form-control-message')) !== null;
  }

  setFormInput(value: string, validators: ValidatorFn | ValidatorFn[]): void {
    this.component.formInput = new FormControl(value, validators);
  }

  touchFormInput(): void {
    this.component.formInput.markAsTouched();
  }

  setAlwaysShow(value: string | boolean): void {
    this.component.alwaysShow = value;
  }

  set errors(errors: string | string[]) {
    this.component.errors = errors;
    this.fixture.detectChanges();
  }
}
