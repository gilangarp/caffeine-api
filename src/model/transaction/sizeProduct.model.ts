import { IBasicResponse } from "../response";

export interface ISizeProductBody {
  product_size?: string;
  added_cost?: number;
}

export interface ISizeProductData extends ISizeProductBody {
  id: number;
}

export interface IDataResponse extends IBasicResponse {
  data?: ISizeProductData[];
}

export interface IDelateResponse extends IBasicResponse {
  msg: string;
}
