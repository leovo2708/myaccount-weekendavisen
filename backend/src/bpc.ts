import { IncomingMessage } from 'http';

import { Http } from './http';
import { RsvpPayload, UserTicket } from '../../d/http/bpc';

export class BPC {
  private static appTicket: UserTicket;
  private static ticketTimeoutID: NodeJS.Timer;

  public static getRsvp(payload: RsvpPayload): Promise<string> {
    return Http.get('/rsvp', {
      app: process.env.POC_APPLICATION_APP_ID,
      provider: 'gigya',
      UID: payload.UID,
      UIDSignature: payload.UIDSignature,
      signatureTimestamp: payload.signatureTimestamp,
      email: payload.email
    });
  }

  public static parseUserTicket(userTicketString: string): Promise<UserTicket> {
    return new Promise((fulfill: Function, reject: Function): void => {
      try {
        fulfill(JSON.parse(userTicketString));
      } catch (err) {
        reject(err);
      }
    });
  }

  public static getUserPermissions(permission: string, userTicket: UserTicket): Promise<any> {
    return Http.get(`/permissions/${permission}`, null, userTicket);
  }

  static getUserTicket(rsvp: string): Promise<UserTicket> {
    return Http.post('/ticket/user', {rsvp}, BPC.appTicket);
  }

  public static me(userTicket: UserTicket): Promise<any> {
    return Http.get('/me', null, userTicket);
  }

  public static refreshUserTicket(userTicket: UserTicket): Promise<UserTicket> {
    return BPC.reissueTicket(userTicket);
  }

  private static reissueTicket(ticket: UserTicket): Promise<UserTicket> {
    return Http.post('/ticket/reissue', null, ticket);
  }

  public static saveAppTicket(): void {
    const app: UserTicket = {
      id: process.env.POC_APPLICATION_APP_ID,
      key: process.env.POC_APPLICATION_APP_SECRET,
      algorithm: 'sha256'
    };

    Http.post('/ticket/app', null, app)
      .then((result: string) => JSON.parse(result))
      .then((result: UserTicket) => {
        console.log('BPC app ticket fetched and saved');

        BPC.appTicket = result;
        BPC.scheduleAppTicketRefresh(result.exp);
      })
      .catch((err: Error) => {
        console.error(err);
        process.exit(1);
      });
  }

  private static scheduleAppTicketRefresh(expires: number): void {
    if (BPC.ticketTimeoutID) {
      clearTimeout(BPC.ticketTimeoutID);
    }

    BPC.ticketTimeoutID = global.setTimeout(() => {
      BPC.reissueTicket(BPC.appTicket)
        .then((result: any) => {
          console.log('BPC app ticket refreshed');

          BPC.appTicket = result;
          BPC.scheduleAppTicketRefresh(result.exp);
        })
        .catch((err: Error) => {
          console.error(err);
          process.exit(1);
        });
    }, expires - Date.now());
  }

  public static setUserPermissions(user: string, permission: string, payload: any): Promise<any> {
    return Http.post(`/permissions/${user}/${permission}`, payload, BPC.appTicket);
  }
}
