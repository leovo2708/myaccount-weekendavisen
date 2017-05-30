import { MdDialogRef } from '@angular/material';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SuspendOrderComponent } from './suspend-order.component';
import { TestingPage } from '../../common/testing-page';

export class SuspendOrderPage extends TestingPage<SuspendOrderComponent> {
  mdDialogRef: MdDialogRef<SuspendOrderComponent>;

  initSpies(): void {
    spyOn(this.mdDialogRef, 'close').and.callThrough();
  }

  initStubs(): void {
    this.mdDialogRef = this.debugElement.injector.get(MdDialogRef);
  }

  clickNthActionButton(index: number): void {
    const buttons: DebugElement[] = this.debugElement.queryAll(By.css('md-dialog-actions button'));

    buttons[index].triggerEventHandler('click', null);
  }
}
