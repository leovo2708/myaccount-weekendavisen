import { NgModule } from '@angular/core';

import { AutoCompleteComponent } from './auto-complete.component';
import { AutoCompleteDirective } from './auto-complete.directive';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AutoCompleteComponent,
    AutoCompleteDirective
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AutoCompleteComponent,
    AutoCompleteDirective
  ],
  entryComponents: [
    AutoCompleteComponent
  ]
})
export class AutoCompleteModule {
}
