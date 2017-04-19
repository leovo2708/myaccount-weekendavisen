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
    return this.authService.auth().then((authTicket: AuthTicket) => {
      if (authTicket) {
        return true;
      }

      this.loginService.redirectionUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    });
  }
}
