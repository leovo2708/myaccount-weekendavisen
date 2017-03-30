import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import { UserService } from '../core/user.service';
import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { UserTicket } from '../../../d/http/bpc';

@Injectable()
export class UserStore {
  private _user: BehaviorSubject<AccountInfo> = new BehaviorSubject<AccountInfo>(null);
  private _userTicket: BehaviorSubject<UserTicket> = new BehaviorSubject<UserTicket>(null);

  constructor(private userService: UserService) {
  }

  get user(): Observable<AccountInfo> {
    return this._user.asObservable();
  }

  get userTicket(): Promise<UserTicket> {
    if (this._userTicket.getValue()) {
      return Promise.resolve(this._userTicket.getValue());
    }

    return this.userService.getUser()
      .then((accountInfo: AccountInfo) => {
        this._user.next(accountInfo);

        if (UserService.isLoggedIn(accountInfo)) {
          return this.userService.getUserTicket(accountInfo)
            .then((userTicket: UserTicket) => {
              this._userTicket.next(userTicket);

              return userTicket;
            });
        }

        return null;
      });
  }

  getParamsWithUserTicket(params?: any): Observable<any> {
    return this._userTicket
      .map((userTicket: UserTicket) => Object.assign({userTicket}, params));
  }
}
