import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Response } from '@angular/http';
import { EPaper } from '../../../d/kundeunivers';

@Injectable()
export class MainMenuService {
  constructor(private apiService: ApiService) {
  }

  getEPaper(): Promise<EPaper> {
    return this.apiService.get('/kundeunivers/epaper')
      .toPromise()
      .then((response: Response) => response.json());
  }
}
