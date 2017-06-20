import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageModule } from './message/message.module';
import { SharedModule } from './shared/shared.module';
import { InitializerModule } from './core/initializer/initializer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    InitializerModule,
    MessageModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
