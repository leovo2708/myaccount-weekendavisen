import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { ChangeAddressModel } from './change-address.model';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {
  formModel: ChangeAddressModel;

  constructor(@Inject(MD_DIALOG_DATA) private data: any,
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
        .toPromise()
        .then(() => {
          this.mdDialogRef.close();
        });
    }
  }
}
