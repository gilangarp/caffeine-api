import { IBasicResponse } from "../response";

export interface IStatusTransactionBody {
  status: string;
}

export interface IDataStatusTransaction extends IStatusTransactionBody {
  id: number;
}

export interface IStatusTransactionResponse extends IBasicResponse{
    data?:IDataStatusTransaction[]
}

export interface IDelateResponse extends IBasicResponse {
  msg: string;
}
