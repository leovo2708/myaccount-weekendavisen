import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginGuard } from '../login/login.guard';
import { UserService } from '../user/user.service';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { RootComponent } from '../root/root.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [LoginGuard],
    component: RootComponent,
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
    UserService
  ]
})
export class AppRoutingModule {
}
