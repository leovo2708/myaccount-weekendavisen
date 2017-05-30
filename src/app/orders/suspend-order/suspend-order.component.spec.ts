import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { SuspendOrderComponent } from './suspend-order.component';
import { SuspendOrderModel } from './suspend-order.model';
import { SuspendOrderPage } from './suspend-order.page';
import { MessageStub } from '../../message/message.stub';
import { MessageService } from '../../message/message.service';
import { MdDialogRefStub } from '../../core/md-dialog-ref.stub';
import { OrdersStub } from '../orders.stub';
import { OrdersService } from '../orders.service';

describe('SuspendOrderComponent', () => {
  const orderId: string = '12345';

  let page: SuspendOrderPage;

  beforeEach(() => {
    page = new SuspendOrderPage(SuspendOrderComponent, {
      declarations: [ SuspendOrderComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: MD_DIALOG_DATA, useValue: { orderId } },
        { provide: MessageService, useClass: MessageStub },
        { provide: MdDialogRef, useClass: MdDialogRefStub },
        { provide: OrdersService, useClass: OrdersStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    page.component.ngOnInit();
  });

  it('should initialize the form model', () => {
    expect(page.component.formModel instanceof SuspendOrderModel).toBe(true);
  });

  it('should close the dialog', () => {
    page.clickNthActionButton(0);

    expect(page.mdDialogRef.close).toHaveBeenCalled();
  });
});
