import { Http } from '../utils/http';
import { RichResult } from '../../../d/http';
import {
  ChangeAddressPayload, OrderFull, OrdersResponse, ResponseStatus, UserProfile,
  FAQ, EPaper, SuspendOrderPayload, SuspendOrderResponse
} from '../../../d/kundeunivers';

export class Kundeunivers {
  private static http: Http = new Http(process.env.KU_APPLICATION_URL, true);

  public static changeAddress(userId: string, orderId: string, data: ChangeAddressPayload): Promise<RichResult<ResponseStatus>> {
    return this.http.post(`/my/account/${userId}/order/${orderId}/change-address.json`, data);
  }

  public static getEPaper(): Promise<RichResult<EPaper>> {
    return this.http.get('/my/epaper/weekendavisen');
  }

  public static getUserOrders(userId: string): Promise<RichResult<OrdersResponse>> {
    return this.http.get(`/my/account/${userId}/orders.json`);
  }

  public static getUserOrder(userId: string, orderId: string): Promise<RichResult<OrderFull>> {
    return this.http.get(`/my/account/${userId}/order/${orderId}.json`);
  }

  public static getUserProfile(userId: string): Promise<RichResult<UserProfile>> {
    return this.http.get(`/my/account/${userId}.json`);
  }

  public static getFAQ(termId: string): Promise<RichResult<FAQ>> {
    return this.http.get(`/my/faq/${termId}.json`);
  }

  public static suspendOrder(userId: string, orderId: string, payload: SuspendOrderPayload): Promise<RichResult<SuspendOrderResponse>> {
    return this.http.post(`/my/account/sso-${userId}/order/${orderId}/suspend-order.json`, payload);
  }
}
