import { SignOptions } from "jsonwebtoken";

export const jwtOptions: SignOptions = {
    expiresIn: "5m",
    issuer: process.env.JWT_ISSUER,
  };
  