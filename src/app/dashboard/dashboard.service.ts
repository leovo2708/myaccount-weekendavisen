import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ApiService } from '../core/api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {

  constructor(private api: ApiService) {
  }

  public getUserInfo(): Observable<any> {
    return this.api.get('/user/me');
  }
}
