import { NgModule } from '@angular/core';
import { MdButtonModule, MdIconModule, MdMenuModule, MdToolbarModule } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { TopBarComponent } from './top-bar.component';
import { LogoModule } from '../logo/logo.module';

@NgModule({
  imports: [
    LogoModule,
    MdButtonModule,
    MdIconModule,
    MdMenuModule,
    MdToolbarModule,
    SharedModule
  ],
  declarations: [
    TopBarComponent
  ],
  exports: [
    TopBarComponent
  ]
})
export class TopBarModule {
}
