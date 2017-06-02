import { NgModule } from '@angular/core';

import { PurchaseComponent } from './purchase.component';
import { LogoModule } from '../logo/logo.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PurchaseComponent
  ],
  imports: [
    LogoModule,
    SharedModule
  ],
  exports: [
    PurchaseComponent
  ]
})
export class PurchaseModule {
}
