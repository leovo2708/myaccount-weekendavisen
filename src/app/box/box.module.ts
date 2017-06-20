import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxComponent } from './box.component';
import { BoxTitleComponent } from './box-title/box-title.component';
import { BoxesComponent } from './boxes/boxes.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BoxComponent,
    BoxTitleComponent,
    BoxesComponent
  ],
  exports: [
    BoxComponent,
    BoxTitleComponent,
    BoxesComponent
  ]
})
export class BoxModule { }
