import { NgModule } from '@angular/core';

import { FormControlErrorComponent } from './form-control-error/form-control-error.component';
import { SharedModule } from '../shared/shared.module';
import { FormControlMessageComponent } from './form-control-message/form-control-message.component';
import { FormControlErrorDirective } from './form-control-error.directive';

@NgModule({
  declarations: [
    FormControlErrorComponent,
    FormControlErrorDirective,
    FormControlMessageComponent
  ],
  imports: [SharedModule],
  exports: [
    FormControlErrorComponent,
    FormControlErrorDirective,
    FormControlMessageComponent
  ]
})
export class FormControlModule {
}
