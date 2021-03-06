import { DebugElement } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { isEmpty, pickBy, negate } from 'lodash/fp';
import { each } from 'lodash';

import { ChangeAddressComponent } from './change-address.component';
import { OrdersService } from '../orders.service';
import { ChangeAddressModel } from './change-address.model';
import { TestingPage } from '../../common/testing-page';

export class ChangeAddressPage extends TestingPage<ChangeAddressComponent> {
  mdDialogRef: MdDialogRef<ChangeAddressComponent>;
  ordersService: OrdersService;

  initSpies(): void {
    spyOn(this.component, 'save').and.callThrough();
    spyOn(this.ordersService, 'changeAddress').and.returnValue(Promise.resolve(null));
    spyOn(this.mdDialogRef, 'close').and.callThrough();
  }

  initStubs(): void {
    this.mdDialogRef = this.debugElement.injector.get(MdDialogRef);
    this.ordersService = this.debugElement.injector.get(OrdersService);
  }

  get formModel(): ChangeAddressModel {
    return this.component.formModel;
  }

  changeInputValue(inputValue: string, inputName: string): void {
    const input: HTMLInputElement = this.findInput(inputName).nativeElement;

    input.value = inputValue;
    input.dispatchEvent(new Event('input'));
  }

  changeInputValues(formModel: ChangeAddressModel): Promise<void> {
    const filtered: any = pickBy(negate(isEmpty))(formModel);
    each(filtered, this.changeInputValue.bind(this));

    return this.fixture.whenStable();
  }

  clickNthActionButton(buttonIndex: number): void {
    const actionButtons: DebugElement[] = this.debugElement.queryAll(By.css('md-dialog-actions button'));

    actionButtons[buttonIndex].triggerEventHandler('click', null);
    this.fixture.detectChanges();
  }

  findInput(inputName: string): DebugElement {
    return this.debugElement.query(By.css(`[name="${inputName}"]`));
  }
}
