import { IBasicResponse } from "../response";

export interface ICategoriesBody {
  category_name: string;
}

export interface IDataCategories extends ICategoriesBody {
  id: number;
  IsCheck: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ICategoriesResponse extends IBasicResponse {
  data?: IDataCategories[];
}

export interface IDelateResponse extends IBasicResponse {
  msg: string;
}