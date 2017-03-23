import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { LoginStore } from '../store/login.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  containerID: string = 'LoginPopupContainer';

  constructor(private loginStore: LoginStore,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.logIn(this.containerID).then(() => {
      if (this.loginStore.redirectionUrl) {
        this.router.navigate([this.loginStore.redirectionUrl]);
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

}
