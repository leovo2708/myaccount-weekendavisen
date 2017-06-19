import { TestingPage } from '../../common/testing-page';
import { OfferComponent } from './offer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { Subject } from 'rxjs/Subject';

export class OfferPage extends TestingPage<OfferComponent> {
  activatedRoute: ActivatedRoute;
  purchaseService: PurchaseService;
  routeParamsSubject: Subject<Params>;

  initSpies(): void {
    spyOnProperty(this.activatedRoute, 'params', 'get').and.returnValue(this.routeParamsSubject.asObservable());
    spyOn(this.purchaseService, 'getOffers').and.returnValue(Promise.resolve({
      offers: [
        {offer_id: '1', frequency_text: '1 month'},
        {offer_id: '2', frequency_text: '2 months'},
        {offer_id: '3', frequency_text: '3 months'}
      ]
    }));
  }

  initStubs(): void {
    this.routeParamsSubject = new Subject();
    this.activatedRoute = this.debugElement.injector.get(ActivatedRoute);
    this.purchaseService = this.debugElement.injector.get(PurchaseService);
  }

  findInput(inputName: string): DebugElement {
    return this.debugElement.query(By.css(`[formControlName="${inputName}"]`));
  }

  get offersOptions(): DebugElement[] {
    return this.findInput('offer_id').queryAll(By.css('option'));
  }

  sendParams(): void {
    this.routeParamsSubject.next({offerIdList: '1,2,3'});
  }
}
