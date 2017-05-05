import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ApiService } from '../core/api.service';
import { FAQ } from '../../../d/kundeunivers';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class FaqService {
  constructor(private api: ApiService,
              private loadingService: LoadingService) {
  }

  getFaq(termId: string): Promise<FAQ> {
    this.loadingService.show();

    return this.api.get(`/kundeunivers/faq/${termId}`)
      .finally(() => this.loadingService.hide())
      .toPromise()
      .then((response: Response) => response.json());
  }
}
