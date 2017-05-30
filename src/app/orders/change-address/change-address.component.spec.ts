import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { ChangeAddressComponent } from './change-address.component';
import { MessageService } from '../../message/message.service';
import { MessageStub } from '../../message/message.stub';
import { MdDialogRefStub } from 'app/core/md-dialog-ref.stub';
import { OrdersService } from '../orders.service';
import { OrdersStub } from '../orders.stub';
import { FormsModule } from '@angular/forms';
import { ChangeAddressModel } from './change-address.model';
import { ChangeAddressPage } from './change-address.page';

describe('ChangeAddressComponent', () => {
  const orderId: string = '12345';

  let page: ChangeAddressPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAddressComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: MD_DIALOG_DATA, useValue: { orderId } },
        { provide: MessageService, useClass: MessageStub },
        { provide: MdDialogRef, useClass: MdDialogRefStub },
        { provide: OrdersService, useClass: OrdersStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    const fixture: ComponentFixture<ChangeAddressComponent> = TestBed.createComponent(ChangeAddressComponent);
    page = new ChangeAddressPage(fixture);
  });

  it('should init the form model', () => {
    expect(page.formModel instanceof ChangeAddressModel).toBe(true);
  });

  xit('should not save an invalid form', () => {
    const formModel: ChangeAddressModel = {
      firstname: 'John',
      lastname: 'Doe'
    };

    page.changeInputValues(formModel).then(() => {
      page.clickNthActionButton(1);

      expect(page.component.save).toHaveBeenCalled();
      expect(page.ordersService.changeAddress).not.toHaveBeenCalled();
    });
  });

  xit('should save the form', () => {
    const formModel: ChangeAddressModel = {
      lastname: 'John',
      zipcode: '11-222',
      city: 'New York',
      street: 'Rosemary',
      number: '21',
      phone: '453123456',
      message: 'This is David speaking'
    };

    page.changeInputValues(formModel).then(() => {
      page.clickNthActionButton(1);

      expect(page.component.save).toHaveBeenCalled();
      expect(page.ordersService.changeAddress).toHaveBeenCalledWith(orderId, formModel);
    });
  });

  it('should close the dialog', () => {
    page.clickNthActionButton(0);

    expect(page.mdDialogRef.close).toHaveBeenCalled();
  });
});
