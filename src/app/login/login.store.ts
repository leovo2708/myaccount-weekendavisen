import { Injectable } from '@angular/core';

@Injectable()
export class LoginStore {
  private redirectionUrl: string;

  getRedirectionUrl(): string {
    return this.redirectionUrl;
  }

  setRedirectionUrl(url: string): void {
    this.redirectionUrl = url;
  }
}
