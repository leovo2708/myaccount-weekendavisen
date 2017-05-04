import { NgModule } from '@angular/core';
import { MdCardModule, MdIconModule } from '@angular/material';

import { MessageComponent } from './message.component';
import { MessageService } from './message.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    MdCardModule,
    MdIconModule,
    SharedModule
  ],
  declarations: [
    MessageComponent
  ],
  providers: [
    MessageService
  ],
  exports: [
    MessageComponent
  ]
})
export class MessageModule {
}
