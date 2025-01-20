import { Router } from "express";
import {
  create,
  Delete,
  FetchAll,
  update,
} from "../controller/transaction/sizeProduct.controller";
import { authorization } from "../middleware/authorization.middleware";

export const sizeProductRouter = Router();

/**
 * @swagger
 * /sizeProduct/add:
 *   post:
 *     summary: Add a new product size with an added cost
 *     description: Creates a new product size (e.g., small, medium, large) and assigns an additional cost to it.
 *     operationId: addSizeProduct
 *     tags:
 *       - SizeProduct
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_size
 *               - added_cost
 *             properties:
 *               product_size:
 *                 type: string
 *                 description: The size of the product (e.g., small, medium, large).
 *                 example: "large"
 *               added_cost:
 *                 type: integer
 *                 description: The additional cost associated with the product size.
 *                 example: 7000
 *     responses:
 *       201:
 *         description: Product size added successfully
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
 *                   type: object
 *                   properties:
 *                     size:
 *                       type: string
 *                       example: "large"
 *                     added_cost:
 *                       type: integer
 *                       example: 7000
 */
sizeProductRouter.post("/add", authorization(["admin"]), create);

/**
 * @swagger
 * /sizeProduct:
 *   get:
 *     summary: Fetch all product sizes and their added costs
 *     description: Retrieves a list of all available product sizes along with their respective added costs.
 *     operationId: fetchAllSizeProducts
 *     tags:
 *       - SizeProduct
 *     responses:
 *       200:
 *         description: Successfully retrieved product sizes and added costs
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
 *                       size:
 *                         type: string
 *                         example: "Regular"
 *                       added_cost:
 *                         type: integer
 *                         example: 0
 */
sizeProductRouter.get("/", FetchAll);

/**
 * @swagger
 * /size-product/setting/{id}:
 *   patch:
 *     summary: Update the size and added cost of a product
 *     description: Updates the product size (e.g., "small", "medium", "large") and its associated additional cost based on the product's ID.
 *     operationId: updateSizeProduct
 *     tags:
 *       - SizeProduct
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product size to be updated.
 *         schema:
 *           type: integer
 *           example: 3
 *       - name: product_size
 *         in: body
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_size:
 *                   type: string
 *                   description: The updated size of the product.
 *                   example: "large"
 *                 added_cost:
 *                   type: integer
 *                   description: The additional cost associated with the new product size.
 *                   example: 7000
 *     responses:
 *       200:
 *         description: Product size and cost successfully updated
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
 *                         example: 3
 *                       size:
 *                         type: string
 *                         example: "Large"
 *                       added_cost:
 *                         type: integer
 *                         example: 7000
 */
sizeProductRouter.patch("/setting/:id", authorization(["admin"]), update);

/**
 * @swagger
 * /size-product/delete/{id}:
 *   delete:
 *     summary: Delete a product size by ID
 *     description: Deletes a product size and its associated added cost based on the provided product size ID.
 *     operationId: deleteSizeProduct
 *     tags:
 *       - SizeProduct
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product size to be deleted.
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Product size successfully deleted
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
 *                   example: "Size product successfully deleted"
 */
sizeProductRouter.delete("/delete/:id", authorization(["admin"]), Delete);
