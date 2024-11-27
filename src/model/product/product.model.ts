import { IBasicResponse } from "../response";
export interface IProductBody {
  product_name?: string;
  product_price?: string;
  discount_price?: string;
  product_description?: string;
  category_id?: string;
  category_name?: string;
  product_stock?: string;
}

export interface IDataProduct extends IProductBody {
  id?: string;
  uuid?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IImgProduct {
  img_1?: string;
  img_2?: string;
  img_3?: string;
}

export interface IProductImage {
  id: string;
  product_id: string;
  img_product: string;
}

export interface IProductPaginationQuery {
  page?: string;
  limit?: string;
  [key: string]: any;
}

export interface IProductQuery extends IProductPaginationQuery {
  searchText: string;
  category: string;
  minimumPrice: number;
  maximumPrice: number;
  sortBy?: string;
  favorite?: boolean;
}

interface CreateData {
  product: IDataProduct;
  images: IProductImage[];
}

export interface ICreateDataResponse extends IBasicResponse {
  data?: CreateData[];
}

export interface IProductResponse extends IBasicResponse {
  data?: IDataProduct[];
}

interface FetchDetail {
  product: IDataProduct;
  images: IImgProduct;
}

export interface IFetchDetailResponse extends IBasicResponse {
  data?: FetchDetail[];
}

export interface IUpdateImageResponse extends IBasicResponse {
  data?: IProductImage[];
}

export interface IUpdateDataResponse extends IBasicResponse {
  data?: IDataProduct[];
}

export interface IDetailSingleImageData extends IBasicResponse {
  data?: IDataProduct[];
}
