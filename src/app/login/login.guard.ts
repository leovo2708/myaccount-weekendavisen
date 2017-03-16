import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { UserService } from '../user/user.service';
import { UserStore } from '../user/user.store';
import { GetAccountInfoResponse } from '../gigya/accounts/index';
import { Observable } from 'rxjs/Observable';
import { LoginStore } from './login.store';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private loginStore: LoginStore,
    private router: Router,
    private userService: UserService,
    private userStore: UserStore) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userStore.user
      .map((response: GetAccountInfoResponse) => {
        if (this.userService.isLoggedIn(response)) {
          return true;
        }

        this.loginStore.setRedirectionUrl(state.url);
        this.router.navigate(['/login']);

        return false;
      });
  }
}
