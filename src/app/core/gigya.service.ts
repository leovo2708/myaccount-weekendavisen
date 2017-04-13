import { Injectable } from '@angular/core';

import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { Gigya } from '../../../d/gigya/gigya';
import { LoginEvent } from '../../../d/gigya/events/loginEvent';
import { Response as GigyaResponse } from '../../../d/gigya/socialize/response';

declare const gigya: Gigya;

@Injectable()
export class GigyaService {
  static isLoggedIn(userInfo: AccountInfo): boolean {
    return userInfo.errorCode === 0;
  }

  getUser(): Promise<AccountInfo> {
    return new Promise((fulfill: Function): void => {
      gigya.accounts.getAccountInfo({
        callback: (response: AccountInfo): void => fulfill(response)
      });
    });
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

  logOut(): Promise<any> {
    return new Promise((fulfill: Function, reject: Function): void => {
      gigya.accounts.logout({
        callback: (response: GigyaResponse): void => {
          if (response.errorCode) {
            reject(response);
          } else {
            fulfill();
          }
        }
      });
    });
  }
}
