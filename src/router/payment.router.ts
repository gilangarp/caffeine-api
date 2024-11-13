import { Router } from "express";
import { create, FetchAll, update } from "../controller/transaction/payment.controller";
import { authorization } from "../middleware/authorization.middleware";

export const paymentRouter = Router();

/**
 * @swagger
 * /payment/add:
 *   post:
 *     summary: Add a new payment method
 *     description: Creates a new payment method. Only accessible by users with admin privileges.
 *     operationId: addPaymentMethod
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - payment_method
 *             properties:
 *               payment_method:
 *                 type: string
 *                 description: The name of the payment method to be added (e.g., "Cash").
 *                 example: "Cash"
 *     responses:
 *       201:
 *         description: Payment method successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
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
 *                         example: 2
 *                       payment_method:
 *                         type: string
 *                         example: "Cash"
 */
paymentRouter.post("/add",authorization(['admin']) , create);

/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Fetch all payment methods
 *     description: Retrieves all available payment methods.
 *     operationId: fetchAllPaymentMethods
 *     tags:
 *       - Payment
 *     responses:
 *       200:
 *         description: Successfully retrieved all payment methods
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
 *                       payment_method:
 *                         type: string
 *                         example: "Cash"
 *       500:
 *         description: Internal server error
 */
paymentRouter.get("/",FetchAll);

/**
 * @swagger
 * /payment/setting/{id}:
 *   patch:
 *     summary: Update a payment method
 *     description: Updates the details of an existing payment method using its unique ID. Only accessible by users with admin privileges.
 *     operationId: updatePaymentMethod
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the payment method to update.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - payment_method
 *             properties:
 *               payment_method:
 *                 type: string
 *                 description: The name of the payment method to be updated (e.g., "Bank Transfers").
 *                 example: "Bank Transfers"
 *     responses:
 *       200:
 *         description: Payment method successfully updated
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
 *                       payment_method:
 *                         type: string
 *                         example: "Bank Transfers"
 */
paymentRouter.patch("/setting/:id",authorization(['admin']) ,update)
