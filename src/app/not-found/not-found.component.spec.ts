import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  it('should display a 404 info', () => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    const fixture: ComponentFixture<NotFoundComponent> = TestBed.createComponent(NotFoundComponent);
    const textContent: string = fixture.debugElement.nativeElement.textContent;

    fixture.detectChanges();

    expect(textContent).toContain('404');
    expect(textContent).toContain('Not found');
  });
});
