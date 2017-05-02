import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdIconModule } from '@angular/material';

import { FaqService } from './faq.service';
import { FaqComponent } from './faq.component';
import { SharedModule } from '../shared/shared.module';
import { SanitizeHtmlPipe } from '../pipes/sanitize-html.pipe';

@NgModule({
  imports: [
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    SharedModule
  ],
  declarations: [
    FaqComponent,
    SanitizeHtmlPipe
  ],
  providers: [
    FaqService
  ]
})
export class FaqModule {
}
