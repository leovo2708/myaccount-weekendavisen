import * as Boom from 'boom';
import { IReply, Request, Server } from 'hapi';

import { Kundeunivers } from './kundeunivers';
import {
  OrderFull, OrdersResponse,
  UserProfile
} from '../../../d/kundeunivers';
import { AuthTicket } from '../../../d/auth';
import { JWT } from '../jwt';

export function KundeuniversRoutes(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'GET',
    path: '/orders',
    handler: (request: Request, reply: IReply): void => {
      const authTicket: AuthTicket = JWT.getAuthTicket(request.headers.authorization);

      Kundeunivers.getUserOrders(authTicket.accountInfo.data.sso_uid)
        .then((orders: OrdersResponse) => reply(orders))
        .catch((err: Error) => reply(Boom.wrap(err)));
    }
  });

  server.route({
    method: 'GET',
    path: '/orders/{orderId}',
    handler: (request: Request, reply: IReply): void => {
      const authTicket: AuthTicket = JWT.getAuthTicket(request.headers.authorization);

      Kundeunivers.getUserOrder(authTicket.accountInfo.data.sso_uid, request.params.orderId)
        .then((order: OrderFull) => reply(order))
        .catch((err: Error) => reply(Boom.wrap(err)));
    }
  });

  server.route({
    method: 'GET',
    path: '/user',
    handler: (request: Request, reply: IReply): void => {
      const authTicket: AuthTicket = JWT.getAuthTicket(request.headers.authorization);

      Kundeunivers.getUserProfile(authTicket.accountInfo.data.sso_uid)
        .then((user: UserProfile) => reply(user))
        .catch((err: Error) => reply(Boom.wrap(err)));
    }
  });

  next();
}
