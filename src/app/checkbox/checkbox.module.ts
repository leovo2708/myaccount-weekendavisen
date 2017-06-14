import { NgModule } from '@angular/core';

import { CheckboxContainerComponent } from './checkbox-container.component';
import { CheckboxDirective } from './checkbox.directive';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [
    CheckboxContainerComponent,
    CheckboxDirective
  ],
  imports: [
    IconsModule
  ],
  exports: [
    CheckboxContainerComponent,
    CheckboxDirective
  ],
  entryComponents: [CheckboxContainerComponent]
})
export class CheckboxModule {
}
