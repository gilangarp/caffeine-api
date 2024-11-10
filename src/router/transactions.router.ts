import { Router } from "express"
import { create, FetchAll, FetchDetail } from "../controller/transaction/transactions.controller"

export const transactionsRouter = Router()

transactionsRouter.post("/add", create)
transactionsRouter.get("/history-order/:uuid", FetchAll)
transactionsRouter.get("/detail-history/:uuid", FetchDetail)