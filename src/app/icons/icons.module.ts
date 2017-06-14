import { NgModule } from '@angular/core';
import { CheckIconComponent } from './check-icon/check-icon.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CheckIconComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CheckIconComponent
  ]
})
export class IconsModule {
}
