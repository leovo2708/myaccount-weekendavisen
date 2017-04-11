import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';

import { LoginService } from './login.service';
import { AuthService } from '../core/auth.service';
import { AuthTicket } from '../../../d/auth';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((fulfill: Function): void => {
      if (this.authService.authTicket) {
        fulfill(true);
      } else {
        // TODO: for now, this request always resolves but eventually it should
        // also be sometimes rejected, in the case when the user is not logged in
        this.authService.auth().then((authTicket: AuthTicket) => {
          if (authTicket) {
            fulfill(true);
          } else {
            this.loginService.redirectionUrl = state.url;
            this.router.navigate(['/login']);
            fulfill(false);
          }
        });
      }
    });
  }
}
