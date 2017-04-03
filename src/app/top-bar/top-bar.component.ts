import { Component, OnInit } from '@angular/core';
import { UserStore } from '../store/user.store';
import { AccountInfo } from '../../../d/gigya/accounts/accounts';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  accountInfo: AccountInfo;

  constructor(private userStore: UserStore) { }

  ngOnInit(): void {
    this.userStore.user
      .subscribe((accountInfo: AccountInfo) => {
        this.accountInfo = accountInfo;
      });
  }

  logOut(): void {
    console.log('log out!');
  }
}
