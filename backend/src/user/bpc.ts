import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { Http } from '../http';
import { BaseTicket, Ticket } from '../../../d/bpc';

export class BPC {
  private static appTicket: BaseTicket;
  private static ticketTimeoutID: NodeJS.Timer;
  private static http: Http = new Http(process.env.POC_APPLICATION_SSO_URL);

  public static getRsvp(accountInfo: AccountInfo): Promise<string> {
    return BPC.http.get('/rsvp', {
      app: process.env.POC_APPLICATION_APP_ID,
      provider: 'gigya',
      UID: accountInfo.UID,
      UIDSignature: accountInfo.UIDSignature,
      signatureTimestamp: accountInfo.signatureTimestamp,
      email: accountInfo.profile.email
    });
  }

  static getUserTicket(rsvp: string): Promise<Ticket> {
    return BPC.http.post('/ticket/user', {rsvp}, BPC.appTicket);
  }

  public static me(bpcTicket: Ticket): Promise<any> {
    return BPC.http.get('/me', null, bpcTicket);
  }

  public static saveAppTicket(): void {
    const appTicket: BaseTicket = {
      id: process.env.POC_APPLICATION_APP_ID,
      key: process.env.POC_APPLICATION_APP_SECRET,
      algorithm: 'sha256'
    };

    BPC.http.post('/ticket/app', null, appTicket)
      .then((result: string) => JSON.parse(result))
      .then((result: Ticket) => {

        if (result.error){
          console.error(result)
          return;
        }

        console.log('BPC app ticket fetched and saved');

        BPC.appTicket = result;
        BPC.scheduleAppTicketRefresh(result.exp);
      })
      .catch((err: Error) => {
        console.error(err);
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
