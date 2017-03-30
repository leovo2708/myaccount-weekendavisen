import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { OrdersService } from '../orders.service';
import { OrderFull } from '../../../../d/kundeunivers';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order: OrderFull;
  sub: Subscription;

  constructor(private ordersService: OrdersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .subscribe((params: string[]) => {
        this.ordersService.getOrder(params['orderId'])
          .toPromise()
          .then((response: Response) => response.json())
          .then((order: OrderFull) => {
            this.order = order;
          });
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
