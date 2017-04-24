import { IncomingMessage } from 'http';

export interface RichResult<T> extends Result {
  response: IncomingMessage;
  body: T;
}

export interface Result {
  error?: Error;
  response?: IncomingMessage;
  body?: any;
}
