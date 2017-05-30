import { fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FaqComponent } from './faq.component';
import { SanitizeHtmlPipe } from '../pipes/sanitize-html.pipe';
import { FaqService } from './faq.service';
import { FaqStub } from './faq.stub';
import { FaqPage } from './faq.page';

describe('FaqComponent', () => {
  let page: FaqPage;

  beforeEach(() => {
    page = new FaqPage(FaqComponent, {
      declarations: [
        FaqComponent,
        SanitizeHtmlPipe
      ],
      providers: [
        { provide: FaqService, useClass: FaqStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });

    page.fixture.detectChanges();
  });

  it('should fetch FAQ', fakeAsync(() => {
    page.initComponent();

    expect(page.faqService.getFaq).toHaveBeenCalled();
    expect(page.faqCards.length).toBe(3);
  }));

  it('should switch answer visibility', fakeAsync(() => {
    page.initComponent();
    expect(page.cardContent).toBeFalsy();

    page.clickCardTitle();
    expect(page.cardContent).toBeTruthy();
  }));
});
