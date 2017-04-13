import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../core/api.service';

@Injectable()
export class OrdersService {
  constructor(private api: ApiService) {
  }

  getOrders(): Observable<Response> {
    return this.api.get('/kundeunivers/orders');
  }

  getOrder(orderId: string): Observable<Response> {
    return this.api.get(`/kundeunivers/orders/${orderId}`);
  }
}
