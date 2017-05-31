import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { ApiStub } from './api.stub';
import { JwtService } from './jwt.service';
import { GigyaService } from './gigya.service';
import { JwtStub } from './jwt.stub';
import { GigyaStub } from './gigya.stub';
import { AuthTicket } from '../../../d/auth';
import { Observable } from 'rxjs/Observable';

describe('AuthService', () => {
  let apiService: ApiService;
  let authService: AuthService;
  let gigyaService: GigyaService;
  let jwtService: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: ApiService, useClass: ApiStub},
        {provide: JwtService, useClass: JwtStub},
        {provide: GigyaService, useClass: GigyaStub}
      ]
    });

    apiService = TestBed.get(ApiService);
    authService = TestBed.get(AuthService);
    gigyaService = TestBed.get(GigyaService);
    jwtService = TestBed.get(JwtService);
  });

  it('should fail to authenticate user', async () => {
    expect(await authService.auth()).toBe(null);
  });

  it('should get an expired authTicket', () => {
    const expLate = Date.now() - 1000;
    const expFuture = Date.now() + 10000;
    const jwtSpy: jasmine.Spy = spyOnProperty(jwtService, 'jwt', 'set').and.callThrough();

    authService.authTicket = {exp: expFuture, accountInfo: {}};
    expect(authService.authTicket).not.toBe(null);

    authService.authTicket = {exp: expLate};
    expect(authService.authTicket).toBe(null);
    expect(jwtSpy).toHaveBeenCalledWith(null);
  });

  it('should authenticate user via API call', async () => {
    const authTicket: AuthTicket = {exp: Date.now() + 10000};
    const jwtToken: string = 'foo:bar';
    const jwtSpySetter: jasmine.Spy = spyOnProperty(jwtService, 'jwt', 'set').and.callThrough();

    spyOnProperty(jwtService, 'jwt', 'get').and.returnValue(null);
    spyOn(apiService, 'post').and.returnValue(Observable.of({text: () => jwtToken}));
    spyOn(jwtService, 'decode').and.returnValue(authTicket);
    spyOn(gigyaService, 'isLoggedIn').and.returnValue(true);
    spyOn(gigyaService, 'getUser').and.callThrough();

    expect(await authService.auth()).toBe(authTicket);
    expect(gigyaService.getUser).toHaveBeenCalled();
    expect(jwtSpySetter).toHaveBeenCalledWith(jwtToken);
  });

  it('should authenticate user via fetching JWT', async () => {
    const authTicket: AuthTicket = {exp: Date.now() + 10000};
    const jwtSpy: jasmine.Spy = spyOnProperty(jwtService, 'jwt', 'get').and.returnValue('foo');

    spyOn(jwtService, 'decode').and.returnValue(authTicket);
    spyOn(gigyaService, 'getUser').and.callThrough();

    expect(await authService.auth()).toBe(authTicket);
    expect(jwtSpy).toHaveBeenCalled();
    expect(gigyaService.getUser).not.toHaveBeenCalled();
  });

  it('should authenticate user via existing authTicket', async () => {
    const authTicket: AuthTicket = {exp: Date.now() + 10000};
    const jwtSpy: jasmine.Spy = spyOnProperty(jwtService, 'jwt', 'get').and.callThrough();

    spyOn(gigyaService, 'getUser').and.callThrough();

    authService.authTicket = authTicket;
    expect(await authService.auth()).toBe(authTicket);
    expect(jwtSpy).not.toHaveBeenCalled();
    expect(gigyaService.getUser).not.toHaveBeenCalled();
  });

  it('should log out user', async () => {
    const jwtSpy: jasmine.Spy = spyOnProperty(jwtService, 'jwt', 'set').and.callThrough();
    const authTicketSpy: jasmine.Spy = spyOnProperty(authService, 'authTicket', 'set').and.callThrough();

    spyOn(gigyaService, 'logOut').and.returnValue(Promise.resolve({errorCode: 0}));

    expect(await authService.logOut()).toEqual({errorCode: 0});
    expect(jwtSpy).toHaveBeenCalledWith(null);
    expect(authTicketSpy).toHaveBeenCalledWith(null);
  });
});
