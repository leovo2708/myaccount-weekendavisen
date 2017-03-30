import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { ApiService } from './api.service';
import { AuthStore } from '../store/auth.store';
import { UserService } from './user.service';

export const JWT_STORAGE_NAME: string = 'auth_jwt';

@Injectable()
export class AuthService {
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

  constructor(private authStore: AuthStore,
              private api: ApiService,
              private router: Router,
              private userService: UserService) {
  }

  get jwt(): Promise<string> {
    if (AuthService.jwtFromStorage) {
      return Promise.resolve(AuthService.jwtFromStorage);
    }

    return this.userService.getUser()
      .then((accountInfo: AccountInfo) => {
        if (UserService.isLoggedIn(accountInfo)) {
          return this.getJwtFromServer(accountInfo)
            .then((jwt: string) => {
              AuthService.jwtFromStorage = jwt;
              return jwt;
            });
        }

        return null;
      });
  }

  logOut(): Promise<void> {
    return this.userService.logOut()
      .then(() => {
        this.authStore.jwt = null;
        AuthService.jwtFromStorage = null;
        this.router.navigate(['/login']);
      });
  }

  private getJwtFromServer(accountInfo: AccountInfo): Promise<string> {
    return this.api
      .post('/user/ticket', {accountInfo})
      .toPromise()
      .then((response: Response) => response.text());
  }
}
