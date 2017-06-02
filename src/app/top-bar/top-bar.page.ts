import { tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { TopBarComponent } from './top-bar.component';
import { AuthService } from '../core/auth.service';
import { AuthTicket } from '../../../d/auth';
import { TestingPage } from '../common/testing-page';

export class TopBarPage extends TestingPage<TopBarComponent> {
  authService: AuthService;
  component: TopBarComponent;
  debugElement: DebugElement;
  router: Router;

  initStubs(): void {
    this.authService = this.debugElement.injector.get(AuthService);
    this.router = this.debugElement.injector.get(Router);
  }

  get authTicket(): AuthTicket {
    return {
      accountInfo: {
        UID: '1234',
        profile: {
          thumbnailURL: 'http://i.imgur.com/kFwBaEd.gif'
        }
      }
    };
  }

  get avatarElement(): DebugElement {
    return this.debugElement.query(By.css('img.avatar'));
  }

  get logoElement(): DebugElement {
    return this.debugElement.query(By.css('a[routerLink="/dashboard"] app-logo'));
  }

  clickNthMenuButton(index: number): void {
    const menuElement: DebugElement = this.debugElement.query(By.css('md-menu'));
    const buttons: DebugElement[] = menuElement.queryAll(By.css('[md-menu-item]'));

    buttons[index].triggerEventHandler('click', null);
    tick();
  }

  initSpies(): void {
    spyOnProperty(this.authService, 'authTicket', 'get').and.returnValue(this.authTicket);
    spyOn(this.authService, 'logOut').and.returnValue(Promise.resolve(null));
    spyOn(this.router, 'navigate').and.callThrough();
  }
}
