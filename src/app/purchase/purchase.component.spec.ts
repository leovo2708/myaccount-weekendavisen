import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PurchaseComponent } from './purchase.component';
import { PurchasePage } from './purchase.page';

describe('PurchaseComponent', () => {
  let page: PurchasePage;

  beforeEach(() => {
    page = new PurchasePage(PurchaseComponent, {
      declarations: [PurchaseComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    page.fixture.detectChanges();
  });

  it('should have a header with small logo', () => {
    expect(page.header).toBeTruthy();
    expect(page.logo).toBeTruthy();
    expect(page.logo.attributes.size).toBe('small');
  });

  it('should have the router-outlet component for child views', () => {
    expect(page.routerElement).toBeTruthy();
  });
});
