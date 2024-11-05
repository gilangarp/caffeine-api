import { IUsersParams, IUsersQuery } from "./auth/user.model";
import { ParamsDictionary } from 'express-serve-static-core';
import { IProductQuery } from "./product/product.model";

export type AppParams = ParamsDictionary | IUsersParams ; 
export type QueryParams = IUsersQuery  | IProductQuery ;