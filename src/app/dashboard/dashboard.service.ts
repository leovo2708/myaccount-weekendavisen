import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { API_URL } from '../../config';
import { Observable } from 'rxjs/Observable';
import { UserStore } from '../store/user.store';

@Injectable()
export class DashboardService {

  constructor(
    private http: Http,
    private userStore: UserStore) {
  }

  public getUserInfo(): Observable<any> {
    return this.userStore
      .getParamsWithUserTicket()
      .flatMap((params: any) => {
        return this.http.get(`${API_URL}/user/me`, {params});
      })
      .map((res: Response) => res.json());
  }
}
