import { Router } from '@angular/router';
import {
  async, ComponentFixture, fakeAsync, TestBed, tick
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../core/auth.service';
import { GigyaService } from '../core/gigya.service';
import { LoginService } from './login.service';
import { AuthStub } from '../core/auth.stub';
import { GigyaStub } from '../core/gigya.stub';
import { LoginStub } from './login.stub';
import { RouterStub } from '../core/router.stub';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let authSpy: jasmine.Spy;
  let gigyaService: GigyaService;
  let gigyaSpy: jasmine.Spy;
  let router: Router;
  let routerSpy: jasmine.Spy;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthService, useClass: AuthStub },
        { provide: GigyaService, useClass: GigyaStub },
        { provide: LoginService, useClass: LoginStub },
        { provide: Router, useClass: RouterStub }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should bind a proper ID to the gigya container', () => {
    fixture.detectChanges();
    expect(debugElement.query(By.css(`#${component.containerID}`))).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    beforeEach(async(() => {
      authService = debugElement.injector.get(AuthService);
      authSpy = spyOn(authService, 'auth');
      gigyaService = debugElement.injector.get(GigyaService);
      gigyaSpy = spyOn(gigyaService, 'logIn');
      router = debugElement.injector.get(Router);
      routerSpy = spyOn(router, 'navigate');
      loginService = debugElement.injector.get(LoginService);
    }));

    it('should show login screen for not logged in user', fakeAsync(() => {
      authSpy.and.returnValue(Promise.resolve(null));
      gigyaSpy.and.callThrough();

      component.ngOnInit();
      tick();
      expect(gigyaSpy).toHaveBeenCalledWith(fixture.componentInstance.containerID);
      expect(routerSpy).toHaveBeenCalled();
    }));

    it('should redirect a logged in user', fakeAsync(() => {
      authSpy.and.returnValue(Promise.resolve({}));

      component.ngOnInit();
      tick();
      expect(gigyaSpy).not.toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
    }));

    it('should redirect to a specific route', fakeAsync(() => {
      const redirectionUrl: string = 'foo-route';

      authSpy.and.returnValue(Promise.resolve({}));
      loginService.redirectionUrl = redirectionUrl;

      component.ngOnInit();
      tick();
      expect(routerSpy).toHaveBeenCalledWith([redirectionUrl]);
    }));

    it('should redirect to the default route', fakeAsync(() => {
      authSpy.and.returnValue(Promise.resolve({}));

      component.ngOnInit();
      tick();
      expect(routerSpy).toHaveBeenCalledWith(['dashboard']);
    }));
  });
});
