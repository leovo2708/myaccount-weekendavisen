import { Base_Reply, Request, Server } from 'hapi';

import { Kundeunivers } from './kundeunivers';
import {
  OrderFull, OrdersResponse, RemoveOrderResponse, UserProfile, FAQ, EPaper, CreateOrderResponse, Offer, CityResponse
} from '../../../d/kundeunivers';
import { Result, RichResult } from '../../../d/http';
import { HttpHelper } from '../utils/http.helper';
import { Gigya } from '../gigya/gigya';

export function KundeuniversRoutes(server: Server, options: {}, next: Function): void {
  server.route({
    method: 'GET',
    path: '/city/{zipCode}',
    config: {
      auth: false
    },
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.findCity(request.params.zipCode)
        .then((result: RichResult<CityResponse>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/epaper',
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.getEPaper()
        .then((result: RichResult<EPaper>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/faq/{termId}',
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.getFAQ(request.params.termId)
        .then((result: RichResult<FAQ>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/offers/{offerId}',
    config: {
      auth: false
    },
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.getOffer(request.params.offerId)
        .then((result: RichResult<Offer>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/orders',
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.getUserOrders(Kundeunivers.getUIDFromRequest(request))
        .then((result: RichResult<OrdersResponse>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'POST',
    path: '/orders',
    config: {
      auth: false
    },
    handler: (request: Request, reply: Base_Reply): void => {
      Gigya.getUserIdOrCreate(request.payload.email)
        .then((userId: string) => Kundeunivers.createOrder(userId, request.payload))
        .then((result: RichResult<CreateOrderResponse>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/orders/{orderId}',
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.getUserOrder(Kundeunivers.getUIDFromRequest(request), request.params.orderId)
        .then((result: RichResult<OrderFull>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'PUT',
    path: '/orders/{orderId}/address',
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.changeAddress(Kundeunivers.getUIDFromRequest(request), request.params.orderId, request.payload)
        .then(() => reply(request.payload).code(202))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'DELETE',
    path: '/orders/{orderId}',
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.removeOrder(Kundeunivers.getUIDFromRequest(request), request.params.orderId)
        .then((result: RichResult<RemoveOrderResponse>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'PUT',
    path: '/orders/{orderId}/suspend',
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.suspendOrder(Kundeunivers.getUIDFromRequest(request), request.params.orderId, request.payload)
        .then(() => reply(request.payload).code(202))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  server.route({
    method: 'GET',
    path: '/user',
    handler: (request: Request, reply: Base_Reply): void => {
      Kundeunivers.getUserProfile(Kundeunivers.getUIDFromRequest(request))
        .then((result: RichResult<UserProfile>) => reply(result.body))
        .catch((result: Result) => reply(HttpHelper.wrapError(result)));
    }
  });

  next();
}
