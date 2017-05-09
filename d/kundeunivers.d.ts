export interface Order {
  sap_order_id: string;
  product_family: string;
  service_type: string;
  status: string;
  delivery_address: string;
  suspend_allowed: boolean;
}

export interface Complaint {
  date: string;
  subject: string;
  status: string;
}

export interface Transaction {
  created: string;
  created_date: string;
  gateway: string;
  status: string;
  decline_reason: string;
  card_number: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  payment_time: string;
  payment_type: string;
  payment_price: string;
  payment_order_id: string;
  payment_transaction_id: string;
}

export interface Delivery {
  days: string[];
  address: string;
}

// TODO: Update type after KU API would be updated
export interface FAQ {
  [key: string]: any;
}

export interface OrderFull extends Order {
  conditions_url: string;
  product_family_extended: string;
  billing_frequency: string;
  delivery_method: string;
  payment_method: string;
  expiration_date: string;
  billing_address: string;
  split_delivery: Delivery[];
  complaints: Complaint[];
  transactions: Transaction[];
}

export interface OrdersResponse {
  orders: Order[];
  removed_sap_order_id?: string;
  added_sap_order_id?: string;
}

export interface UserProfile {
  mail: string;
  name: string;
  city: string;
  zipcode: string;
  address: string;
  phone: string;
  orders: Order[];
}

export interface ResponseStatus {
  status: string;
}

export interface EPaper {
  url: string;
  status: string;
}

export interface ChangeAddressPayload {
  lastname?: string;
  zipcode?: string;
  city?: string;
  street?: string;
  number?: string;
  phone?: string;
  message?: string;
  firstname?: string;
  co?: string;
  letter?: string;
  floor?: string;
  side?: string;
}

export class SuspendOrderPayload {
  fromdate?: string;
  enddate?: string;
  digital_access?: boolean;
}

export interface SuspendOrderResponse {
  status: string;
}
