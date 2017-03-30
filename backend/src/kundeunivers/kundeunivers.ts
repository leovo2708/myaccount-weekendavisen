import { Http } from '../http';
import {
  OrderFull, OrdersResponse,
  UserProfile
} from '../../../d/kundeunivers';

export class Kundeunivers {
  private static http: Http = new Http(process.env.KU_APPLICATION_URL);

  public static getUserOrders(userId: string): Promise<OrdersResponse> {
    return this.http.get(`/my/account/sso-${userId}/orders.json`);
  }

  public static getUserOrder(userId: string, orderId: string): Promise<OrderFull> {
    return this.http.get(`/my/account/sso-${userId}/order/${orderId}.json`);
  }

  public static getUserProfile(userId: string): Promise<UserProfile> {
    return this.http.get(`/my/account/sso-${userId}.json`);
  }
}
