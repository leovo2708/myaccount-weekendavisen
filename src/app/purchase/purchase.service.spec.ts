import { TestBed } from '@angular/core/testing';

import { PurchaseService } from './purchase.service';
import { ApiService } from '../core/api.service';
import { ApiStub } from '../core/api.stub';
import { Observable } from 'rxjs/Observable';
import { Offer } from './offer/offer.model';
import { OffersResponse } from '../../../d/kundeunivers';

describe('PurchaseService', () => {
  const offerId: string = 'BTSUDU12P1';
  const offer: Offer = {
    subscription_type_text: 'Komplet',
    service_type_text: 'hver fredag',
    frequency_id: '52',
    frequency_text: 'uger',
    total_price: 36.25,
    unit_price: 2.59,
    settings: {
      texts: {
        order_details_sidebar_footer: 'Adgang til E-avis og Lydavisen'
      }
    }
  };

  let apiService: ApiService;
  let purchaseService: PurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PurchaseService,
        {provide: ApiService, useClass: ApiStub}
      ]
    });

    purchaseService = TestBed.get(PurchaseService);
    apiService = TestBed.get(ApiService);
  });

  it('should get an offer details', async () => {
    const offersResponse: OffersResponse = {
      offers: [offer]
    };

    spyOn(apiService, 'get').and.returnValue(Observable.of({
      json: (): OffersResponse => (offersResponse)
    }));

    expect(await purchaseService.getOffers(offerId)).toBe(offersResponse);
    expect(apiService.get).toHaveBeenCalledWith(`/kundeunivers/offers/${offerId}`);
  });
});
