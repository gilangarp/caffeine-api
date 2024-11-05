import { Router } from "express";
import { create, Delete, FetchAll, update } from "../controller/product/category.controller";

export const categoryRouter = Router()

categoryRouter.post("/add", create);
categoryRouter.get("/",FetchAll);
categoryRouter.patch("/setting/:id",update);
categoryRouter.delete("/delete/:id" , Delete)