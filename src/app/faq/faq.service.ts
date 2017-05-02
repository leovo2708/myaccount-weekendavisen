import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from '../core/api.service';

@Injectable()
export class FaqService {
  constructor(private api: ApiService) {
  }

  getFaq(termId: string): Observable<Response> {
    return this.api.get(`/kundeunivers/faq/${termId}`);
  }
}
