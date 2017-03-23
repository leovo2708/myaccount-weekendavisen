import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';

import { UserService } from '../user/user.service';
import { GetAccountInfoResponse } from '../gigya/accounts';

@Injectable()
export class UserStore {
  private _user: Subject<GetAccountInfoResponse> = new Subject();

  constructor(private userService: UserService) {
    this.loadInitialData();
  }

  get user(): Observable<GetAccountInfoResponse> {
    return this._user.asObservable();
  }

  loadInitialData(): void {
    this.userService.getUser()
      .then((response: GetAccountInfoResponse) => {
        this._user.next(response);
      });
  }
}
