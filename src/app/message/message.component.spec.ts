import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MessageComponent } from './message.component';
import { MessageService } from './message.service';
import { MessageStub } from './message.stub';
import { Message } from '../../../d/message';
import { MessagePage } from './message.page';

describe('MessageComponent', () => {
  let page: MessagePage;

  beforeEach(() => {
    page = new MessagePage(MessageComponent, {
      declarations: [ MessageComponent ],
      imports: [ NoopAnimationsModule ],
      providers: [
        { provide: MessageService, useClass: MessageStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    page.component.ngOnInit();
  });

  it('should show a message and hide it after some delay', (done: any) => {
    page.pushNewMessage();
    expect(page.messages.length).toBe(1);

    setTimeout(() => {
      page.updateView();
      expect(page.messages.length).toBe(0);

      done();
    }, 200);
  });

  it('should show a message and not hide it when delay is 0', (done: any) => {
    page.pushNewMessage(MessagePage.generateMessage(0));
    expect(page.messages.length).toBe(1);

    setTimeout(() => {
      page.updateView();
      expect(page.messages.length).toBe(1);

      done();
    }, 1000);
  });

  it('should display a proper message text and color', (done: any) => {
    const messageText: string = 'Success!';

    page.pushNewMessage(MessagePage.generateMessage(0, messageText));
    expect(page.lastMessageCard.classes.warn).toBe(true);
    expect(page.lastMessageText).toContain(messageText);

    done();
  });

  it('should manually close a message', (done: any) => {
    const message: Message = MessagePage.generateMessage(0);

    page.pushNewMessage(message);
    expect(page.messages.length).toBe(1);

    page.triggerCloseMessageClick();
    page.updateView();

    expect(page.messages.length).toBe(0);

    done();
  });

  it('should pause message timeout when mouse-hovered', (done: any) => {
    page.pushNewMessage();

    setTimeout(() => {
      page.triggerMouseOver();

      setTimeout(() => {
        page.updateView();
        expect(page.messages.length).toBe(1);
        page.triggerMouseOut();

        setTimeout(() => {
          page.updateView();
          expect(page.messages.length).toBe(0);

          done();
        }, 300);
      }, 300);
    }, 50);
  });
});
