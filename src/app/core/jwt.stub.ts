import { AuthTicket } from '../../../d/auth';
export class JwtStub {
  get jwt(): string {
    return 'foo';
  }

  set jwt(jwt: string) {
  }

  decode(jwt: string): AuthTicket {
    return null;
  }
}
