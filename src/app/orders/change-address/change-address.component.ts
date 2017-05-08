import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { OrdersService } from '../orders.service';
import { ChangeAddressModel } from '../../../../d/kundeunivers.models';
import { MessageService } from '../../message/message.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {
  formModel: ChangeAddressModel;

  constructor(@Inject(MD_DIALOG_DATA) private data: any,
              private messageService: MessageService,
              private mdDialogRef: MdDialogRef<ChangeAddressComponent>,
              private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.formModel = new ChangeAddressModel();
  }

  cancel(): void {
    this.mdDialogRef.close();
  }

  save(form: FormGroup): void {
    if (form.valid) {
      this.ordersService
        .changeAddress(this.data.orderId, this.formModel)
        .then(() => {
          this.messageService.success('Your request has been accepted.');
          this.mdDialogRef.close();
        });
    }
  }
}
