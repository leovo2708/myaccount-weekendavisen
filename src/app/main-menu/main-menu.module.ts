import { NgModule } from '@angular/core';
import { MdIconModule, MdTabsModule } from '@angular/material';

import { MainMenuComponent } from './main-menu.component';
import { SharedModule } from '../shared/shared.module';
import { MainMenuService } from './main-menu.service';
import { LoadingEllipsisComponent } from '../loading-ellipsis/loading-ellipsis.component';

@NgModule({
  imports: [
    MdIconModule,
    MdTabsModule,
    SharedModule
  ],
  declarations: [
    LoadingEllipsisComponent,
    MainMenuComponent
  ],
  providers: [
    MainMenuService
  ],
  exports: [
    MainMenuComponent
  ]
})
export class MainMenuModule {
}
