import * as Hawk from 'hawk';
import * as request from 'request';
import { resolve } from 'url';
import { IncomingMessage } from 'http';

import { BaseTicket } from '../../../d/bpc';
import { Result, RichResult } from '../../../d/http';

export class Http {
  apiUrl: string;
  logCalls: boolean;

  constructor(apiUrl: string, logCalls: boolean = false) {
    this.apiUrl = apiUrl;
    this.logCalls = logCalls;
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
    const headers: request.Headers = {
      ['Content-Type']: 'application/json'
    };

    if (credentials) {
      headers.Authorization = Hawk.client.header(uri, method, {
        credentials,
        app: credentials.app
      }).field;
    }

    return new Promise((fulfill: (response: RichResult<any>) => void,
                        reject: (response: Result) => void): void => {
      request({
        [method === 'GET' ? 'qs' : 'json']: payload,
        method,
        uri,
        headers
      }, (error: Error, response: IncomingMessage, body: any): void => {
        if (error) {
          reject({error});
        } else {
          this.logCall(method, response, uri);

          if (response && response.statusCode > 399) {
            reject({response, body});
          } else {
            fulfill({response, body});
          }
        }
      });
    });
  }

  private logCall(method: string, response: IncomingMessage, uri: string): void {
    if (this.logCalls) {
      console.log(new Date(), method, response.statusCode, response.statusMessage, uri);
    }
  }
}
