import { NgModule } from '@angular/core';

import { initializerProvider } from './initializer';
import { CoreModule } from '../core.module';
import { ConfigService } from './config.service';

@NgModule({
  imports: [
    CoreModule
  ],
  exports: [
    CoreModule
  ],
  providers: [
    ConfigService,
    initializerProvider
  ]
})
export class InitializerModule {
}
