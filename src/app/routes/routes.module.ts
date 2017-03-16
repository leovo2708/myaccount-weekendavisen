import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginGuard } from '../login/login.guard';
import { LogoutGuard } from '../login/logout.guard';
import { UserStore } from '../user/user.store';
import { UserService } from '../user/user.service';
import { LoginComponent } from '../login/login.component';
import { LoginStore } from '../login/login.store';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: '',
    canActivate: [LoginGuard],
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: '404', component: NotFoundComponent},
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'}
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoginGuard,
    LoginStore,
    LogoutGuard,
    UserStore,
    UserService
  ]
})
export class AppRoutingModule {
}
