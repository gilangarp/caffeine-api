import { Router } from "express";
import { create, Delete, FetchAll, update } from "../controller/transaction/sizeProduct.controller";

export const sizeProductRouter = Router();
sizeProductRouter.post("/add" , create)
sizeProductRouter.get("/" , FetchAll)
sizeProductRouter.patch("/setting/:id" , update)
sizeProductRouter.delete("/delete/:id" , Delete)