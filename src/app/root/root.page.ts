import { DebugElement } from '@angular/core';

import { RootComponent } from './root.component';
import { By } from '@angular/platform-browser';
import { TestingPage } from '../common/testing-page';

export class RootPage extends TestingPage<RootComponent> {
  initSpies(): void {}
  initStubs(): void {}

  get topBarElement(): DebugElement {
    return this.debugElement.query(By.css('app-top-bar'));
  }

  get loadingElement(): DebugElement {
    return this.debugElement.query(By.css('app-loading'));
  }

  get mainMenuElement(): DebugElement {
    return this.debugElement.query(By.css('app-main-menu'));
  }

  get routerOutletElement(): DebugElement {
    return this.debugElement.query(By.css('router-outlet'));
  }

  get footerElement(): DebugElement {
    return this.debugElement.query(By.css('app-footer'));
  }
}
