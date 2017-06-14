import { Injectable } from '@angular/core';

import { CreateOrderPayload, CreateOrderResponse, OffersResponse } from '../../../d/kundeunivers';

@Injectable()
export class PurchaseStub {
  getOffers(offerId: string): Promise<OffersResponse> {
    return null;
  }

  createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
    return null;
  }
}
