import { NgModule } from '@angular/core';
import { MdProgressBarModule } from '@angular/material';

import { LoadingComponent } from './loading.component';
import { SharedModule } from '../shared/shared.module';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    MdProgressBarModule,
    SharedModule
  ],
  providers: [
    LoadingService
  ],
  exports: [
    LoadingComponent
  ]
})
export class LoadingModule {}
