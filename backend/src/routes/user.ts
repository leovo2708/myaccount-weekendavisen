import { Request, Server, IReply } from '@types/hapi';
import * as Boom from 'boom';

import { BPC } from '../bpc';
import { UserTicket } from '../../../d/http/bpc';

const plugin: any = {
  register: User
};

plugin.register.attributes = {
  name: 'user',
  version: '1.0.0'
};

export default plugin;

function User(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'GET',
    path: '/me',
    handler: (request: Request, reply: IReply): void => {
      BPC.parseUserTicket(request.query.userTicket)
        .then((userTicket: UserTicket) => BPC.me(userTicket))
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
