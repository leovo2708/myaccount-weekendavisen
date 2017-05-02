import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { environment } from '../../environments/environment';
import { FaqService } from './faq.service';
import { FAQ } from '../../../d/kundeunivers';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  showAnswer: Object = {};
  loaded: boolean = false;
  faq: Array<any> = [];
  title: string = 'Mest stillede spørgsmål';

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
      .toPromise()
      .then((response: Response) => response.json())
      .then((response: FAQ) => {
        this.faq = response.result;
        this.loaded = true;
      });
  }
}
