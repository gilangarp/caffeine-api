import { Router } from "express";
import { create, Delete, FetchAll, update } from "../controller/transaction/shipping.controller";
import { authorization } from "../middleware/authorization.middleware";

export const shippingRouter = Router();

/**
 * @swagger
 * /delivery/add:
 *   post:
 *     summary: Add a new delivery method
 *     description: Creates a new delivery method with the specified shipping details, such as shipping method, minimum cost, minimum distance, and added cost.
 *     operationId: addDeliveryMethod
 *     tags:
 *       - Delivery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shipping_method
 *               - minimum_cost
 *               - minimum_distance
 *               - added_cost
 *             properties:
 *               shipping_method:
 *                 type: string
 *                 description: The method of delivery (e.g., "Dine In").
 *                 example: "Dine In"
 *               minimum_cost:
 *                 type: integer
 *                 description: The minimum cost for the delivery method.
 *                 example: 0
 *               minimum_distance:
 *                 type: integer
 *                 description: The minimum delivery distance (in kilometers or miles).
 *                 example: 0
 *               added_cost:
 *                 type: integer
 *                 description: Any additional cost added to the delivery method.
 *                 example: 0
 *     responses:
 *       200:
 *         description: Delivery method successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 2001
 *                 msg:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       shipping_method:
 *                         type: string
 *                         example: "Dine In"
 *                       minimum_cost:
 *                         type: integer
 *                         example: 0
 *                       minimum_distance:
 *                         type: integer
 *                         example: 0
 *                       added_cost:
 *                         type: integer
 *                         example: 0
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 */
shippingRouter.post("/add",create);

/**
 * @swagger
 * /delivery:
 *   get:
 *     summary: Fetch all delivery methods
 *     description: Retrieves all available delivery methods, including details like shipping method, minimum cost, and distance.
 *     operationId: fetchAllDeliveryMethods
 *     tags:
 *       - Delivery
 *     responses:
 *       200:
 *         description: Successfully retrieved all delivery methods
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
 *                       shipping_method:
 *                         type: string
 *                         example: "Dine in"
 *                       minimum_cost:
 *                         type: integer
 *                         example: 0
 *                       minimum_distance:
 *                         type: integer
 *                         example: 0
 *                       added_cost:
 *                         type: integer
 *                         example: 0
 */
shippingRouter.get("/", FetchAll);

/**
 * @swagger
 * /delivery/setting/{id}:
 *   patch:
 *     summary: Update delivery settings
 *     description: Updates the details of an existing delivery method using its unique ID. Only accessible by users with admin privileges.
 *     operationId: updateDeliveryMethod
 *     tags:
 *       - Delivery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the delivery method to update.
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
 *               - shipping_method
 *               - minimum_cost
 *               - minimum_distance
 *               - added_cost
 *             properties:
 *               shipping_method:
 *                 type: string
 *                 description: The shipping method to be updated.
 *                 example: "Dine In"
 *               minimum_cost:
 *                 type: integer
 *                 description: The minimum cost for the delivery method.
 *                 example: 0
 *               minimum_distance:
 *                 type: integer
 *                 description: The minimum delivery distance.
 *                 example: 0
 *               added_cost:
 *                 type: integer
 *                 description: Any additional cost for the delivery method.
 *                 example: 0
 *     responses:
 *       200:
 *         description: Delivery method successfully updated
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
 *                       shipping_method:
 *                         type: string
 *                         example: "Dine In"
 *                       minimum_cost:
 *                         type: integer
 *                         example: 0
 *                       minimum_distance:
 *                         type: integer
 *                         example: 0
 *                       added_cost:
 *                         type: integer
 *                         example: 0
 */
shippingRouter.patch("/setting/:id",authorization(['admin']), update);

/**
 * @swagger
 * /delivery/delete/{id}:
 *   delete:
 *     summary: Delete a delivery method
 *     description: Deletes a specific delivery method by its unique ID.
 *     operationId: deleteDeliveryMethod
 *     tags:
 *       - Delivery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the delivery method to be deleted.
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Delivery method successfully deleted
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
 *                   example: "Delivery method successfully deleted"
 */
shippingRouter.delete("/delete/:id" , Delete)