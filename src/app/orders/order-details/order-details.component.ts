import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OrdersService } from '../orders.service';
import { OrderFull } from '../../../../d/kundeunivers';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: OrderFull;

  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.ordersService.getOrder(params['orderId'])
        .then((order: OrderFull) => {
          this.order = order;
        });
    });
  }
}
