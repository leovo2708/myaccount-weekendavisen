import { tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FaqComponent } from './faq.component';
import { FaqService } from './faq.service';
import { TestingPage } from '../common/testing-page';

export class FaqPage extends TestingPage<FaqComponent> {
  faqService: FaqService;

  initStubs(): void {
    this.faqService = this.debugElement.injector.get(FaqService);
  }

  initSpies(): void {
    spyOn(this.faqService, 'getFaq').and.returnValue(Promise.resolve({
      result: [
        {title: 'Title 1', body: '<span></span>'},
        {title: 'Title 2', body: '<p></p>'},
        {title: 'Title 3', body: '<p><span></span></p>'}
      ]
    }));
  }

  get card(): DebugElement {
    return this.faqCards[1];
  }

  get cardContent(): DebugElement {
    return this.card.query(By.css('md-card-content'));
  }

  get cardTitle(): DebugElement {
    return this.card.query(By.css('md-card-title'));
  }

  get faqCards(): DebugElement[] {
    return this.debugElement.queryAll(By.css('md-card.faq-card'));
  }

  clickCardTitle(): void {
    this.cardTitle.triggerEventHandler('click', null);
    this.fixture.detectChanges();
  }

  initComponent(): void {
    this.component.ngOnInit();
    tick();
    this.fixture.detectChanges();
  }
}
