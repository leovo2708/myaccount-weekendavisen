import { BoomError, create, wrap } from 'boom';
import { Result } from '../../../d/http';

export class HttpHelper {
  static wrapError(result: Result): BoomError {
    if (result.response && result.response.statusCode) {
      return create(result.response.statusCode, result.response.statusMessage, result.body);
    }

    return wrap(result.error);
  }
}
