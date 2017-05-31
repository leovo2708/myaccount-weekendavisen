import { Headers, Http, RequestOptionsArgs } from '@angular/http';

import { ApiService } from './api.service';
import { HttpStub } from './http.stub';
import { environment } from '../../environments/environment';
import { JwtStub } from './jwt.stub';
import { TestBed } from '@angular/core/testing';
import { JwtService } from './jwt.service';

describe('ApiService', () => {
  const testUrl: string = '/foo/bar';
  const testPayload: any = {foo: 'bar'};
  const testParams: RequestOptionsArgs = {};
  const completeTestUrl: string = `${environment.apiUrl}${testUrl}`;

  let apiService: ApiService;
  let expectedParams: RequestOptionsArgs;
  let http: Http;
  let jwtService: JwtStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        {provide: Http, useClass: HttpStub},
        {provide: JwtService, useClass: JwtStub}
      ]
    });

    apiService = TestBed.get(ApiService);
    http = TestBed.get(Http);
    jwtService = TestBed.get(JwtService);
    expectedParams = {
      withCredentials: true,
      headers: new Headers({
        Authorization: jwtService.jwt
      })
    };

    spyOn(http, 'get').and.callThrough();
    spyOn(http, 'post').and.callThrough();
    spyOn(http, 'put').and.callThrough();
    spyOn(http, 'delete').and.callThrough();
  });

  it('should GET a resource', () => {
    apiService.get(testUrl, testParams);

    expect(http.get).toHaveBeenCalledWith(completeTestUrl, expectedParams);
  });

  it('should POST a resource', () => {
    apiService.post(testUrl, testPayload, testParams);

    expect(http.post).toHaveBeenCalledWith(completeTestUrl, testPayload, expectedParams);
  });

  it('should PUT a resource', () => {
    apiService.put(testUrl, testPayload, testParams);

    expect(http.put).toHaveBeenCalledWith(completeTestUrl, testPayload, expectedParams);
  });

  it('should DELETE a resource', () => {
    apiService.delete(testUrl, testParams);

    expect(http.delete).toHaveBeenCalledWith(completeTestUrl, expectedParams);
  });
});
