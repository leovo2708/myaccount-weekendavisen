import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthTicket } from '../../../d/auth';
import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { Response as GigyaResponse } from '../../../d/gigya/socialize/response';
import { ApiService } from './api.service';
import { GigyaService } from './gigya.service';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
  private _authTicket: BehaviorSubject<AuthTicket> = new BehaviorSubject<AuthTicket>(null);

  constructor(private api: ApiService,
              private jwtService: JwtService,
              private gigyaService: GigyaService) {
  }

  get authTicket(): AuthTicket {
    const authTicket: AuthTicket = this._authTicket.getValue();

    if (authTicket) {
      if (authTicket.exp > Date.now()) {
        return authTicket;
      }

      this.clearTickets();
    }

    return null;
  }

  set authTicket(authTicket: AuthTicket) {
    this._authTicket.next(authTicket);
  }

  auth(): Promise<AuthTicket> {
    if (this.authTicket) {
      return Promise.resolve(this.authTicket);
    }

    if (this.jwtService.jwt) {
      this.authTicket = this.jwtService.decode(this.jwtService.jwt);
      return Promise.resolve(this.authTicket);
    }

    return this.gigyaService.getUser()
      .then((accountInfo: AccountInfo) => {
        if (this.gigyaService.isLoggedIn(accountInfo)) {
          return this.api
            .post('/user/ticket', {accountInfo})
            .toPromise()
            .then((response: Response) => response.text())
            .then((jwt: string) => {
              this.jwtService.jwt = jwt;
              this.authTicket = this.jwtService.decode(jwt);

              return this.authTicket;
            });
        }

        return null;
      });
  }

  logOut(): Promise<any> {
    return this.gigyaService.logOut()
      .then((response: GigyaResponse) => {
        this.clearTickets();
        return response;
      });
  }

  private clearTickets(): void {
    this.jwtService.jwt = null;
    this.authTicket = null;
  }
}
