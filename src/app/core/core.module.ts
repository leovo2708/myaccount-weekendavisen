import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { GigyaService } from './gigya.service';
import { JwtService } from './jwt.service';
import { RoutesModule } from './routes.module';

@NgModule({
  imports: [
    RoutesModule
  ],
  exports: [
    RoutesModule
  ],
  providers: [
    ApiService,
    AuthService,
    GigyaService,
    JwtService
  ]
})
export class CoreModule {
}
