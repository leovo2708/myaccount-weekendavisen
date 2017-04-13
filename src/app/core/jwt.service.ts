import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthTicket } from '../../../d/auth';
import { JwtHelper } from 'angular2-jwt';

const JWT_STORAGE_NAME: string = 'auth_jwt';

@Injectable()
export class JwtService {
  private _jwt: BehaviorSubject<string> = new BehaviorSubject(null);

  private static get jwtFromStorage(): string {
    return localStorage.getItem(JWT_STORAGE_NAME);
  }

  private static set jwtFromStorage(jwt: string) {
    if (jwt) {
      localStorage.setItem(JWT_STORAGE_NAME, jwt);
    } else {
      localStorage.removeItem(JWT_STORAGE_NAME);
    }
  }

  constructor(private jwtHelper: JwtHelper) {
  }

  decode(jwt: string): AuthTicket {
    if (jwt) {
      return this.jwtHelper.decodeToken(jwt);
    }

    return null;
  }

  get jwt(): string {
    if (this._jwt.getValue()) {
      return this._jwt.getValue();
    }

    return JwtService.jwtFromStorage;
  }

  set jwt(jwt: string) {
    this._jwt.next(jwt);
    JwtService.jwtFromStorage = jwt;
  }
}
