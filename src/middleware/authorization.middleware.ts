import { NextFunction, Request, Response } from "express";
import { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { IPayload } from "../model/auth/payload.model";
import { AppParams } from "../model/param";
import { IAuthResponse } from "../model/auth/auth.model";

export const jwtOptions: SignOptions = {
  expiresIn: "1h",
  issuer: process.env.JWT_ISSUER,
};

export const authorization =
  (roles: string[]) =>
  (
    req: Request<AppParams>,
    res: Response<IAuthResponse>,
    next: NextFunction
  ) => {
    const bearerToken = req.header("Authorization");
    if (!bearerToken) {
      return res.status(401).json({
        code: 401,
        msg: "Forbidden",
        error: {
          message: "No access",
        },
      });
    }

    const token = bearerToken.split(" ")[1];
    jwt.verify(
      token,
      <string>process.env.JWT_SECRET,
      jwtOptions,
      (err, payload) => {
        if (err) {
          return res.status(403).json({
            code: 403,
            msg: "Forbidden",
            error: {
              message: err.message,
            },
          });
        }

        const userPayload = payload as IPayload;
        if (roles && !roles.includes(userPayload.role)) {
          return res.status(403).json({
            code: 403,
            msg: "Forbidden",
            error: {
              message: "Access denied, insufficient permissions",
            },
          });
        }
        req.userPayload = payload as IPayload;
        next();
      }
    );
  };
