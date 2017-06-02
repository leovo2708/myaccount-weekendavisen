import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TestingPage } from '../common/testing-page';
import { PurchaseComponent } from './purchase.component';

export class PurchasePage extends TestingPage<PurchaseComponent> {
  initSpies(): void {}
  initStubs(): void {}

  get header(): DebugElement {
    return this.debugElement.query(By.css('header'));
  }

  get logo(): DebugElement {
    return this.header.query(By.css('app-logo'));
  }

  get routerElement(): DebugElement {
    return this.debugElement.query(By.css('router-outlet'));
  }
}
