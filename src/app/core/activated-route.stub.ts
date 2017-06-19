import { Observable } from 'rxjs/Observable';

export class ActivatedRouteStub {
  get params(): Observable<any> {
    return null;
  }
}
