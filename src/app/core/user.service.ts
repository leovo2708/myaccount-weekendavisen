import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Gigya } from '../../../d/gigya/gigya';
import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { LoginEvent } from '../../../d/gigya/events/loginEvent';
import { API_URL } from '../../config';
import { RsvpPayload, UserTicket } from '../../../d/http/bpc';

declare const gigya: Gigya;

@Injectable()
export class UserService {
  static isLoggedIn(userInfo: AccountInfo): boolean {
    return userInfo.errorCode === 0;
  }

  constructor(private http: Http) {
  }

  getUser(): Promise<AccountInfo> {
    return new Promise((fulfill: Function): void => {
      gigya.accounts.getAccountInfo({
        callback: (response: AccountInfo): void => fulfill(response)
      });
    });
  }

  getUserTicket(accountInfo: AccountInfo): Promise<UserTicket> {
    const params: RsvpPayload = {
      UID: accountInfo.UID,
      UIDSignature: accountInfo.UIDSignature,
      signatureTimestamp: accountInfo.signatureTimestamp,
      email: accountInfo.profile && accountInfo.profile.email
    };

    return this.http
      .get(`${API_URL}/ticket`, {params})
      .toPromise()
      .then((res: Response) => <UserTicket>res.json());
  }

  logIn(containerID?: string): Promise<LoginEvent> {
    return new Promise<LoginEvent>((fulfill: Function): void => {
      gigya.accounts.addEventHandlers({
        onLogin: (response: LoginEvent): void => {
          fulfill(response);
        }
      });

      gigya.accounts.showScreenSet({
        screenSet: 'Default-RegistrationLogin',
        containerID
      });
    });
  }
}
