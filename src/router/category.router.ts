import { Router } from "express";
import { create, Delete, FetchAll, update } from "../controller/product/category.controller";

export const categoryRouter = Router()

/**
 * @swagger
 * /category/add:
 *   post:
 *     summary: Add a new category
 *     description: Creates a new product category with the specified category name.
 *     operationId: createCategory
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_name
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: The name of the category to be created.
 *                 example: "Unique Beverages"
 *     responses:
 *       200:
 *         description: Category successfully created
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
 *                       category_name:
 *                         type: string
 *                         example: "Unique Beverages"
 */
categoryRouter.post("/add", create);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Fetch all categories
 *     description: Retrieves all available product categories.
 *     operationId: getAllCategories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Categories fetched successfully
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
 *                       category_name:
 *                         type: string
 *                         example: "Coffee"
 */
categoryRouter.get("/",FetchAll);

/**
 * @swagger
 * /category/setting/{id}:
 *   patch:
 *     summary: Update category
 *     description: Update the name of an existing category.
 *     operationId: updateCategory
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the category to update
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *       - name: body
 *         in: body
 *         description: Category update data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             category_name:
 *               type: string
 *               example: "Updated Category Name"
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: "Category updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     category_name:
 *                       type: string
 *                       example: "Updated Category Name"
 */
categoryRouter.patch("/setting/:id",update);

/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     summary: Delete category
 *     description: Delete a category by its ID.
 *     operationId: deleteCategory
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the category to delete
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *                   example: "Category successfully deleted"
 */
categoryRouter.delete("/delete/:id" , Delete)