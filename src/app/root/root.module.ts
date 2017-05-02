import { NgModule } from '@angular/core';

import { MainMenuModule } from '../main-menu/main-menu.module';
import { OrdersModule } from '../orders/orders.module';
import { FaqModule } from '../faq/faq.module';
import { RootComponent } from './root.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundModule } from '../not-found/not-found.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { TopBarModule } from '../top-bar/top-bar.module';

@NgModule({
  imports: [
    DashboardModule,
    MainMenuModule,
    NotFoundModule,
    OrdersModule,
    FaqModule,
    SharedModule,
    TopBarModule
  ],
  declarations: [
    RootComponent
  ]
})
export class RootModule {
}
