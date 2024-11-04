import { IBasicResponse } from "../response";

export interface IProfileBody {
  full_name: string;
  phone_number: string;
  address: string;
  profile_image?: string;
}

export interface IDataProfile extends IProfileBody {
  user_id?: string;
}

export interface IDetailData extends IProfileBody {
  user_email: string;
  created_at: string;
  update_at: string;
}

export interface IDataUpdateProfileResponse extends IBasicResponse {
  data?: IDataProfile[];
}

export interface IDetailDataResponse extends IBasicResponse {
  data?: IDetailData[];
}
