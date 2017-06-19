import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { ApiService } from '../api.service';
import { loadGigyaSDK } from '../../common/script-loader';
import { ConfigResponse } from '../../../../d/config';

@Injectable()
export class ConfigService {
  load(api: ApiService): Promise<void> {
    return api.get('/config')
      .toPromise()
      .then((response: Response) => response.json())
      .then((config: ConfigResponse) => {
        return loadGigyaSDK(config.gigyaApiKey);
      });
  }
}
