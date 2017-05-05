import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../../d/message';

@Injectable()
export class MessageService {
  private _message: Subject<Message> = new Subject();

  show(text: string, color: string, displayTime: number = 3000): void {
    this._message.next({text, color, displayTime});
  }

  normal(text: string, displayTime?: number): void {
    this.show(text, 'normal', displayTime);
  }

  success(text: string, displayTime?: number): void {
    this.show(text, 'success', displayTime);
  }

  warn(text: string, displayTime: number = 0): void {
    this.show(text, 'warn', displayTime);
  }

  get message(): Observable<Message> {
    return this._message.asObservable();
  }
}
