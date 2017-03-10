import { MyaccountWeekendavisenPage } from './app.po';

describe('myaccount-weekendavisen App', () => {
  let page: MyaccountWeekendavisenPage;

  beforeEach(() => {
    page = new MyaccountWeekendavisenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
