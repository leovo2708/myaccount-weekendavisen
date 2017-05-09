import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ApiService } from '../core/api.service';
import { LoadingService } from '../loading/loading.service';
import { ChangeAddressModel } from './change-address/change-address.model';
import { SuspendOrderModel } from './suspend-order/suspend-order.model';
import {
  OrderFull, OrdersResponse, SuspendOrderResponse, RemoveOrderResponse
} from '../../../d/kundeunivers';

@Injectable()
export class OrdersService {
  constructor(private api: ApiService,
              private loadingService: LoadingService) {
  }

  changeAddress(ordersId: string, payload: ChangeAddressModel): Promise<Response> {
    this.loadingService.show();

    return this.api.put(`/kundeunivers/orders/${ordersId}/address`, payload)
      .finally(() => this.loadingService.hide())
      .toPromise();
  }

  getOrders(): Promise<OrdersResponse> {
    this.loadingService.show();

    return this.api.get('/kundeunivers/orders')
      .finally(() => this.loadingService.hide())
      .toPromise()
      .then((response: Response) => response.json());
  }

  getOrder(orderId: string): Promise<OrderFull> {
    this.loadingService.show();

    return this.api.get(`/kundeunivers/orders/${orderId}`)
      .finally(() => this.loadingService.hide())
      .toPromise()
      .then((response: Response) => response.json());
  }

  suspendOrder(orderId: string, payload: SuspendOrderModel): Promise<SuspendOrderResponse> {
    this.loadingService.show();

    return this.api.put(`/kundeunivers/orders/${orderId}/suspend`, payload)
      .finally(() => this.loadingService.hide())
      .toPromise()
      .then((response: Response) => response.json());
  }

  removeOrder(orderId: string): Promise<RemoveOrderResponse> {
    this.loadingService.show();

    return this.api.delete(`/kundeunivers/orders/${orderId}`)
      .finally(() => this.loadingService.hide())
      .toPromise()
      .then((response: Response) => response.json());
  }
}
