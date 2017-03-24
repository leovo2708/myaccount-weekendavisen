import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import { UserService } from '../user/user.service';
import { GetAccountInfoResponse } from '../gigya/accounts';
import { LoginEvent } from '../gigya/events/loginEvent';

@Injectable()
export class UserStore {
  private _user: BehaviorSubject<GetAccountInfoResponse> = new BehaviorSubject<GetAccountInfoResponse>(null);

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

  logIn(containerID?: string): Promise<LoginEvent> {
    return this.userService.logIn(containerID).then(() => {
      this.loadInitialData();
    });
  }

  onUserData(callback: Function): void {
    this.user.subscribe((userInfo: GetAccountInfoResponse) => {
      if (userInfo !== null) {
        callback(userInfo);
      }
    });
  }
}
