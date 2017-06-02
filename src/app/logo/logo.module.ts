import { NgModule } from '@angular/core';

import { LogoComponent } from './logo.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    LogoComponent
  ]
})
export class LogoModule {
}
