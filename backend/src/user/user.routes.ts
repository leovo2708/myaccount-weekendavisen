import { Base_Reply, Request, Server } from '@types/hapi';

import { BPC } from './bpc';
import { Ticket } from '../../../d/bpc';
import { JWT } from '../jwt';
import { Result, RichResult } from '../../../d/http';
import { HttpHelper } from '../utils/http.helper';

export function UserRoutes(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'POST',
    path: '/ticket',
    config: {
      auth: false
    },
    handler: (request: Request, reply: Base_Reply): void => {
      BPC.getRsvp(request.payload.accountInfo)
        .then((result: RichResult<string>) => BPC.getUserTicket(result.body))
        .then((result: RichResult<Ticket>) => JWT.generateToken(request.payload.accountInfo, result.body))
        .then((jwt: string) => {
          reply(jwt);
        })
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  next();
}
