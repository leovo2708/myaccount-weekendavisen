import { Subject } from 'rxjs/Subject';

import { Message } from '../../../d/message';
import { Observable } from 'rxjs/Observable';

export class MessageStub {
  private _message: Subject<Message> = new Subject();

  get message(): Observable<Message> {
    return this._message.asObservable();
  }

  success(text: string, displayTime?: number): void {
  }

  warn(text: string, displayTime?: number): void {
  }
}
