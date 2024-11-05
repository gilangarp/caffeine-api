import { Router } from "express";
import {
  Delete,
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
authRouter.delete("/delete/:id", Delete);
