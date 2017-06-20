import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { BoxTitleComponent } from './box-title.component';
import { By } from '@angular/platform-browser';

describe('BoxTitleComponent', () => {

  it('should be created with content', () => {
    TestBed.configureTestingModule({
      declarations: [
        BoxTitleComponent,
        TestComponent
      ]
    });

    const fixture: ComponentFixture<BoxTitleComponent> = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.title')).nativeElement.textContent).toContain('Foo');
  });
});

@Component({
  selector: 'app-test',
  template: '<app-box-title>Foo</app-box-title>'
})
class TestComponent {
}
