import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';

import { LoginStore } from '../store/login.store';
import { AuthStore } from '../store/auth.store';
import { AuthService } from '../core/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginStore: LoginStore,
              private router: Router,
              private authService: AuthService,
              private authStore: AuthStore) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((fulfill: Function): void => {
      if (this.authStore.authTicket) {
        fulfill(true);
      } else {
        // TODO: for now, this request always resolves but eventually it should
        // also be sometimes rejected, in the case when the user is not logged in
        this.authService.jwt.then((jwt: string) => {
          this.authStore.jwt = jwt;

          if (jwt) {
            fulfill(true);
          } else {
            this.loginStore.redirectionUrl = state.url;
            this.router.navigate(['/login']);
            fulfill(false);
          }
        });
      }
    });
  }
}
