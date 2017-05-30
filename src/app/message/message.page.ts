import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

import { Message } from '../../../d/message';
import { MessageService } from './message.service';
import { MessageComponent } from './message.component';
import { TestingPage } from '../common/testing-page';

export class MessagePage extends TestingPage<MessageComponent> {
  messageService: MessageService;
  messageSubject: Subject<Message>;

  static generateMessage(displayTime: number = 100, text: string = 'Foo bar!', color: string = 'warn'): Message {
    return { color, text, displayTime };
  }

  initSpies(): void {
    spyOnProperty(this.messageService, 'message', 'get').and.returnValue(this.messageSubject.asObservable());
  }

  initStubs(): void {
    this.messageService = this.debugElement.injector.get(MessageService);
    this.messageSubject = new Subject();
  }

  get container(): DebugElement {
    return this.debugElement.query(By.css('.container'));
  }

  get messages(): DebugElement[] {
    return this.debugElement.queryAll(By.css('.message-container'));
  }

  get lastMessageCard(): DebugElement {
    return this.messages[0].query(By.css('md-card'));
  }

  get lastMessageText(): string {
    return this.lastMessageCard.childNodes[0].nativeNode.nodeValue;
  }

  pushNewMessage(message: Message = MessagePage.generateMessage()): void {
    this.messageSubject.next(message);
    this.updateView();
  }

  triggerCloseMessageClick(): void {
    this.messages[0].query(By.css('md-icon')).triggerEventHandler('click', null);
  }

  triggerMouseOver(): void {
    this.container.triggerEventHandler('mouseover', null);
  }

  triggerMouseOut(): void {
    this.container.triggerEventHandler('mouseout', null);
  }

  updateView(): void {
    this.fixture.detectChanges();
  }
}
