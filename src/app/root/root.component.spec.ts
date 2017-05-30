import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootComponent } from './root.component';
import { RootPage } from './root.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RootComponent', () => {
  let page: RootPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RootComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    const fixture: ComponentFixture<RootComponent> = TestBed.createComponent(RootComponent);
    page = new RootPage(fixture);
  });

  it('should contain all necessary components', () => {
    expect(page.topBarElement).toBeTruthy();
    expect(page.loadingElement).toBeTruthy();
    expect(page.mainMenuElement).toBeTruthy();
    expect(page.routerOutletElement).toBeTruthy();
    expect(page.footerElement).toBeTruthy();
  });
});
