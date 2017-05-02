import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { FaqComponent } from '../faq/faq.component';
import { LoginComponent } from '../login/login.component';
import { LoginGuard } from '../login/login.guard';
import { LoginModule } from '../login/login.module';
import { NotFoundComponent } from '../not-found/not-found.component';
import {
  OrderDetailsComponent
} from '../orders/order-details/order-details.component';
import { OrdersComponent } from '../orders/orders.component';
import { RootComponent } from '../root/root.component';
import { SharedModule } from '../shared/shared.module';
import { RootModule } from '../root/root.module';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [LoginGuard],
    component: RootComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'orders', component: OrdersComponent},
      {path: 'orders/:orderId', component: OrderDetailsComponent},
      {path: 'faq', component: FaqComponent},
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
  imports: [
    LoginModule,
    RootModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [
    LoginGuard
  ]
})
export class RoutesModule {
}
