import { Router } from "express";
import { create, Delete, FetchAll, update } from "../controller/transaction/statusTransactions.controller";
import { authorization } from "../middleware/authorization.middleware";

export const statusTransactionsRouter = Router();

statusTransactionsRouter.post("/add", create);
statusTransactionsRouter.get("/",authorization(['admin']),FetchAll);
statusTransactionsRouter.patch("/setting/:id",authorization(['admin']),update);
statusTransactionsRouter.delete("/delete/:id", Delete )
