import { AuthTicket } from '../../../d/auth';

export class AuthStub {
  auth(): Promise<AuthTicket> {
    return Promise.resolve(null);
  }

  get authTicket(): AuthTicket {
    return null;
  }

  logOut(): Promise<any> {
    return Promise.resolve(null);
  }
}
