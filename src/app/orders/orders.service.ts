import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../core/api.service';
import { ChangeAddressModel } from './change-address/change-address.model';

@Injectable()
export class OrdersService {
  constructor(private api: ApiService) {
  }

  changeAddress(ordersId: string, payload: ChangeAddressModel): Observable<Response> {
    return this.api.put(`/kundeunivers/orders/${ordersId}/address`, payload);
  }

  getOrders(): Observable<Response> {
    return this.api.get('/kundeunivers/orders');
  }

  getOrder(orderId: string): Observable<Response> {
    return this.api.get(`/kundeunivers/orders/${orderId}`);
  }
}
