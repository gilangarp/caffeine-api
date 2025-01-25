import { IBasicResponse } from "../response";

export interface ITransactionBody {
  user_id: number;
  full_name: string;
  user_email: string;
  address: string;
  payment_type: string;
  shipping_id: number;
  status_id: number;
}

export interface ITransactionProduct {
  product_id: string;
  size_id: number;
  fd_option_id: string;
  product_name: string;
  product_price: number;
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

export interface IMidtransTransaction {
  transaction_id: string;
  grossAmount: number;
  full_name: string;
  email: string;
  address: string;
}

export interface IUserDataMidtrans {
  full_name: string;
  email: string;
  address: string;
  payment_type: string;
}

export interface ITransactionQuery {
  page?: string;
  limit?: string;
  [key: string]: any;
  status?: string;
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
  transaction_status: string;
  gross_amount: number;
  payment_type: string;
  signature_key: string;
  fraud_status: string;
  status_code: number;
  order_id: string;
}

export interface ITransactionWithDetailsBody
  extends ITransactionProduct,
    ITransactionBody {
  products: ITransactionProduct[];
}

export interface ITransactionResponse extends IBasicResponse {
  data?: IDataTransaction;
}

interface Detail {
  info: IDataDetailHistory;
  product: IDataProductDetailHistory[];
}

export interface IHistoryDetailResponse extends IBasicResponse {
  data?: Detail[];
}
