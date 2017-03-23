import { NgModule } from '@angular/core';
import { LoginStore } from './login.store';
import { UserStore } from './user.store';

@NgModule({
  providers: [
    LoginStore,
    UserStore
  ]
})
export class StoreModule {
}
