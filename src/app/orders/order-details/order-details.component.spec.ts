import { fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderDetailsComponent } from './order-details.component';
import { OrdersStub } from '../orders.stub';
import { OrdersService } from '../orders.service';
import { ActivatedRouteStub } from '../../core/activated-route.stub';
import { OrderDetailsPage } from './order-details.page';

describe('OrderDetailsComponent', () => {
  const orderId: string = '12345';

  let page: OrderDetailsPage;

  beforeEach(() => {
    page = new OrderDetailsPage(OrderDetailsComponent, {
      declarations: [ OrderDetailsComponent ],
      providers: [
        { provide: OrdersService, useClass: OrdersStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    page.component.ngOnInit();
  });

  it('should get order details when received params', fakeAsync(() => {
    page.receiveOrderIdParam(orderId);

    expect(page.ordersService.getOrder).toHaveBeenCalledWith(orderId);
    expect(page.headerElement.nativeElement.textContent).toContain(`#${page.order.sap_order_id}`);
    expect(page.titleElement.nativeElement.textContent).toContain(page.order.product_family);
    expect(page.deliveryAddressElement.nativeElement.textContent).toContain(page.order.delivery_address);
  }));
});
