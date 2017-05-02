import { browser, element, by } from 'protractor';

export class MyaccountWeekendavisenPage {
  navigateTo(): any {
    return browser.get('/');
  }

  getParagraphText(): string {
    return element(by.css('app-root h1')).getText();
  }
}
