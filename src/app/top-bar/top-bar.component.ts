import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountInfo } from '../../../d/gigya/accounts/accounts';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  accountInfo: AccountInfo;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.accountInfo = this.authService.authTicket.accountInfo;
  }

  get thumbnailURL(): string {
    return this.accountInfo && this.accountInfo.profile && this.accountInfo.profile.thumbnailURL;
  }

  logOut(): void {
    this.authService.logOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
