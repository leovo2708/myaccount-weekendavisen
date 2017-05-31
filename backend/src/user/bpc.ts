import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { Http } from '../utils/http';
import { BaseTicket, Ticket } from '../../../d/bpc';
import { Result, RichResult } from '../../../d/http';

export class BPC {
  private static appTicket: BaseTicket;
  private static ticketTimeoutID: NodeJS.Timer;
  private static http: Http = new Http(process.env.BPC_URL, true);

  public static getRsvp(accountInfo: AccountInfo): Promise<RichResult<string>> {
    return BPC.http.get('/rsvp', {
      app: process.env.BPC_APP_ID,
      provider: 'gigya',
      UID: accountInfo.UID,
      UIDSignature: accountInfo.UIDSignature,
      signatureTimestamp: accountInfo.signatureTimestamp,
      email: accountInfo.profile.email
    });
  }

  static getUserTicket(rsvp: string): Promise<RichResult<Ticket>> {
    return BPC.http.post('/ticket/user', {rsvp}, BPC.appTicket);
  }

  public static me(bpcTicket: Ticket): Promise<RichResult<any>> {
    return BPC.http.get('/me', null, bpcTicket);
  }

  public static saveAppTicket(): void {
    const appTicket: BaseTicket = {
      id: process.env.BPC_APP_ID,
      key: process.env.BPC_APP_SECRET,
      algorithm: 'sha256'
    };

    BPC.http.post('/ticket/app', null, appTicket)
      .then((response: RichResult<string>) => JSON.parse(response.body))
      .then((result: Ticket) => {
        if (result.error) {
          console.error(result);
          return;
        }

        console.log('BPC app ticket fetched and saved');

        BPC.appTicket = result;
        BPC.scheduleAppTicketRefresh(result.exp);
      })
      .catch((result: Result) => {
        console.log(result.error || result.body);
      });
  }

  private static scheduleAppTicketRefresh(expires: number): void {
    if (BPC.ticketTimeoutID) {
      clearTimeout(BPC.ticketTimeoutID);
    }

    BPC.ticketTimeoutID = global.setTimeout(() => {
      BPC.saveAppTicket();
    }, expires - Date.now());
  }
}
