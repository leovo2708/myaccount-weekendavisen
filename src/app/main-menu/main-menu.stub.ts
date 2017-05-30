import { EPaper } from '../../../d/kundeunivers';

export class MainMenuStub {
  getEPaper(): Promise<EPaper> {
    return Promise.resolve(null);
  }
}
