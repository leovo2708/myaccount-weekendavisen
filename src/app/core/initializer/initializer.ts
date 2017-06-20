import { APP_INITIALIZER, FactoryProvider } from '@angular/core';

import { ApiService } from '../api.service';
import { ConfigService } from './config.service';

export const initializerProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializerFactory,
  deps: [ConfigService, ApiService],
  multi: true
};

export function initializerFactory(configService: ConfigService, api: ApiService): () => Promise<void> {
  return function(): Promise<void> {
    return configService.load(api);
  }
}
