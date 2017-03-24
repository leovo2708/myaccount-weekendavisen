import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginStore } from '../store/login.store';
import { UserStore } from '../store/user.store';
import { UserTicket } from '../../../d/http/bpc';
import { UserService } from '../core/user.service';

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
              private userStore: UserStore) { }

  ngOnInit(): void {
    this.userStore.userTicket.then((userTicket: UserTicket) => {
      if (userTicket) {
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
