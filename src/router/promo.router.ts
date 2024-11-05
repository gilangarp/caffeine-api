import { Router } from "express";
import { create, Delete, FetchAll } from "../controller/product/promo.controller";
import { singleCloudUploader } from "../middleware/upload";
import { authorization } from "../middleware/authorization.middleware";

export const promoRouter = Router()

promoRouter.post("/add/:id", singleCloudUploader("promoImage"),authorization(['admin']), create)
promoRouter.get("/", FetchAll)
promoRouter.delete("/:id" ,authorization(['admin']), Delete)