import { ComponentFixture, tick } from '@angular/core/testing';

import { FaqComponent } from './faq.component';
import { DebugElement } from '@angular/core';
import { FaqService } from './faq.service';
import { By } from '@angular/platform-browser';

export class FaqPage {
  component: FaqComponent;
  debugElement: DebugElement;
  faqService: FaqService;

  constructor(private fixture: ComponentFixture<FaqComponent>) {
    this.component = fixture.componentInstance;
    this.debugElement = fixture.debugElement;
    this.faqService = this.debugElement.injector.get(FaqService);

    this.initSpies();
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

  private initSpies(): void {
    spyOn(this.faqService, 'getFaq').and.returnValue(Promise.resolve({
      result: [
        {title: 'Title 1', body: '<span></span>'},
        {title: 'Title 2', body: '<p></p>'},
        {title: 'Title 3', body: '<p><span></span></p>'}
      ]
    }));
  }
}
