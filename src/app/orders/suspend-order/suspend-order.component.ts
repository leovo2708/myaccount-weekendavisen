import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import { OrdersService } from '../orders.service';
import { MessageService } from '../../message/message.service';
import { SuspendOrderModel } from './suspend-order.model';

@Component({
  selector: 'app-suspend-order',
  templateUrl: './suspend-order.component.html',
  styleUrls: ['./suspend-order.component.scss']
})
export class SuspendOrderComponent implements OnInit {
  formModel: SuspendOrderModel;

  constructor(@Inject(MD_DIALOG_DATA) private orderDialogData: {orderId: string},
              private messageService: MessageService,
              private mdDialogRef: MdDialogRef<SuspendOrderComponent>,
              private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.formModel = new SuspendOrderModel();
  }

  cancel(): void {
    this.mdDialogRef.close();
  }

  suspend(form: FormGroup): void {
    if (form.valid) {
      this.ordersService.suspendOrder(this.orderDialogData.orderId, this.formModel)
        .then(() => {
          this.messageService.success('Your request has been accepted.');
          this.mdDialogRef.close();
        });
    }
  }
}
