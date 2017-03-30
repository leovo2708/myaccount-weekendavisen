import { Request, Server, IReply } from '@types/hapi';
import * as Boom from 'boom';

import { BPC } from '../bpc';
import { UserTicket } from '../../../d/http/bpc';

const plugin: any = {
  register: Ticket
};

plugin.register.attributes = {
  name: 'ticket',
  version: '1.0.0'
};

export default plugin;

function Ticket(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, reply: IReply): void => {
      BPC.getRsvp(request.query)
        .then((rsvp: string) => BPC.getUserTicket(rsvp))
        .then((userTicket: UserTicket) => {
          reply(userTicket);
        })
        .catch((err: Error) => {
          reply(Boom.wrap(err));
        });
    }
  });

  server.route({
    method: 'GET',
    path: '/refresh',
    handler: (request: Request, reply: IReply): void => {
      BPC.refreshUserTicket(request.state.ticket)
        .then((userTicket: UserTicket) => {
          reply(userTicket);
        })
        .catch((err: Error) => {
          reply(Boom.wrap(err));
        });
    }
  });

  next();
}
