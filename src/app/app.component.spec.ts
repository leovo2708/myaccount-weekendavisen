import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should contain all necessary components', async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const debugElement: DebugElement = fixture.debugElement;

    expect(debugElement.query(By.css('router-outlet'))).toBeTruthy();
    expect(debugElement.query(By.css('app-message'))).toBeTruthy();
  }));
});
