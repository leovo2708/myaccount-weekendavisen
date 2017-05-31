import { Response } from '@angular/http';

export class ApiStub {
  get(): Promise<Response> {
    return Promise.resolve(null);
  }

  post(): Promise<Response> {
    return Promise.resolve(null);
  }

  put(): Promise<Response> {
    return Promise.resolve(null);
  }

  delete(): Promise<Response> {
    return Promise.resolve(null);
  }
}
