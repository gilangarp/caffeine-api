import { Router } from "express";
import { create, Delete, FetchAll, update } from "../controller/transaction/shipping.controller";
import { authorization } from "../middleware/authorization.middleware";

export const shippingRouter = Router();

shippingRouter.post("/add",create);
shippingRouter.get("/",authorization(['admin']), FetchAll);
shippingRouter.patch("/setting/:id",authorization(['admin']), update);
shippingRouter.delete("/delete/:id" , Delete)