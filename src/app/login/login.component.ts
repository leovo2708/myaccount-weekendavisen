import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStore } from '../store/login.store';
import { UserStore } from '../store/user.store';
import { GetAccountInfoResponse } from '../gigya/accounts/index';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  containerID: string = 'LoginPopupContainer';

  constructor(private loginStore: LoginStore,
              private router: Router,
              private userStore: UserStore) { }

  ngOnInit(): void {
    this.userStore.user.subscribe((userInfo: GetAccountInfoResponse) => {
      if (userInfo !== null) {
        if (UserService.isLoggedIn(userInfo)) {
          this.redirect();
        } else {
          this.userStore.logIn(this.containerID).then(() => {
            this.redirect();
          });
        }
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
