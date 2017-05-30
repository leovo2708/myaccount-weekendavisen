import { LoginEvent } from '../../../d/gigya/events/loginEvent';

export class GigyaStub {
  logIn(): Promise<LoginEvent> {
    return Promise.resolve(null);
  }
}
