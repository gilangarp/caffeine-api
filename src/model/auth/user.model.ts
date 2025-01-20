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
  page?: string;
  limit?: string;
  [key: string]: any;
}

export interface IUserProfileData {
  id: string;
  profile_image: string;
  full_name: string;
  phone_number: string;
  address: string;
  user_email: string;
}

export interface IUserProfileResponse extends IBasicResponse {
  data?: IUserProfileData[];
}

export interface IDelateResponse extends IBasicResponse {
  msg: string;
}
