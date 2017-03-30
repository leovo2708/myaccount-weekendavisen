import { NgModule } from '@angular/core';

import { RoutesModule } from './routes.module';
import { StoreModule } from '../store/store.module';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    RoutesModule,
    StoreModule
  ],
  exports: [
    RoutesModule
  ],
  providers: [
    ApiService,
    AuthService,
    UserService
  ]
})
export class CoreModule {
}
