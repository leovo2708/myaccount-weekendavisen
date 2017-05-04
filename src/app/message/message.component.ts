import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MessageService } from './message.service';
import { Message } from '../../../d/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        opacity: '1',
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({
          opacity: '0',
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class MessageComponent implements OnInit {
  latestTimeout: number;
  messages: Message[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.message.subscribe((message: Message): void => {
      this.messages.unshift(message);
      this.applyTimeout(message);
    });
  }

  applyTimeout(message: Message): void {
    clearTimeout(this.latestTimeout);

    if (message.displayTime > 0) {
      this.latestTimeout = setTimeout(() => {
        this.closeMessage(message);
      }, message.displayTime);
    }
  }

  closeMessage(message: Message): void {
    const messageIndex: number = this.messages.findIndex((messageToCheck: Message) => message === messageToCheck);

    if (messageIndex > -1) {
      this.messages.splice(messageIndex, 1);

      if (this.messages.length) {
        this.applyTimeout(this.messages[0]);
      }
    }
  }

  resumeTimeout(): void {
    this.applyTimeout(this.messages[0]);
  }

  stopTimeout(): void {
    if (this.latestTimeout) {
      clearTimeout(this.latestTimeout);
    }
  }
}
