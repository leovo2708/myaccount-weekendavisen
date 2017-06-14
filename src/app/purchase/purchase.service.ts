import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { CityResponse, CreateOrderPayload, CreateOrderResponse, OffersResponse } from '../../../d/kundeunivers';
import { ApiService } from '../core/api.service';

@Injectable()
export class PurchaseService {
  constructor(private api: ApiService) {
  }

  createOrder(payload: CreateOrderPayload): Promise<CreateOrderResponse> {
    const return_url: string = `${location.origin}/transaction/!tid`;

    return this.api.post(`/kundeunivers/orders`, {...payload, return_url})
      .toPromise()
      .then((response: Response) => response.json());
  }

  findCity(zipCode: string): Promise<CityResponse> {
    return this.api.get(`/kundeunivers/city/${zipCode}`)
      .toPromise()
      .then((response: Response) => response.json());
  }

  getOffers(offerId: string): Promise<OffersResponse> {
    return this.api.get(`/kundeunivers/offers/${offerId}`)
      .toPromise()
      .then((response: Response) => response.json());
  }
}
