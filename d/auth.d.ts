import { AccountInfo } from './gigya/accounts/accounts';
import { Ticket } from './bpc';

export interface AuthTicket {
  accountInfo: AccountInfo;
  bpcTicket: Ticket;
  exp: number;
}
