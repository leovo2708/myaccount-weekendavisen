import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { MessageService } from '../message/message.service';
import { Order, OrdersResponse, RemoveOrderResponse } from '../../../d/kundeunivers';
import { OrdersService } from './orders.service';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { SuspendOrderComponent } from './suspend-order/suspend-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private mdDialog: MdDialog,
              private messageService: MessageService,
              private ordersService: OrdersService) {
  }

  getOrders(): void {
    this.ordersService.getOrders()
      .then((response: OrdersResponse) => {
        this.orders = response.orders;
      });
  }

  ngOnInit(): void {
    this.getOrders();
  }

  changeAddress(orderId: string): void {
    this.mdDialog
      .open(ChangeAddressComponent, {
        data: {orderId}
      });
  }

  suspendOrder(orderId: string): void {
    this.mdDialog
      .open(SuspendOrderComponent, {
        data: {orderId}
      });
  }

  removeOrder(orderId: string): void {
    this.ordersService.removeOrder(orderId)
      .then((response: RemoveOrderResponse) => {
        this.messageService.success('Your order has been removed.');
        this.getOrders();
      })
      .catch(() => {
        this.messageService.warn('There is an error in order removing.');
      });
  }
}
