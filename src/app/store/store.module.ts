import { NgModule } from '@angular/core';

import { AuthStore } from './auth.store';
import { LoginStore } from './login.store';

@NgModule({
  providers: [
    AuthStore,
    LoginStore
  ]
})
export class StoreModule {
}
