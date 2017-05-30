import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingEllipsisComponent } from './loading-ellipsis.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoadingEllipsisComponent', () => {
  it('should create the component', () => {
    TestBed.configureTestingModule({
      declarations: [ LoadingEllipsisComponent ]
    });

    const fixture: ComponentFixture<LoadingEllipsisComponent> = TestBed.createComponent(LoadingEllipsisComponent);
    const dots: DebugElement[] = fixture.debugElement.queryAll(By.css('.ellipsis .dot'));

    fixture.detectChanges();
    expect(dots.length).toBe(3);
  });
});
