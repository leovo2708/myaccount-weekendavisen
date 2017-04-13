import { IReply, Request, Server } from '@types/hapi';
import * as Boom from 'boom';

import { BPC } from './bpc';
import { Ticket } from '../../../d/bpc';
import { JWT } from '../jwt';

export function UserRoutes(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'POST',
    path: '/ticket',
    config: {
      auth: false
    },
    handler: (request: Request, reply: IReply): void => {
      BPC.getRsvp(request.payload.accountInfo)
        .then((rsvp: string) => BPC.getUserTicket(rsvp))
        .then((bpcTicket: Ticket) => JWT.generateToken(request.payload.accountInfo, bpcTicket))
        .then((jwt: string) => {
          reply(jwt);
        })
        .catch((err: Error) => {
          reply(Boom.wrap(err));
        });
    }
  });

  server.route({
    method: 'GET',
    path: '/me',
    handler: (request: Request, reply: IReply): void => {
      BPC.me(JWT.getAuthTicket(request.headers.authorization).bpcTicket)
        .then((userInfo: any) => {
          reply(userInfo);
        })
        .catch((err: Error) => {
          reply(Boom.wrap(err));
        });
    }
  });

  next();
}
