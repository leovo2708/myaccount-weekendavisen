import { Http } from '../utils/http';
import { RichResult } from '../../../d/http';
import { ChangeAddressModel } from '../../../d/kundeunivers.models';
import {
  OrderFull, OrdersResponse, ResponseStatus, UserProfile, FAQ, EPaper
} from '../../../d/kundeunivers';

export class Kundeunivers {
  private static http: Http = new Http(process.env.KU_APPLICATION_URL, true);

  public static changeAddress(userId: string, orderId: string, data: ChangeAddressModel): Promise<RichResult<ResponseStatus>> {
    return this.http.post(`/my/account/sso-${userId}/order/${orderId}/change-address.json`, data);
  }

  public static getEPaper(): Promise<RichResult<EPaper>> {
    return this.http.get('/my/epaper/weekendavisen');
  }

  public static getUserOrders(userId: string): Promise<RichResult<OrdersResponse>> {
    return this.http.get(`/my/account/sso-${userId}/orders.json`);
  }

  public static getUserOrder(userId: string, orderId: string): Promise<RichResult<OrderFull>> {
    return this.http.get(`/my/account/sso-${userId}/order/${orderId}.json`);
  }

  public static getUserProfile(userId: string): Promise<RichResult<UserProfile>> {
    return this.http.get(`/my/account/sso-${userId}.json`);
  }

  public static getFAQ(termId: string): Promise<RichResult<FAQ>> {
    return this.http.get(`/my/faq/${termId}.json`);
  }
}
