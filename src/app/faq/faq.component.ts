import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { FaqService } from './faq.service';
import { FAQ, FaqResponse } from '../../../d/kundeunivers';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  showAnswer: Object = {};
  faq: FAQ[];

  constructor(
      private faqService: FaqService
  ) {}

  switchAnswerVisibility(i: number): void {
    this.showAnswer[i] = !this.showAnswer[i];
  }

  isAnswerVisible(i: number): boolean {
    return this.showAnswer[i];
  }

  ngOnInit(): void {
    this.faqService.getFaq(environment.TID)
      .then((response: FaqResponse) => {
        this.faq = response.result;
      });
  }
}
