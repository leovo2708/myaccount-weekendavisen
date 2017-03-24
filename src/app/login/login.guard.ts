import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { UserService } from '../user/user.service';
import { UserStore } from '../store/user.store';
import { GetAccountInfoResponse } from '../gigya/accounts/index';
import { Observable } from 'rxjs/Observable';
import { LoginStore } from '../store/login.store';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private loginStore: LoginStore,
    private router: Router,
    private userStore: UserStore) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userStore.user
      .map((response: GetAccountInfoResponse) => {
        if (response === null) {
          this.userStore.onUserData(() => {
            this.router.navigate([state.url]);
          });

          return false;
        }

        if (UserService.isLoggedIn(response)) {
          return true;
        }

        this.loginStore.redirectionUrl = state.url;
        this.router.navigate(['/login']);

        return false;
      });
  }
}
