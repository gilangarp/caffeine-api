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

export interface IUsersParams {
  id: string;
}

export interface IUsersQuery {
  page: string;
  limit: string;
  [key: string]: any;
}