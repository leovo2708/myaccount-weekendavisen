export interface Order {
  sap_order_id?: string;
  product_family?: string;
  service_type?: string;
  status?: string;
  delivery_address?: string;
  suspend_allowed?: boolean;
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

export interface FAQ {
  body: string;
  title: string;
}

export interface FaqResponse {
  result: FAQ[];
}

export interface OrderFull extends Order {
  conditions_url?: string;
  product_family_extended?: string;
  billing_frequency?: string;
  delivery_method?: string;
  payment_method?: string;
  expiration_date?: string;
  billing_address?: string;
  split_delivery?: Delivery[];
  complaints?: Complaint[];
  transactions?: Transaction[];
}

export interface OrdersResponse {
  orders: Order[];
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

export interface SuspendOrderPayload {
  fromdate?: string;
  enddate?: string;
  digital_access?: boolean;
}

export interface SuspendOrderResponse {
  status: string;
}

export interface RemoveOrderResponse {
  removed_sap_order_id?: string;
}

export interface Offer {
  offer_id?: string; // "BMSUBWU12",
  edition_code?: string; // "BM",
  mix_type?: string; // "03",
  access_level?: string; // "0001",
  service_type?: string; // "U",
  subscription_type?: string; // "04",
  frequency_id?: string; // "12",
  campaign_price?: number; // null,
  total_price?: number; // 36.25,
  unit_price?: number; // 2.59,
  total_price_diff?: number; // 413.75,
  unit_price_diff?: number; // 91.90,
  status?: string; // "1", // 1 - active, 0 - disabled
  vat_base?: number; // 29.00,
  vat_rate?: number; // 25.00,
  vat_amount?: number; // 7.25,
  deleted?: boolean; // false,
  purchase_price?: number; // 36.25,
  subscription_type_text?: string; // "Web Nyhedsabonnement",
  service_type_text?: string; // "Hele ugen", - "whole week"
  frequency_text?: string; // "md.", - "month"
  settings?: {
    machine_name?: string; // "bmsubwu12_promo_name",
    promo_name?: string; // "BMSUBWU12-20161202",
    success_url?: string; // "",
    body_class?: string; // "",
    payment_settings?: {
      dibs_retrieve_ticket?: number; // 0,
      dibs_unique_card?: number; // 0,
      exclude_recurrent?: number; // 0,
      skip_payment?: number; // 0,
      sap_other_amount?: number; // 0,
      sap_other_amount_value?: string; // "",
      discount_hide?: number; // 0,
      extra_price_line_status?: number; // 0,
      extra_price_line?: {
        title?: string; // "Pris pr mdr",
        price?: string; // "0"
      };
      start_date?: number; // 0
    };
    registration_checkbox?: number; // 0,
    registration_checkbox_settings?: {
      registration_checkbox_required?: number; // 1,
      registration_checkbox_status?: number; // 1,
      registration_checkbox_text?: string; // ""
    };
    exclude_rules?: string[]; // [],
    exclude_rules_options?: {
      skip_validation?: {
        initial?: number; // 0,
        'mail-validate-validation'?: number; // 0,
        'user-login'?: number; // 0,
        'user-login-validation'?: number; // 0,
        'new-user'?: number; // 0,
        'existing-user-validation'?: number; // 0,
        'new-user-validation'?: number; // 0
      };
      redirect_url?: string; // ""
    };
    ignore_company_roles?: number; // 0,
    override_notification?: number; // 0,
    mail_template?: {
      notification_subject?: string; // "",
      notification_body?: string; // ""
    };
    promo_code?: {
      enabled?: number; // 0,
      prefill?: number; // 0,
      validation?: {
        enabled?: number; // 0,
        operator?: string; // "=",
        value?: string; // ""
      };
    };
    karens?: {
      enabled?: number; // 0,
      validation?: {
        period?: string; // "",
        exclude_access_levels?: string; // "",
        return_url?: string; // ""
      };
    };
    epaper_url?: string; // "",
    texts?: {
      cancel_form?: string; // "",
      order_details_form_bottom?: string; // "",
      order_details_sidebar_footer?: string;
    };
    urls?: {
      validate_failed?: string; // ""
    };
  };
}

export interface OffersResponse {
  offers: Offer[];
}

export interface CreateOrderPayload {
  offer_id: string;
  firstname: string;
  lastname: string;
  zipcode: string;
  street: string;
  number: number;
  letter: string;
  floor: string;
  side: string;
  email: string;
  city: string;
  phone: string;
  terms: boolean;
  promo_terms?: boolean;
}

export interface CityResponse {
  city: string;
  streets: string[];
}

export interface CreateOrderResponse {
  status: string;
  url: string;
  hash: string;
  order_id: string;
  transaction_id: string;
}

// TODO: this response needs to be reviewed. The endpoint on KU API side is not ready yet
export interface CreateUserResponse {
  UID: string;
}
