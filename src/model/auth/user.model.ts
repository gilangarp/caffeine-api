import { IBasicResponse } from "../response";

export interface IUserBody {
  user_email: string;
}

export interface IDataUser extends IUserBody {
  id: string;
}

export interface IUserRegisterBody extends IUserBody {
  user_pass: string;
}

export interface IRegisterResponse extends IBasicResponse {
  data?: IDataUser[];
}
