import * as Hawk from 'hawk';
import * as request from 'request';
import { resolve } from 'url';
import { IncomingMessage } from 'http';
import { Headers } from 'request';

import { BaseTicket } from '../../d/bpc';

export class Http {
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  get(path: string, params?: any, credentials?: BaseTicket): Promise<any> {
    return this.call('GET', path, params, credentials);
  }

  post(path: string, payload?: any, credentials?: BaseTicket): Promise<any> {
    return this.call('POST', path, payload, credentials);
  }

  put(path: string, payload?: any, credentials?: BaseTicket): Promise<any> {
    return this.call('PUT', path, payload, credentials);
  }

  patch(path: string, payload?: any, credentials?: BaseTicket): Promise<any> {
    return this.call('PATCH', path, payload, credentials);
  }

  delete(path: string, payload?: any, credentials?: BaseTicket): Promise<any> {
    return this.call('DELETE', path, payload, credentials);
  }

  call(method: string, path: string, payload?: any, credentials?: BaseTicket): Promise<any> {
    const uri: string = resolve(this.apiUrl, path);
    const headers: Headers = {
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
