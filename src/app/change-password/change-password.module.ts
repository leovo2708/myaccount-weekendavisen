import { NgModule } from '@angular/core';
import { MdButtonModule, MdInputModule, MdDialogModule } from '@angular/material';

import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordService } from './change-password.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    MdButtonModule,
    MdInputModule,
    MdDialogModule,
    SharedModule
  ],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [
    ChangePasswordService
  ]
})
export class ChangePasswordModule {
}
