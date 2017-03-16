import { Gigya } from '../gigya';
import { GetAccountInfoResponse } from '../gigya/accounts';
import { LoginEvent } from '../gigya/events/loginEvent';

declare const gigya: Gigya;

export class UserService {
  getUser(): Promise<GetAccountInfoResponse> {
    return new Promise((fulfill: Function): void => {
      gigya.accounts.getAccountInfo({
        callback: (response: GetAccountInfoResponse): void => fulfill(response)
      });
    });
  }

  isLoggedIn(userInfo: GetAccountInfoResponse): boolean {
    return userInfo.errorCode === 0;
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
