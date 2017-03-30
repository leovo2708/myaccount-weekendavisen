import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { API_URL } from '../../config';
import { AuthStore } from '../store/auth.store';

@Injectable()
export class ApiService {
  constructor(private http: Http,
              private authStore: AuthStore) {
  }

  private getRequestParams(params: RequestOptionsArgs): RequestOptionsArgs {
    const headers: Headers = new Headers({
      Authorization: this.authStore.jwt
    });

    return {
      withCredentials: true,
      headers,
      ...params
    };
  }

  private getUrl(url: string): string {
    return `${API_URL}${url}`;
  }

  get(url: string, params?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(this.getUrl(url), this.getRequestParams(params));
  }

  post(url: string, body?: any, params?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(this.getUrl(url), body, this.getRequestParams(params));
  }

  put(url: string, body?: any, params?: RequestOptionsArgs): Observable<Response> {
    return this.http.put(this.getUrl(url), body, this.getRequestParams(params));
  }

  delete(url: string, params?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(this.getUrl(url), this.getRequestParams(params));
  }
}
