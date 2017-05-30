import { DebugElement } from '@angular/core';
import { MdDialog } from '@angular/material';
import { By } from '@angular/platform-browser';

import { OrdersComponent } from './orders.component';
import { OrdersService } from './orders.service';
import { MessageService } from '../message/message.service';
import { TestingPage } from '../common/testing-page';

export class OrdersPage extends TestingPage<OrdersComponent> {
  mdDialog: MdDialog;
  ordersService: OrdersService;
  messageService: MessageService;

  initSpies(): void {
    spyOn(this.ordersService, 'getOrders').and.returnValue(Promise.resolve({
      orders: [
        {
          product_family: 'Foo Product',
          sap_order_id: '123456',
          delivery_address: 'Bar street 14/15 123 New York',
          suspend_allowed: false
        },
        { product_family: '', sap_order_id: '', delivery_address: '', suspend_allowed: false },
        { product_family: '', sap_order_id: '', delivery_address: '', suspend_allowed: true }
      ]
    }));
    spyOn(this.mdDialog, 'open').and.callThrough();
    spyOn(this.ordersService, 'removeOrder');
    spyOn(this.messageService, 'success').and.callThrough();
    spyOn(this.messageService, 'warn').and.callThrough();
  }

  initStubs(): void {
    this.mdDialog = this.debugElement.injector.get(MdDialog);
    this.ordersService = this.debugElement.injector.get(OrdersService);
    this.messageService = this.debugElement.injector.get(MessageService);
  }

  get containerElement(): DebugElement {
    return this.fixture.debugElement.query(By.css('.orders-list'));
  }

  get orders(): DebugElement[] {
    return this.containerElement.queryAll(By.css('.order-card'));
  }

  get firstOrderText(): string {
    return this.orders[0].nativeElement.textContent;
  }

  get removeOrderSpy(): jasmine.Spy {
    return this.ordersService.removeOrder as jasmine.Spy;
  }
}
