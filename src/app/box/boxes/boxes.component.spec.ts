import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BoxesComponent } from './boxes.component';

describe('BoxesComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoxesComponent,
        TestComponent,
        Test2Component
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  });

  it('should be created with no app-box content', () => {
    const fixture: ComponentFixture<BoxesComponent> = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.boxes')).nativeElement.textContent).not.toContain('Foo');
  });

  it('should be created with app-box content', () => {
    const fixture: ComponentFixture<BoxesComponent> = TestBed.createComponent(Test2Component);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.boxes')).nativeElement.textContent).toContain('Foo');
  });
});

@Component({
  selector: 'app-test',
  template: '<app-boxes>Foo</app-boxes>'
})
class TestComponent {
}

@Component({
  selector: 'app-test',
  template: '<app-boxes><app-box>Foo</app-box></app-boxes>'
})
class Test2Component {
}
