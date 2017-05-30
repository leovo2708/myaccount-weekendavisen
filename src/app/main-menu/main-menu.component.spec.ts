import { APP_BASE_HREF } from '@angular/common';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  ComponentFixture, fakeAsync, TestBed, tick
} from '@angular/core/testing';

import { MainMenuComponent } from './main-menu.component';
import { MainMenuStub } from './main-menu.stub';
import { MainMenuService } from './main-menu.service';
import { EPaper } from '../../../d/kundeunivers';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<MainMenuComponent>;
  let mainMenuService: MainMenuService;
  let mainMenuSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainMenuComponent],
      providers: [
        {provide: MainMenuService, useClass: MainMenuStub},
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [RouterModule.forRoot([])],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    mainMenuService = debugElement.injector.get(MainMenuService);
    mainMenuSpy = spyOn(mainMenuService, 'getEPaper');
  });

  it('should show loading element', fakeAsync(() => {
    mainMenuSpy.and.returnValue(Promise.resolve(null));
    fixture.detectChanges();

    const loadingElement: DebugElement = debugElement.query(By.css('app-loading-ellipsis'));
    expect(loadingElement).toBeTruthy();
    tick();
  }));

  it('should not show loading element after data fetch', fakeAsync(() => {
    mainMenuSpy.and.returnValue(Promise.resolve(null));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const loadingElement: DebugElement = debugElement.query(By.css('app-loading-ellipsis'));
    expect(loadingElement === null).toBeTruthy();
  }));

  it('should initialize menu items without e-paper when data fetch failed', fakeAsync(() => {
    mainMenuSpy.and.returnValue(Promise.reject(null));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const menuItems: DebugElement[] = debugElement.queryAll(By.css('a[md-tab-link]'));
    expect(menuItems.length).toBe(3);
  }));

  it('should initialize menu items without e-paper when user has no e-paper', fakeAsync(() => {
    const ePaper: EPaper = {
      status: 'FAIL',
      url: ''
    };

    mainMenuSpy.and.returnValue(Promise.resolve(ePaper));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const menuItems: DebugElement[] = debugElement.queryAll(By.css('a[md-tab-link]'));
    expect(menuItems.length).toBe(3);
  }));

  it('should initialize menu items with e-paper', fakeAsync(() => {
    const ePaper: EPaper = {
      status: 'OK',
      url: 'http://foo-bar.net'
    };

    mainMenuSpy.and.returnValue(Promise.resolve(ePaper));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const menuItems: DebugElement[] = debugElement.queryAll(By.css('a[md-tab-link]'));
    expect(menuItems.length).toBe(4);
  }));
});
