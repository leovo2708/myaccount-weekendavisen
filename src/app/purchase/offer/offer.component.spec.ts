import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { OfferComponent } from './offer.component';
import { PurchaseService } from '../purchase.service';
import { PurchaseStub } from '../purchase.stub';
import { ActivatedRouteStub } from '../../core/activated-route.stub';

describe('OfferComponent', () => {
  let component: OfferComponent;
  let fixture: ComponentFixture<OfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferComponent],
      providers: [
        FormBuilder,
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: PurchaseService, useClass: PurchaseStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
