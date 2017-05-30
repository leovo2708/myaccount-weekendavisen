import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MdProgressBarModule } from '@angular/material';

import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';
import { LoadingStub } from './loading.stub';

describe('LoadingComponent', () => {
  let barElement: DebugElement;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingStub: LoadingStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ],
      imports: [ MdProgressBarModule ],
      providers: [
        { provide: LoadingService, useClass: LoadingStub }
      ]
    });

    fixture = TestBed.createComponent(LoadingComponent);
    barElement = fixture.debugElement.query(By.css('.bar'));
    loadingStub = TestBed.get(LoadingService);

    fixture.componentInstance.ngOnInit();
  });

  it('should initially not activate the loading bar', () => {
    fixture.detectChanges();
    expect(barElement.classes.active).toBe(false);
  });

  it('should activate the loading bar from service', () => {
    loadingStub.active.next(true);
    fixture.detectChanges();
    expect(barElement.classes.active).toBe(true);
  });
});
