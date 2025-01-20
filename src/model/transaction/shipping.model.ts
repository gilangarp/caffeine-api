import { IBasicResponse } from "../response";

export interface IDeliveryBody {
  shipping_method: string;
  minimum_cost: number;
  minimum_distance: number;
  added_cost: number;
}

export interface IDataDelivery extends IDeliveryBody {
  id: number;
  created_at: string;
  updated_at?: string;
}

export interface IDataDeliveryResponse extends IBasicResponse {
  data?: IDataDelivery[];
}

export interface IDelateResponse extends IBasicResponse {
  msg: string;
}
