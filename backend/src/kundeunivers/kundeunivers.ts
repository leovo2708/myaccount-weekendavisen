import { Http } from '../utils/http';
import {
  OrderFull, OrdersResponse, ResponseStatus, UserDataRequest, UserProfile
} from '../../../d/kundeunivers';
import { RichResult } from '../../../d/http';

export class Kundeunivers {
  private static http: Http = new Http(process.env.KU_APPLICATION_URL, true);

  public static changeAddress(userId: string, orderId: string, data: any): Promise<RichResult<ResponseStatus>> {
    const payload: UserDataRequest = {
      order_id: orderId,
      sso_name: userId,
      userdata: data
    };

    return this.http.post(`/my/account/sso-${userId}/change-address.json`, payload);
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
}
