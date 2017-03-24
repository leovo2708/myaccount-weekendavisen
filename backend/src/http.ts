import * as Hawk from 'hawk';
import * as request from 'request';
import { resolve } from 'url';
import { IncomingMessage } from 'http';

import { UserTicket } from '../../d/http/bpc';

export class Http {
  static get(path: string, params: any, credentials?: UserTicket): Promise<any> {
    return Http.call('GET', path, params, credentials);
  }

  static post(path: string, payload: any, credentials?: UserTicket): Promise<any> {
    return Http.call('POST', path, payload, credentials);
  }

  static put(path: string, payload: any, credentials?: UserTicket): Promise<any> {
    return Http.call('PUT', path, payload, credentials);
  }

  static patch(path: string, payload: any, credentials?: UserTicket): Promise<any> {
    return Http.call('PATCH', path, payload, credentials);
  }

  static delete(path: string, payload: any, credentials?: UserTicket): Promise<any> {
    return Http.call('DELETE', path, payload, credentials);
  }

  static call(method: string, path: string, payload: any, credentials?: UserTicket): Promise<any> {
    const uri: string = resolve(process.env.POC_APPLICATION_SSO_URL, path);
    const headers: any = {
      ['Content-Type']: 'application/json'
    };

    if (credentials) {
      headers.Authorization = Hawk.client.header(uri, method, {
        credentials,
        app: credentials.app
      }).field;
    }

    return new Promise((fulfill: Function, reject: Function): void => {
      request({
        [method === 'GET' ? 'qs' : 'json']: payload,
        method,
        uri,
        headers
      }, (error: Error, response: IncomingMessage, body: any): void => {
        if (error) {
          reject(error);
        } else {
          fulfill(body);
        }
      });
    });
  }
}
