import * as express from "express-serve-static-core";
import { IPayload } from "./src/model/auth/payload.model";


declare global {
  namespace Express {
    export interface Request {
      userPayload?: IPayload | string;
    }
  }
}
