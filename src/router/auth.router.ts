import { Router } from "express";
import {
  Delate,
  FetchAll,
  login,
  register,
  update,
} from "../controller/auth/auth.controller";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/", FetchAll);
authRouter.patch("/setting/:id", update);
authRouter.delete("/delate/:id", Delate);
