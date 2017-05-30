import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MdDialog, MdMenuModule } from '@angular/material';
import {
  async,
  ComponentFixture, fakeAsync, TestBed, tick
} from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { MessageService } from '../message/message.service';
import { MessageStub } from '../message/message.stub';
import { OrdersService } from './orders.service';
import { OrdersStub } from './orders.stub';
import { MdDialogStub } from '../core/md-dialog.stub';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { SuspendOrderComponent } from './suspend-order/suspend-order.component';
import { OrdersPage } from './orders.page';

describe('OrdersComponent', () => {
  const orderId: string = '12345';

  let page: OrdersPage;

  beforeEach(() => {
    page = new OrdersPage(OrdersComponent, {
      declarations: [ OrdersComponent ],
      imports: [ MdMenuModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: MdDialog, useClass: MdDialogStub },
        { provide: MessageService, useClass: MessageStub },
        { provide: OrdersService, useClass: OrdersStub }
      ]
    });
  });

  it('should display initial list of orders', fakeAsync(() => {
    page.component.getOrders();
    tick();
    page.fixture.detectChanges();

    expect(page.orders.length).toBe(3);
    expect(page.firstOrderText).toContain('Foo Product');
    expect(page.firstOrderText).toContain('123456');
    expect(page.firstOrderText).toContain('Bar street 14/15 123 New York');
  }));

  it('should open "change address" dialog', () => {
    page.component.changeAddress(orderId);

    expect(page.mdDialog.open).toHaveBeenCalledWith(ChangeAddressComponent, {data: {orderId}});
  });

  it('should open "suspend order" dialog', () => {
    page.component.suspendOrder(orderId);

    expect(page.mdDialog.open).toHaveBeenCalledWith(SuspendOrderComponent, {data: {orderId}});
  });

  it('should fail to remove an order', fakeAsync(() => {
    page.removeOrderSpy.and.returnValue(Promise.reject(null));
    page.component.removeOrder(orderId);
    tick();

    expect(page.ordersService.removeOrder).toHaveBeenCalled();
    expect(page.messageService.warn).toHaveBeenCalled();
    expect(page.messageService.success).not.toHaveBeenCalled();
    expect(page.ordersService.getOrders).not.toHaveBeenCalled();
  }));

  it('should successfully remove an order', fakeAsync(() => {
    page.removeOrderSpy.and.returnValue(Promise.resolve(null));
    page.component.removeOrder(orderId);
    tick();

    expect(page.ordersService.removeOrder).toHaveBeenCalled();
    expect(page.messageService.success).toHaveBeenCalled();
    expect(page.ordersService.getOrders).toHaveBeenCalled();
    expect(page.messageService.warn).not.toHaveBeenCalled();
  }));
});
