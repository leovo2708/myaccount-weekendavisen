import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BoxComponent } from './box.component';

describe('BoxComponent', () => {
  let fixture: ComponentFixture<any>;
  let boxElement: DebugElement;
  let contentElement: DebugElement;
  let titleElement: DebugElement;

  function createComponent(component: any): void {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();

    boxElement = fixture.debugElement.query(By.css('.box'));
    contentElement = boxElement.query(By.css('.content'));
    titleElement = boxElement.children[0];
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoxComponent,
        TestComponent,
        Test2Component
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    });
  });

  it('should be created with simple content', () => {
    createComponent(TestComponent);
    expect(boxElement.children.length).toBe(1);
    expect(contentElement.children.length).toBe(1);
    expect(contentElement.nativeElement.textContent).toContain('Bow');
  });

  it('should be created with title', () => {
    createComponent(Test2Component);
    expect(boxElement.children.length).toBe(2);
    expect(boxElement.nativeElement.textContent).toContain('Title');
  });
});

@Component({
  selector: 'app-test',
  template: `<app-box>
    <strong>Bow</strong>
  </app-box>`
})
class TestComponent {
}

@Component({
  selector: 'app-test',
  template: `<app-box>
    <app-box-title>Title</app-box-title>
    <strong>Bow</strong>
  </app-box>`
})
class Test2Component {
}
