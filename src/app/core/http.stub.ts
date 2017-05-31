import { RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class HttpStub {
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return null;
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return null;
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return null;
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return null;
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return null;
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return null;
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return null;
  }
}
