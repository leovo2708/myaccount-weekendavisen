import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormGroup } from '@angular/forms';

import { ChangePasswordService } from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private changePasswordService: ChangePasswordService) {
  }

  save() {

  }

  cancel() {

  }

  ngOnInit(): void {
    /*this.changePaswordService.getOrders()
      .toPromise()
      .then((response: Response) => response.json())
      .then((response: OrdersResponse) => {
        this.orders = response.orders;
      });*/
  }

}
