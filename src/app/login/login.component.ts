import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { GigyaService } from '../core/gigya.service';
import { AuthService } from '../core/auth.service';
import { AuthTicket } from '../../../d/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  containerID: string = 'LoginPopupContainer';

  constructor(private loginService: LoginService,
              private router: Router,
              private gigyaService: GigyaService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    // TODO: instead of synchronous ticket fetch here, we should do the same as
    // in LoginGuard, since the login.component is not guarded and therefore the
    // jwt token is not initialized (is null).
    this.authService.auth().then((authTicket: AuthTicket) => {
      if (authTicket) {
        this.redirect();
      } else {
        this.gigyaService.logIn(this.containerID).then(() => {
          this.redirect();
        });
      }
    });
  }

  redirect(): void {
    if (this.loginService.redirectionUrl) {
      this.router.navigate([this.loginService.redirectionUrl]);
    } else {
      this.router.navigate(['dashboard']);
    }
  }
}
