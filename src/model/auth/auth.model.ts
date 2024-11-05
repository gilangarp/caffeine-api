import { IBasicResponse } from "../response";

export interface IAuth {
  user_pass: string;
  id: string;
  iss: string;
  role: string;
  isdelete:boolean;
}

export interface IUserLoginBody {
  user_email: string;
  user_pass: string;
  uuid: string;
}

export interface IAuthResponse extends IBasicResponse{
  data?: Array<{
    token: string;
    id: string;
    role: string;
  }>;
}
