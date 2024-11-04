import { Router } from "express";
import { register } from "../controller/auth/auth.controller";

export const authRouter = Router()


authRouter.post("/register", register)