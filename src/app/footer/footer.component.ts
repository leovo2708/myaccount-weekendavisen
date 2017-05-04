import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
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
