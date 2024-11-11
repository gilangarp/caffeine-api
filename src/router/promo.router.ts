import { Router } from "express";
import { create, Delete, FetchAll } from "../controller/product/promo.controller";
import { authorization } from "../middleware/authorization.middleware";

export const promoRouter = Router()

/**
 * @swagger
 * /promo/add/{id}:
 *   post:
 *     summary: Create a promotion for a product by ID
 *     description: Adds a promotion for a specific product, including a discount price and promo details.
 *     operationId: createPromo
 *     tags:
 *       - Promo
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The UUID of the product to which the promotion will be applied
 *         schema:
 *           type: string
 *           example: "edaf3e24-1351-4dca-8efb-ee5d9575b4b5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount_price:
 *                 type: number
 *                 example: 25000
 *                 description: The discounted price of the product
 *               promo_name:
 *                 type: string
 *                 example: "Espresso Classic Delight"
 *                 description: The name of the promotion
 *               promo_description:
 *                 type: string
 *                 example: "15% off!"
 *                 description: The description of the promotion
 *     responses:
 *       201:
 *         description: Promotion created successfully
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
 *                       product_id:
 *                         type: string
 *                         example: "edaf3e24-1351-4dca-8efb-ee5d9575b4b5"
 *                       discount_price:
 *                         type: number
 *                         example: 25000
 *                       promo_name:
 *                         type: string
 *                         example: "Espresso Classic Delight"
 *                       promo_description:
 *                         type: string
 *                         example: "15% off!"
 */
promoRouter.post("/add/:id",authorization(['admin']), create)

/**
 * @swagger
 * /promo:
 *   get:
 *     summary: Get all promotions
 *     description: Retrieve a list of all active promotions for products.
 *     operationId: getAllPromos
 *     tags:
 *       - Promo
 *     responses:
 *       200:
 *         description: A list of all promotions
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
 *                         type: string
 *                         example: "e9dc86c9-d68c-44a7-becd-ad8a3ebeb332"
 *                       img_product:
 *                         type: string
 *                         format: uri
 *                         example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1730442545/coffeeshops/product-Espresso%20Classic-imageHandler-0.avif"
 *                       promo_name:
 *                         type: string
 *                         example: "15% off!"
 *                       promo_description:
 *                         type: string
 *                         example: "Espresso Classic Delight"
 */
promoRouter.get("/", FetchAll)

/**
 * @swagger
 * /promo/{id}:
 *   delete:
 *     summary: Delete a specific promotion
 *     description: Deletes a promotion by its ID.
 *     operationId: deletePromo
 *     tags:
 *       - Promo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the promotion to delete.
 *         schema:
 *           type: string
 *           example: "e9dc86c9-d68c-44a7-becd-ad8a3ebeb332"
 *     responses:
 *       200:
 *         description: Promo successfully deleted
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
 *                   type: string
 *                   example: "Promo successfully deleted"
 */
promoRouter.delete("/:id" ,authorization(['admin']), Delete)