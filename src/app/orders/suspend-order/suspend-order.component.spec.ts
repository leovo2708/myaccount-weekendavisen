import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendOrderComponent } from './suspend-order.component';

describe('SuspendOrderComponent', () => {
  let component: SuspendOrderComponent;
  let fixture: ComponentFixture<SuspendOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspendOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
