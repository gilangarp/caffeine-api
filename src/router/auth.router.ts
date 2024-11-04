import { Router } from "express";
import { login, register } from "../controller/auth/auth.controller";

export const authRouter = Router()


authRouter.post("/register", register)
authRouter.post("/login", login )