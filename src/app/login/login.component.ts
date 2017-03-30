import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginStore } from '../store/login.store';
import { UserService } from '../core/user.service';
import { AuthStore } from '../store/auth.store';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  containerID: string = 'LoginPopupContainer';

  constructor(private loginStore: LoginStore,
              private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private authStore: AuthStore) {
  }

  ngOnInit(): void {
    // TODO: instead of synchronous ticket fetch here, we should do the same as
    // in LoginGuard, since the login.component is not guarded and therefore the
    // jwt token is not initialized (is null).
    this.authService.jwt.then((jwt: string) => {
      if (jwt) {
        this.redirect();
      } else {
        this.userService.logIn(this.containerID).then(() => {
          this.redirect();
        });
      }
    });
  }

  redirect(): void {
    if (this.loginStore.redirectionUrl) {
      this.router.navigate([this.loginStore.redirectionUrl]);
    } else {
      this.router.navigate(['dashboard']);
    }
  }
}
