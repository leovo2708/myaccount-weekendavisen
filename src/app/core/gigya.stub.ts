import { LoginEvent } from '../../../d/gigya/events/loginEvent';
import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { Response as GigyaResponse } from '../../../d/gigya/socialize/response';

export class GigyaStub {
  logIn(): Promise<LoginEvent> {
    return Promise.resolve(null);
  }

  logOut(): Promise<GigyaResponse> {
    return Promise.resolve(null);
  }

  getUser(): Promise<AccountInfo> {
    return Promise.resolve(null);
  }

  isLoggedIn(userInfo: AccountInfo): boolean {
    return true;
  }
}
