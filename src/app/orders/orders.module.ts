import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule,
  MdIconModule, MdInputModule, MdMenuModule
} from '@angular/material';

import { OrdersService } from './orders.service';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from '../shared/shared.module';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { SuspendOrderComponent } from './suspend-order/suspend-order.component';

@NgModule({
  imports: [
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    SharedModule
  ],
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    ChangeAddressComponent,
    SuspendOrderComponent
  ],
  entryComponents: [
    ChangeAddressComponent,
    SuspendOrderComponent
  ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule {
}
