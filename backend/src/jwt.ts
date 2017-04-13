import { sign, decode } from 'jsonwebtoken';

import { Ticket } from '../../d/bpc';
import { AccountInfo } from '../../d/gigya/accounts/accounts';
import { AuthTicket } from '../../d/auth';
import { Request } from 'hapi';

export const authConfig: any = {
  key: process.env.JWT_SECRET,
  verifyOptions: {
    algorithms: ['HS256']
  },
  validateFunc: (authTicket: AuthTicket, request: Request, callback: Function): void => {
    callback(null, authTicket && authTicket.exp > Date.now());
  }
};

export class JWT {
  static generateToken(accountInfo: AccountInfo, bpcTicket: Ticket): string {
    const authTicket: AuthTicket = {
      bpcTicket,
      accountInfo,
      exp: bpcTicket.exp
    };

    return sign(authTicket, process.env.JWT_SECRET);
  }

  static getAuthTicket(jwt: string): AuthTicket {
    return decode(jwt, process.env.JWT_SECRET);
  }
}
