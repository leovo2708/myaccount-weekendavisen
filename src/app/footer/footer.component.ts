import { Component } from '@angular/core';

import { footerData } from './footer.data';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerData = footerData[environment.brand];
  isCookiePolicySubmitted: boolean = this.getCookiePolicy();

  getCookiePolicy(): boolean {
    return !!localStorage.getItem('cookiePolicySubmitted');
  }

  submitCookies(): void {
    if (!this.getCookiePolicy()) {
      localStorage.setItem('cookiePolicySubmitted', '1');
      this.isCookiePolicySubmitted = true;
    }
  }
}
