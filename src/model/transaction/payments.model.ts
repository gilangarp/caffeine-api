import { IBasicResponse } from "../response";

export interface IPaymentMethodBody {
  payment_method: string;
}

export interface IDataPaymentMethod extends IPaymentMethodBody {
  id: number;
}

export interface IPaymentMethodResponse extends IBasicResponse{
    data?: IDataPaymentMethod[]
}