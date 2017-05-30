import { ComponentFixture, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { TopBarComponent } from './top-bar.component';
import { AuthService } from '../core/auth.service';
import { AuthTicket } from '../../../d/auth';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

export class TopBarPage {
  authService: AuthService;
  component: TopBarComponent;
  debugElement: DebugElement;
  router: Router;

  constructor(private fixture: ComponentFixture<TopBarComponent>) {
    this.component = fixture.componentInstance;
    this.debugElement = fixture.debugElement;
    this.authService = this.debugElement.injector.get(AuthService);
    this.router = this.debugElement.injector.get(Router);

    this.initSpies();
    fixture.detectChanges();
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
    return this.debugElement.query(By.css('.logo[routerLink="/dashboard"]'));
  }

  clickNthMenuButton(index: number): void {
    const menuElement: DebugElement = this.debugElement.query(By.css('md-menu'));
    const buttons: DebugElement[] = menuElement.queryAll(By.css('[md-menu-item]'));

    buttons[index].triggerEventHandler('click', null);
    this.fixture.detectChanges();
    tick();
  }

  initSpies(): void {
    spyOnProperty(this.authService, 'authTicket', 'get').and.returnValue(this.authTicket);
    spyOn(this.authService, 'logOut').and.returnValue(Promise.resolve(null));
    spyOn(this.router, 'navigate').and.callThrough();
  }
}
