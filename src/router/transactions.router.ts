import { Router } from "express";
import {
  create,
  FetchAll,
  FetchDetail,
  TrxNotifWithUpdate,
} from "../controller/transaction/transactions.controller";
import { authorization } from "../middleware/authorization.middleware";

export const transactionsRouter = Router();

/**
 * @swagger
 * /transaction/add:
 *   post:
 *     summary: Create a new transaction
 *     description: Creates a new transaction with user, payment, shipping details, products, and pricing information.
 *     operationId: createTransaction
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - payments_id
 *               - shipping_id
 *               - status_id
 *               - subtotal
 *               - tax
 *               - grand_total
 *               - products
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The unique ID of the user making the transaction.
 *                 example: "9d633644-08e6-4471-a652-00388ed2d09e"
 *               payments_id:
 *                 type: integer
 *                 description: The ID of the payment method used in the transaction.
 *                 example: 1
 *               shipping_id:
 *                 type: integer
 *                 description: The ID of the shipping method used in the transaction.
 *                 example: 1
 *               status_id:
 *                 type: integer
 *                 description: The ID of the status associated with the transaction (e.g., "Pending", "Completed").
 *                 example: 3
 *               subtotal:
 *                 type: integer
 *                 description: The subtotal amount of the transaction.
 *                 example: 27000
 *               tax:
 *                 type: integer
 *                 description: The tax applied to the transaction.
 *                 example: 2700
 *               total_discount:
 *                 type: integer
 *                 description: Any discounts applied to the transaction.
 *                 example: 0
 *               grand_total:
 *                 type: integer
 *                 description: The total amount to be paid after tax and discounts.
 *                 example: 29700
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       description: The unique ID of the product.
 *                       example: "e9dc86c9-d68c-44a7-becd-ad8a3ebeb332"
 *                     size_id:
 *                       type: integer
 *                       description: The ID of the size selected for the product.
 *                       example: 1
 *                     fd_option_id:
 *                       type: integer
 *                       description: The ID of any food option selected for the product.
 *                       example: 2
 *     responses:
 *       201:
 *         description: Transaction successfully created
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
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "130ce0ff-aac2-41b5-bec0-7636ae37b554"
 *                       order_number:
 *                         type: integer
 *                         example: 2
 *                       user_id:
 *                         type: string
 *                         example: "9d633644-08e6-4471-a652-00388ed2d09e"
 *                       payments_id:
 *                         type: integer
 *                         example: 1
 *                       shipping_id:
 *                         type: integer
 *                         example: 1
 *                       status_id:
 *                         type: integer
 *                         example: 3
 *                       subtotal:
 *                         type: string
 *                         example: "27000"
 *                       tax:
 *                         type: string
 *                         example: "2700"
 *                       total_discount:
 *                         type: string
 *                         example: "0"
 *                       grand_total:
 *                         type: string
 *                         example: "29700"
 *                       created_at:
 *                         type: string
 *                         example: "2024-11-11T09:52:05.627Z"
 *                       updated_at:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             transaction_id:
 *                               type: string
 *                               example: "130ce0ff-aac2-41b5-bec0-7636ae37b554"
 *                             product_id:
 *                               type: string
 *                               example: "e9dc86c9-d68c-44a7-becd-ad8a3ebeb332"
 *                             size_id:
 *                               type: integer
 *                               example: 1
 *                             fd_option_id:
 *                               type: integer
 *                               example: 2
 */
transactionsRouter.post("/add", authorization(["admin", "user"]), create);

/**
 * @swagger
 * /transaction/history-order/{uuid}:
 *   get:
 *     summary: Fetch transaction history of a specific user
 *     description: Retrieves the transaction history of a user, with optional filters for pagination and status.
 *     operationId: getTransactionHistory
 *     tags:
 *       - Transaction
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: The unique UUID of the user whose transaction history is being requested.
 *         schema:
 *           type: string
 *           example: "9d633644-08e6-4471-a652-00388ed2d09e"
 *       - name: limit
 *         in: query
 *         required: false
 *         description: The number of results to be returned per page.
 *         schema:
 *           type: integer
 *           example: 5
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number of the results to fetch.
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter transactions by status (e.g., "Pending", "Completed", "Finish Order").
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Successfully retrieved transaction history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "cbe7e14d-f5eb-4e85-b403-c78a9fb85776"
 *                       order_number:
 *                         type: integer
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         example: "10-November-2024"
 *                       grand_total:
 *                         type: string
 *                         example: "29700"
 *                       status:
 *                         type: string
 *                         example: "Finish Order"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalData:
 *                       type: integer
 *                       example: 10
 *                     totalPage:
 *                       type: integer
 *                       example: 2
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     prevLink:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     nextLink:
 *                       type: string
 *                       example: "http://localhost:8080/transaction/history-order/9d633644-08e6-4471-a652-00388ed2d09e?limit=5&page=2&status=3"
 */
transactionsRouter.get(
  "/history-order/:uuid",
  authorization(["admin", "user"]),
  FetchAll
);

/**
 * @swagger
 * /transaction/detail-history/{uuid}:
 *   get:
 *     summary: Fetch detailed transaction history for a specific transaction
 *     description: Retrieves the detailed history of a user's transaction, including product details and payment/shipping information.
 *     operationId: getTransactionDetailHistory
 *     tags:
 *       - Transaction
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: The unique UUID of the transaction whose details are being requested.
 *         schema:
 *           type: string
 *           example: "cbe7e14d-f5eb-4e85-b403-c78a9fb85776"
 *       - name: limit
 *         in: query
 *         required: false
 *         description: The number of results to be returned per page.
 *         schema:
 *           type: integer
 *           example: 5
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number of the results to fetch for pagination.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved transaction detail history
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
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       info:
 *                         type: object
 *                         properties:
 *                           full_name:
 *                             type: string
 *                             example: "full name"
 *                           phone_number:
 *                             type: string
 *                             example: "phone number"
 *                           address:
 *                             type: string
 *                             example: "address"
 *                           payment_method:
 *                             type: string
 *                             example: "Cash"
 *                           shipping_method:
 *                             type: string
 *                             example: "Dine in"
 *                           status:
 *                             type: string
 *                             example: "Finish Order"
 *                           grand_total:
 *                             type: string
 *                             example: "29700"
 *                       product:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             img_product:
 *                               type: string
 *                               example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1730446591/coffeeshops/product-Extra%20Shot%20Espresso-imageHandler-0.jpg"
 *                             product_name:
 *                               type: string
 *                               example: "Extra Shot Espresso"
 *                             product_price:
 *                               type: integer
 *                               example: 10000
 *                             discount_price:
 *                               type: integer
 *                               nullable: true
 *                               example: null
 *                             size:
 *                               type: string
 *                               example: "Single"
 *                             option:
 *                               type: string
 *                               example: "Hot"
 *                             shipping_method:
 *                               type: string
 *                               example: "Dine in"
 */
transactionsRouter.get(
  "/detail-history/:uuid",
  authorization(["user"]),
  FetchDetail
);

transactionsRouter.post("/notification", TrxNotifWithUpdate);
