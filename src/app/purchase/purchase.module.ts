import { NgModule } from '@angular/core';

import { PurchaseComponent } from './purchase.component';
import { LogoModule } from '../logo/logo.module';
import { SharedModule } from '../shared/shared.module';
import { OfferComponent } from './offer/offer.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { PurchaseService } from './purchase.service';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { FormControlModule } from '../form-control/form-control.module';
import { AutoCompleteModule } from '../auto-complete/auto-complete.module';
import { WindowRef } from '../common/window-ref';
import { OfferService } from './offer/offer.service';

@NgModule({
  declarations: [
    PurchaseComponent,
    OfferComponent,
    OfferCardComponent
  ],
  imports: [
    AutoCompleteModule,
    CheckboxModule,
    FormControlModule,
    LogoModule,
    SharedModule
  ],
  exports: [
    PurchaseComponent
  ],
  providers: [
    OfferService,
    PurchaseService,
    WindowRef
  ]
})
export class PurchaseModule {
}
