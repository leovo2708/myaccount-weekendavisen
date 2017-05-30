import { FaqResponse } from '../../../d/kundeunivers';

export class FaqStub {
  getFaq(tid: string): Promise<FaqResponse> {
    return Promise.resolve(null);
  }
}
