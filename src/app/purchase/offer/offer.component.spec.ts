import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { OfferComponent } from './offer.component';
import { PurchaseService } from '../purchase.service';
import { PurchaseStub } from '../purchase.stub';
import { ActivatedRouteStub } from '../../core/activated-route.stub';
import { WindowRef } from '../../common/window-ref';
import { WindowStub } from '../../common/window.stub';
import { OfferService } from './offer.service';
import { OfferStub } from './offer.stub';
import { OfferPage } from './offer.page';
import { CheckboxModule } from '../../checkbox/checkbox.module';
import { fakeAsync, tick } from '@angular/core/testing';

describe('OfferComponent', () => {
  let page: OfferPage;

  beforeEach(() => {
    page = new OfferPage(OfferComponent, {
      declarations: [
        OfferComponent
      ],
      imports: [CheckboxModule],
      providers: [
        FormBuilder,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: OfferService, useClass: OfferStub},
        {provide: PurchaseService, useClass: PurchaseStub},
        {provide: WindowRef, useClass: WindowStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    page.fixture.detectChanges();
  });

  it('should contain all necessary fields', () => {
    expect(page.findInput('firstname')).toBeTruthy();
    expect(page.findInput('lastname')).toBeTruthy();
    expect(page.findInput('address')).toBeTruthy();
    expect(page.findInput('zipcode')).toBeTruthy();
    expect(page.findInput('city')).toBeTruthy();
    expect(page.findInput('email')).toBeTruthy();
    expect(page.findInput('phone')).toBeTruthy();
    expect(page.findInput('terms')).toBeTruthy();
    expect(page.findInput('offer_id')).toBeTruthy();
  });

  it('should fetch offers and choose the first one', fakeAsync(() => {
    page.sendParams();
    tick();
    page.fixture.detectChanges();
    expect(page.offersOptions.length).toBe(3);
    expect(page.offersOptions[0].nativeElement.selected).toBe(true);
  }));
});
