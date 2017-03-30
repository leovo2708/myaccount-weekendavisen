import { NgModule } from '@angular/core';
import { MdIconModule, MdTabsModule } from '@angular/material';

import { MainMenuComponent } from './main-menu.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    MdIconModule,
    MdTabsModule,
    SharedModule
  ],
  declarations: [
    MainMenuComponent
  ],
  exports: [
    MainMenuComponent
  ]
})
export class MainMenuModule {
}
