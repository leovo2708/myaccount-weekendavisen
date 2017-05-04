import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {
  private active: Subject<boolean> = new Subject();

  hide(): void {
    this.active.next(false);
  }

  show(): void {
    this.active.next(true);
  }

  isActive(): Observable<boolean> {
    return this.active.asObservable();
  }
}
