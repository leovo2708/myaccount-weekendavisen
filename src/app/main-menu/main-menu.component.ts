import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../../../d/main-menu';
import { MainMenuService } from './main-menu.service';
import { EPaper } from '../../../d/kundeunivers';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  ePaperUrl: string;
  ePaperLoading: boolean;
  items: MenuItem[];

  constructor(private mainMenuService: MainMenuService) {
  }

  ngOnInit(): void {
    this.ePaperLoading = true;
    this.items = [
      {url: '/dashboard', icon: 'home'},
      {url: '/orders', title: 'Orders'},
      {url: '/faq', title: 'FAQ'}
    ];

    this.mainMenuService.getEPaper()
      .then((ePaper: EPaper) => {
        this.ePaperLoading = false;

        if (ePaper && ePaper.status === 'OK' && ePaper.url) {
          this.ePaperUrl = ePaper.url;
        }
      })
      .catch(() => {
        this.ePaperLoading = false;
      });
  }
}
