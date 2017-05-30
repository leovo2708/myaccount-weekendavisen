import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MdIconModule, MdToolbarModule } from '@angular/material';
import { Router } from '@angular/router';

import { TopBarComponent } from './top-bar.component';
import { TopBarPage } from './top-bar.page';
import { RouterStub } from '../core/router.stub';
import { AuthService } from '../core/auth.service';
import { AuthStub } from '../core/auth.stub';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { generateComponent } from '../core/component.mock';

describe('TopBarComponent', () => {
  let page: TopBarPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopBarComponent,
        generateComponent({selector: 'md-menu', exportAs: 'mdMenu'})
      ],
      imports: [ MdIconModule, MdToolbarModule, NoopAnimationsModule ],
      providers: [
        { provide: AuthService, useClass: AuthStub },
        { provide: Router, useClass: RouterStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    const fixture: ComponentFixture<TopBarComponent> = TestBed.createComponent(TopBarComponent);
    page = new TopBarPage(fixture);
  });

  it('should initially fetch account info', () => {
    expect(page.component.accountInfo).toEqual(page.authTicket.accountInfo);
    expect(page.component.accountInfo.UID).toBe(page.authTicket.accountInfo.UID);
  });

  it('should have a clickable logo', () => {
    expect(page.logoElement).toBeTruthy();
  });

  it('should display profile image', () => {
    expect(page.component.thumbnailURL).toEqual(page.authTicket.accountInfo.profile.thumbnailURL);
    expect(page.avatarElement.nativeElement.src).toEqual(page.authTicket.accountInfo.profile.thumbnailURL);
  });

  it('should logout user', fakeAsync(() => {
    page.clickNthMenuButton(0);

    expect(page.router.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
