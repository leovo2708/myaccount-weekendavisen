import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdIconModule } from '@angular/material';

import { OrdersService } from './orders.service';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    SharedModule
  ],
  declarations: [
    OrdersComponent,
    OrderDetailsComponent
  ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule {
}
