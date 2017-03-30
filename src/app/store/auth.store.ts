import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthTicket } from '../../../d/auth';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthStore {
  private _authTicket: BehaviorSubject<AuthTicket> = new BehaviorSubject<AuthTicket>(null);
  private _jwt: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private jwtHelper: JwtHelper) {
  }

  get authTicket(): AuthTicket {
    return this._authTicket.getValue();
  }

  get jwt(): string {
    return this._jwt.getValue();
  }

  set jwt(jwt: string) {
    this._jwt.next(jwt);

    if (jwt) {
      this._authTicket.next(this.jwtHelper.decodeToken(jwt));
    } else {
      this._authTicket.next(null);
    }
  }
}
