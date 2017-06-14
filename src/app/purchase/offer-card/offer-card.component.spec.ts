import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCardComponent } from './offer-card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Offer } from '../../../../d/kundeunivers';

describe('OfferCardComponent', () => {
  const offer: Offer = {
    subscription_type_text: 'Komplet',
    service_type_text: 'hver fredag',
    frequency_id: '48',
    frequency_text: 'uger',
    total_price: 36.25,
    unit_price: 2.59,
    settings: {
      texts: {
        order_details_sidebar_footer: 'Adgang til E-avis og Lydavisen'
      }
    }
  };

  let component: OfferCardComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<OfferCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferCardComponent ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferCardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    component.offer = offer;
    fixture.detectChanges();
  });

  it('should contain offer details', () => {
    const divs: DebugElement[] = debugElement.queryAll(By.css('.card div'));

    expect(divs[0].query(By.css('strong'))).toBeTruthy();
    expect(divs[0].nativeElement.textContent).toContain(offer.subscription_type_text);
    expect(divs[1].nativeElement.textContent).toContain(`${offer.service_type_text} i ${offer.frequency_text}`);
    expect(divs[2].nativeElement.textContent).toContain(offer.settings.texts.order_details_sidebar_footer);
    expect(divs[3].query(By.css('strong'))).toBeTruthy();
    expect(divs[3].nativeElement.textContent).toContain(`${offer.total_price} kr.`);
    expect(divs[3].nativeElement.textContent).toContain(`${offer.unit_price} kr. pr. ${offer.frequency_text}`);
  });
});
