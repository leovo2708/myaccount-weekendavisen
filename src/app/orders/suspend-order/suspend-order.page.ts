import { ComponentFixture } from '@angular/core/testing';
import { MdDialogRef } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SuspendOrderComponent } from './suspend-order.component';

export class SuspendOrderPage {
  component: SuspendOrderComponent;
  debugElement: DebugElement;
  mdDialogRef: MdDialogRef<SuspendOrderComponent>;

  constructor(private fixture: ComponentFixture<SuspendOrderComponent>) {
    this.component = fixture.componentInstance;
    this.debugElement = fixture.debugElement;
    this.mdDialogRef = this.debugElement.injector.get(MdDialogRef);

    this.component.ngOnInit();
    this.initSpies();
  }

  clickNthActionButton(index: number): void {
    const buttons: DebugElement[] = this.debugElement.queryAll(By.css('md-dialog-actions button'));

    buttons[index].triggerEventHandler('click', null);
  }

  initSpies(): void {
    spyOn(this.mdDialogRef, 'close').and.callThrough();
  }
}
