import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { Http } from '../http';
import { BaseTicket, Ticket } from '../../../d/bpc';

export class BPC {
  public static ticketCookieName: string = 'bpc_ticket';

  private static appTicket: BaseTicket;
  private static ticketTimeoutID: NodeJS.Timer;
  private static http: Http = new Http(process.env.POC_APPLICATION_SSO_URL);

  public static getRsvp(accountInfo: AccountInfo): Promise<string> {
    return this.http.get('/rsvp', {
      app: process.env.POC_APPLICATION_APP_ID,
      provider: 'gigya',
      UID: accountInfo.UID,
      UIDSignature: accountInfo.UIDSignature,
      signatureTimestamp: accountInfo.signatureTimestamp,
      email: accountInfo.profile.email
    });
  }

  static getUserTicket(rsvp: string): Promise<Ticket> {
    return this.http.post('/ticket/user', {rsvp}, BPC.appTicket);
  }

  public static me(bpcTicket: Ticket): Promise<any> {
    return this.http.get('/me', null, bpcTicket);
  }

  public static refreshUserTicket(userTicket: Ticket): Promise<Ticket> {
    return BPC.reissueTicket(userTicket);
  }

  private static reissueTicket(ticket: BaseTicket): Promise<Ticket> {
    return this.http.post('/ticket/reissue', null, ticket);
  }

  public static saveAppTicket(): void {
    const appTicket: BaseTicket = {
      id: process.env.POC_APPLICATION_APP_ID,
      key: process.env.POC_APPLICATION_APP_SECRET,
      algorithm: 'sha256'
    };

    this.http.post('/ticket/app', null, appTicket)
      .then((result: string) => JSON.parse(result))
      .then((result: Ticket) => {
        console.log('BPC app ticket fetched and saved');

        BPC.appTicket = result;
        // BPC.scheduleAppTicketRefresh(result.exp);
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
      BPC.reissueTicket(BPC.appTicket)
        .then((result: Ticket) => {
          console.log('BPC app ticket refreshed - exp:', result.exp, result);

          BPC.appTicket = result;
          BPC.scheduleAppTicketRefresh(result.exp);
        })
        .catch((err: Error) => {
          console.error(err);
        });
    }, expires - Date.now());
  }
}
