import { IBasicResponse } from "../response";

export interface ITransactionBody {
  user_id: number;
  full_name: string;
  user_email: string;
  address: string;
  payment_type: string;
  shipping_id: number;
  status_id: number;
  subtotal: number;
  tax: number;
  grand_total: number;
}

export interface IDataTransaction {
  id: string;
  token?: string;
  redirect_url?: string;
  payment_method?: string;
  status?: string;
  product_name?: string;
  product_price?: number;
}

export interface ITransactionProduct {
  transaction_id: string;
  product_id: string;
  size_id: number;
  fd_option_id?: string;
  product_name: string;
  product_price: number;
  quantity?: number;
}

export interface ITransactionQuery {
  page: string;
  limit: string;
  [key: string]: any;
  status: string;
}

export interface IDataDetailHistory {
  full_name: string;
  phone_number: string;
  address: string;
  payment_method: string;
  shipping_method: string;
  status: string;
  grand_total: number;
}

export interface IDataProductDetailHistory {
  id: string;
  img_product: string;
  product_name: string;
  product_price: number;
  discount_price: number;
  product_size: string;
  option: string;
  shipping_method: string;
}

export interface IUpdateStatusOnMidtransBody {
  transaction_id: string;
  status: string;
  grand_total: string;
  data: {
    signature_key: string;
    transaction_status: string;
    fraud_status: string;
    payment_type: string;
  };
}

export interface ITransactionWithDetailsBody
  extends ITransactionProduct,
    ITransactionBody {
  products: ITransactionProduct[];
}

export interface ITransactionResponse extends IBasicResponse {
  data?: IDataTransaction[];
}

interface Detail {
  info: IDataDetailHistory;
  product: IDataProductDetailHistory[];
}

export interface IHistoryDetailResponse extends IBasicResponse {
  data?: Detail[];
}
