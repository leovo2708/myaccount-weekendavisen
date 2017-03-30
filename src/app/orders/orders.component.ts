import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { Order, OrdersResponse } from '../../../d/kundeunivers';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.ordersService.getOrders()
      .toPromise()
      .then((response: Response) => response.json())
      .then((response: OrdersResponse) => {
        this.orders = response.orders;
      });
  }

}
