import { IUsersParams, IUsersQuery } from "./auth/user.model";
import { ParamsDictionary } from 'express-serve-static-core';

export type AppParams = ParamsDictionary | IUsersParams ; 
export type QueryParams = IUsersQuery   ;