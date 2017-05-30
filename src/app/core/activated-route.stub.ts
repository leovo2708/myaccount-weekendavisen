import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class ActivatedRouteStub {
  private _params: Subject<string[]> = new Subject();

  get params(): Observable<string[]> {
    return this._params.asObservable();
  }
}
