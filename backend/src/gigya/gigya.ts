import { RichResult } from '../../../d/http';
import { FindUserResponse } from '../../../d/gigya/accounts/accounts';
import { Http } from '../utils/http';
import { Kundeunivers } from '../kundeunivers/kundeunivers';
import { CreateUserResponse } from '../../../d/kundeunivers';

export class Gigya {
  private static http: Http = new Http('https://accounts.eu1.gigya.com', true, true);

  private static getParams(params: any): any {
    return {
      ...params,
      apiKey: process.env.GIGYA_API_KEY,
      secret: process.env.GIGYA_SECRET
    };
  }

  public static findUser(email: string): Promise<RichResult<FindUserResponse>> {
    return Gigya.http.get('/accounts.search', Gigya.getParams({
      query: `SELECT UID from accounts WHERE profile.email="${email}"`
    }));
  }

  public static getUserIdOrCreate(email: string): Promise<string> {
    return Gigya.findUser(email)
      .then((result: RichResult<FindUserResponse>) => {
        if (result.body.totalCount) {
          return Promise.resolve(result.body.results[0].UID);
        }

        return Kundeunivers.createUser(email)
          .then((createResult: RichResult<CreateUserResponse>) => createResult.body.UID);
      });
  }
}
