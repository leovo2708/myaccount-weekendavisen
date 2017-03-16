import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { UserService } from '../user/user.service';
import { UserStore } from '../user/user.store';
import { GetAccountInfoResponse } from '../gigya/accounts/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private userStore: UserStore) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userStore.user
      .map((response: GetAccountInfoResponse) => {
        return !this.userService.isLoggedIn(response);
      });
  }
}
