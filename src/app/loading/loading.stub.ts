import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class LoadingStub {
  public active: Subject<boolean> = new Subject();

  isActive(): Observable<boolean> {
    return this.active.asObservable();
  }
}
