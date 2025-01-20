import { Router } from "express";
import {
  create,
  Delete,
  FetchAll,
  update,
} from "../controller/transaction/statusTransactions.controller";
import { authorization } from "../middleware/authorization.middleware";

export const statusTransactionsRouter = Router();

/**
 * @swagger
 * /status/add:
 *   post:
 *     summary: Add a new status to the transaction
 *     description: Creates a new status (e.g., "On Hold") for a transaction.
 *     operationId: addStatus
 *     tags:
 *       - Status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: The status to be added to the transaction (e.g., "On Hold").
 *                 example: "On Hold"
 *     responses:
 *       200:
 *         description: Status successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "Status successfully added"
 */
statusTransactionsRouter.post("/add", authorization(["admin"]), create);

/**
 * @swagger
 * /status/setting/{id}:
 *   patch:
 *     summary: Update the status of a transaction by ID
 *     description: Updates the status of a transaction (e.g., from "Pending" to "On Hold") based on the provided transaction ID.
 *     operationId: updateStatus
 *     tags:
 *       - Status
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the transaction status to be updated.
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: status
 *         in: body
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The updated status of the transaction (e.g., "Pending", "On Hold").
 *                   example: "Pending"
 *     responses:
 *       200:
 *         description: Status successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "Status successfully updated"
 */
statusTransactionsRouter.patch(
  "/setting/:id",
  authorization(["admin"]),
  update
);

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Fetch all transaction statuses
 *     description: Retrieves all possible statuses for transactions (e.g., Pending, Sending Goods, Finish Order, etc.).
 *     operationId: fetchAllTransactionStatuses
 *     tags:
 *       - Status
 *     responses:
 *       200:
 *         description: Successfully fetched all transaction statuses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         example: "Pending"
 */
statusTransactionsRouter.get("/", FetchAll);

/**
 * @swagger
 * /status/delete/{id}:
 *   delete:
 *     summary: Delete a product status by ID
 *     description: Deletes a specific product status based on the provided status ID.
 *     operationId: deleteStatus
 *     tags:
 *       - Status
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product status to be deleted.
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Status successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 msg:
 *                   type: string
 *                   example: "Status product successfully deleted"
 */
statusTransactionsRouter.delete(
  "/delete/:id",
  authorization(["admin"]),
  Delete
);
