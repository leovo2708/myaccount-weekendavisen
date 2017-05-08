import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Order, OrdersResponse } from '../../../d/kundeunivers';
import { OrdersService } from './orders.service';
import { ChangeAddressComponent } from './change-address/change-address.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private mdDialog: MdDialog,
              private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.ordersService.getOrders()
      .then((response: OrdersResponse) => {
        this.orders = response.orders;
      });
  }

  changeAddress(orderId: string): void {
    this.mdDialog
      .open(ChangeAddressComponent, {
        data: {orderId}
      });
  }
}
