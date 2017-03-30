import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router
} from '@angular/router';

import { LoginStore } from '../store/login.store';
import { UserStore } from '../store/user.store';
import { UserTicket } from '../../../d/http/bpc';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private loginStore: LoginStore,
              private router: Router,
              private userStore: UserStore) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.userStore.userTicket
      .then((userTicket: UserTicket) => {
        if (userTicket) {
          return true;
        }

        this.loginStore.redirectionUrl = state.url;
        this.router.navigate(['/login']);
        return false;
      });
  }
}
