import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../../../d/main-menu';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  items: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {url: '/dashboard', icon: 'home'},
      {url: '/orders', title: 'Orders'}
    ];
  }
}
