import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let componentElement: DebugElement;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    componentElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should contain only one child', () => {
    expect(componentElement.children.length).toBe(1);
  });

  it('should contain the heading title', () => {
    expect(componentElement.query(By.css('h3')).nativeElement.textContent).toEqual('Dashboard');
  });
});
