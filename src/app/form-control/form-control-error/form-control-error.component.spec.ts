import { Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FormControlErrorComponent } from './form-control-error.component';
import { FormControlErrorPage } from './form-control-error.page';

describe('FormControlErrorComponent', () => {
  let page: FormControlErrorPage;

  beforeEach(() => {
    page = new FormControlErrorPage(FormControlErrorComponent, {
      declarations: [ FormControlErrorComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should not show any errors on pristine input', () => {
    page.setFormInput('', Validators.required);
    page.errors = 'required';

    expect(page.messageElementExists).toBeFalsy();
  });

  it('should show an error based on single validator', () => {
    page.setFormInput('', Validators.required);
    page.touchFormInput();
    page.errors = 'required';

    expect(page.messageElementExists).toBeTruthy();
  });

  it('should not show an error for a valid touched input', () => {
    page.setFormInput('foobar', Validators.required);
    page.touchFormInput();
    page.errors = 'required';

    expect(page.messageElementExists).toBeFalsy();
  });

  it('should work with multiple error names', () => {
    page.setFormInput('', Validators.required, Validators.email, Validators.minLength(2));
    page.touchFormInput();

    page.errors = 'email';
    expect(page.messageElementExists).toBeTruthy();

    page.errors = ['required', 'email'];
    expect(page.messageElementExists).toBeTruthy();

    page.errors = ['required,email'];
    expect(page.messageElementExists).toBeTruthy();

    page.errors = ['!required,email'];
    expect(page.messageElementExists).toBeFalsy();

    page.setFormInput('a', Validators.required, Validators.email, Validators.minLength(2));

    page.errors = ['required,email'];
    expect(page.messageElementExists).toBeFalsy();

    page.errors = ['!required,email'];
    expect(page.messageElementExists).toBeFalsy();
  });
});
