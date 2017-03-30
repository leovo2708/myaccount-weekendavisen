import * as Boom from 'boom';
import { IReply, Request, Server } from 'hapi';

import { Kundeunivers } from './kundeunivers';
import {
  OrderFull, OrdersResponse,
  UserProfile
} from '../../../d/kundeunivers';

export function KundeuniversRoutes(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'GET',
    path: '/{userId}/orders',
    handler: (request: Request, reply: IReply): void => {
      Kundeunivers.getUserOrders(request.params.userId)
        .then((orders: OrdersResponse) => reply(orders))
        .catch((err: Error) => reply(Boom.wrap(err)));
    }
  });

  server.route({
    method: 'GET',
    path: '/{userId}/orders/{orderId}',
    handler: (request: Request, reply: IReply): void => {
      Kundeunivers.getUserOrder(request.params.userId, request.params.orderId)
        .then((order: OrderFull) => reply(order))
        .catch((err: Error) => reply(Boom.wrap(err)));
    }
  });

  server.route({
    method: 'GET',
    path: '/user/{userId}',
    handler: (request: Request, reply: IReply): void => {
      Kundeunivers.getUserProfile(request.params.userId)
        .then((user: UserProfile) => reply(user))
        .catch((err: Error) => reply(Boom.wrap(err)));
    }
  });

  next();
}
