import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../core/api.service';

@Injectable()
export class ChangePasswordService {
  constructor(private api: ApiService) {
  }

}
