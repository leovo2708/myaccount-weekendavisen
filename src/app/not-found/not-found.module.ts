import { NgModule } from '@angular/core';
import { MdCardModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    MdCardModule,
    SharedModule
  ],
  declarations: [
    NotFoundComponent
  ]
})
export class NotFoundModule {

}
