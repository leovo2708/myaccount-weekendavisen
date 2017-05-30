import { NO_ERRORS_SCHEMA } from '@angular/core';

import { RootComponent } from './root.component';
import { RootPage } from './root.page';

describe('RootComponent', () => {
  it('should contain all necessary components', () => {
    const page: RootPage = new RootPage(RootComponent, {
      declarations: [ RootComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    page.fixture.detectChanges();

    expect(page.topBarElement).toBeTruthy();
    expect(page.loadingElement).toBeTruthy();
    expect(page.mainMenuElement).toBeTruthy();
    expect(page.routerOutletElement).toBeTruthy();
    expect(page.footerElement).toBeTruthy();
  });
});
