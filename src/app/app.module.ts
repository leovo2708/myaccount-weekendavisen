import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MessageModule } from './message/message.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    MessageModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
