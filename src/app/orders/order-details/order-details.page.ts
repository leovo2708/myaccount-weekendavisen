import { ComponentFixture, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { OrderDetailsComponent } from './order-details.component';
import { OrdersService } from '../orders.service';
import { By } from '@angular/platform-browser';
import { OrderFull } from '../../../../d/kundeunivers';

export class OrderDetailsPage {
  subject: Subject<Params> = new Subject();
  component: OrderDetailsComponent;
  debugElement: DebugElement;
  ordersService: OrdersService;
  activatedRoute: ActivatedRoute;

  constructor(private fixture: ComponentFixture<OrderDetailsComponent>) {
    this.component = this.fixture.componentInstance;
    this.debugElement = this.fixture.debugElement;
    this.ordersService = this.debugElement.injector.get(OrdersService);
    this.activatedRoute = this.fixture.debugElement.injector.get(ActivatedRoute);

    this.initSpies();
    this.component.ngOnInit();
  }

  receiveOrderIdParam(orderId: string): void {
    this.subject.next({orderId});
    tick();
    this.fixture.detectChanges();
  }

  get deliveryAddressElement(): DebugElement {
    return this.debugElement.query(By.css('md-card md-card-content .address'));
  }

  get headerElement(): DebugElement {
    return this.debugElement.query(By.css('h3 span'));
  }

  get titleElement(): DebugElement {
    return this.debugElement.query(By.css('md-card md-card-header md-card-title'));
  }

  get order(): OrderFull {
    return {
      sap_order_id: '1234',
      product_family: 'Business',
      delivery_address: 'Fake Street 12, New York',
      transactions: []
    };
  }

  private initSpies(): void {
    spyOnProperty(this.activatedRoute, 'params', 'get').and.returnValue(this.subject.asObservable());
    spyOn(this.ordersService, 'getOrder').and.returnValue(Promise.resolve(this.order));
  }
}
