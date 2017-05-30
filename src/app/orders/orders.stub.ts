import { OrderFull, OrdersResponse } from '../../../d/kundeunivers';
import { ChangeAddressModel } from './change-address/change-address.model';

export class OrdersStub {
  getOrders(): Promise<OrdersResponse> {
    return Promise.resolve(null);
  }

  removeOrder(orderId: string): Promise<OrdersResponse> {
    return Promise.resolve(null);
  }

  changeAddress(orderId: string, formModel: ChangeAddressModel): Promise<OrdersResponse> {
    return Promise.resolve(null);
  }

  getOrder(orderId: string): Promise<OrderFull> {
    return Promise.resolve(null);
  }
}
