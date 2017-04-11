import { IReply, Request, Response } from 'hapi';
import * as Boom from 'boom';
import { Headers } from 'request';

function getHeaders(origin: string): Headers {
  return {
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': origin || '*',
    'Content-Type': 'application/json'
  };
}

export function preResponseExtension(request: Request, reply: IReply): void {
  if (request.response.isBoom) {
    const response: Boom.BoomError = <any>request.response;

    response.output.headers = Object.assign(getHeaders(request.headers.origin), response.output.headers);

    reply(response);
  } else {
    const response: Response = request.response;

    response.headers = Object.assign(getHeaders(request.headers.origin), response.headers);

    if (response.statusCode && response.statusCode > 299) {
      reply(Boom.create(response.statusCode, response.toString()));
    } else {
      if (response.statusCode && response.statusCode > 299) {
        reply(Boom.create(response.statusCode));
      } else {
        reply.continue();
      }
    }
  }
}
