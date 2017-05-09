import { IReply, Request, Server } from 'hapi';

import { Kundeunivers } from './kundeunivers';
import {
  OrderFull, OrdersResponse, UserProfile, FAQ, EPaper
} from '../../../d/kundeunivers';
import { AuthTicket } from '../../../d/auth';
import { JWT } from '../jwt';
import { Result, RichResult } from '../../../d/http';
import { HttpHelper } from '../utils/http.helper';

export function KundeuniversRoutes(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'GET',
    path: '/epaper',
    handler: (request: Request, reply: IReply): void => {
      Kundeunivers.getEPaper()
        .then((result: RichResult<EPaper>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/faq/{termId}',
    handler: (request: Request, reply: IReply): void => {
      Kundeunivers.getFAQ(request.params.termId)
        .then((result: RichResult<FAQ>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/orders',
    handler: (request: Request, reply: IReply): void => {
      const authTicket: AuthTicket = JWT.getAuthTicket(request.headers.authorization);

      Kundeunivers.getUserOrders(authTicket.accountInfo.UID)
        .then((result: RichResult<OrdersResponse>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/orders/{orderId}',
    handler: (request: Request, reply: IReply): void => {
      const authTicket: AuthTicket = JWT.getAuthTicket(request.headers.authorization);

      Kundeunivers.getUserOrder(authTicket.accountInfo.UID, request.params.orderId)
        .then((result: RichResult<OrderFull>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'PUT',
    path: '/orders/{orderId}/address',
    handler: (request: Request, reply: IReply): void => {
      const authTicket: AuthTicket = JWT.getAuthTicket(request.headers.authorization);

      Kundeunivers.changeAddress(authTicket.accountInfo.UID, request.params.orderId, request.payload)
        .then(() => reply(request.payload).code(202))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/user',
    handler: (request: Request, reply: IReply): void => {
      const authTicket: AuthTicket = JWT.getAuthTicket(request.headers.authorization);

      Kundeunivers.getUserProfile(authTicket.accountInfo.UID)
        .then((result: RichResult<UserProfile>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  next();
}
