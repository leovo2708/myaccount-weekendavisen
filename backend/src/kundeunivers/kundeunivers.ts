import { Http } from '../utils/http';
import { RichResult } from '../../../d/http';
import {
  ChangeAddressPayload, OrderFull, OrdersResponse, ResponseStatus, UserProfile,
  FAQ, EPaper, SuspendOrderPayload, SuspendOrderResponse, Offer, CreateOrderResponse, CityResponse, CreateUserResponse, CreateOrderPayload
} from '../../../d/kundeunivers';
import { Request } from 'hapi';
import { JWT } from '../jwt';

export class Kundeunivers {
  private static http: Http = new Http(process.env.KU_APPLICATION_URL, true);

  public static changeAddress(userId: string, orderId: string, data: ChangeAddressPayload): Promise<RichResult<ResponseStatus>> {
    return this.http.post(`/my/account/${userId}/order/${orderId}/change-address.json`, data);
  }

  public static createUser(email: string): Promise<RichResult<CreateUserResponse>> {
    return this.http.post('/my/account.json', {email});
  }

  public static createOrder(userId: string, data: CreateOrderPayload): Promise<RichResult<CreateOrderResponse>> {
    return this.http.post(`/my/account/${userId}/order.json`, data);
  }

  public static findCity(zipCode: string): Promise<RichResult<CityResponse>> {
    return this.http.get(`/my/city/${zipCode}.json`);
  }

  public static getUIDFromRequest(request: Request): string {
    return JWT.getAuthTicket(request.headers.authorization).accountInfo.UID;
  }

  public static getEPaper(): Promise<RichResult<EPaper>> {
    return this.http.get('/my/epaper/weekendavisen');
  }

  public static getOffer(offerId: string): Promise<RichResult<Offer>> {
    return this.http.get(`/my/offer/${offerId}.json`);
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

  public static removeOrder(userId: string, orderId: string): Promise<RichResult<ResponseStatus>> {
    return this.http.post(`/my/account/${userId}/order/${orderId}/remove-order.json`);
  }
}
