import { Router } from "express";
import { multiCloudUploader } from "../middleware/upload";
import { authorization } from "../middleware/authorization.middleware";
import { create, Delete, FetchAll, FetchDetail, FetchSingleImageDetail, update, updateImage } from "../controller/product/product.controller";

export const productRouter = Router()

/**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product and upload its images. Only accessible by admins.
 *     operationId: createProduct
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *                 description: Name of the product
 *               product_price:
 *                 type: string
 *                 description: Price of the product in the smallest unit (e.g., cents)
 *               discount_price:
 *                 type: string
 *                 description: Discounted price of the product
 *               product_description:
 *                 type: string
 *                 description: A brief description of the product
 *               category_id:
 *                 type: string
 *                 description: Category ID for the product
 *               category_name:
 *                 type: string
 *                 description: Name of the product's category
 *               product_stock:
 *                 type: string
 *                 description: Amount of stock available for the product
 *               imageHandler:
 *                 type: array
 *                 description: List of product images (max 3)
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: "Product created successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "33e37012-8a74-4d8d-990e-bb3cc9fd1e52"
 *                           product_name:
 *                             type: string
 *                             example: "Whipped Cream.."
 *                           product_price:
 *                             type: integer
 *                             example: 5000
 *                           product_description:
 *                             type: string
 *                             example: "Light whipped cream to add deliciousness to your drink."
 *                           category_id:
 *                             type: integer
 *                             example: 4
 *                           product_stock:
 *                             type: integer
 *                             example: 90
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-11-11T04:07:18.471Z"
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             img_product:
 *                               type: string
 *                               format: uri
 *                               example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1731298043/coffeeshops/product-Whipped%20Cream..-imageHandler-0.png"
 *                             product_id:
 *                               type: string
 *                               example: "33e37012-8a74-4d8d-990e-bb3cc9fd1e52"
 *       400:
 *         description: Bad request, invalid data or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 msg:
 *                   type: string
 *                   example: "Invalid input data"
 */
productRouter.post("/add", multiCloudUploader("imageHandler", 3),authorization(['admin']) , create);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Fetch a list of products
 *     description: Fetch products based on search filters, price range, and pagination.
 *     operationId: fetchAllProducts
 *     tags:
 *       - Product
 *     parameters:
 *       - name: searchText
 *         in: query
 *         description: Text to search for products by name or description
 *         required: false
 *         schema:
 *           type: string
 *           example: "Chai"
 *       - name: minimumPrice
 *         in: query
 *         description: Minimum price of products
 *         required: false
 *         schema:
 *           type: string
 *           example: "10000"
 *       - name: maximumPrice
 *         in: query
 *         description: Maximum price of products
 *         required: false
 *         schema:
 *           type: string
 *           example: "50000"
 *       - name: limit
 *         in: query
 *         description: Number of products to fetch per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 6
 *       - name: page
 *         in: query
 *         description: Page number to fetch (pagination)
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: sortBy
 *         in: query
 *         description: Sort order of products
 *         required: false
 *         schema:
 *           type: string
 *           enum: [a-z, z-a, price-asc, price-desc]
 *           example: "a-z"
 *       - name: category
 *         in: query
 *         description: Filter products by category
 *         required: false
 *         schema:
 *           type: string
 *           example: "Coffee"
 *       - name: favorite
 *         in: query
 *         description: Filter by favorite products (true/false)
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Products fetched successfully
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
 *                   example: "Data fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "140f59ad-94fe-490a-9c44-ee37d0674b63"
 *                       product_name:
 *                         type: string
 *                         example: "Chai Tea"
 *                       product_price:
 *                         type: integer
 *                         example: 20000
 *                       product_description:
 *                         type: string
 *                         example: "Spiced tea with milk and sugar, warm and comforting."
 *                       rating:
 *                         type: integer
 *                         example: 5
 *                       discount_price:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       category_name:
 *                         type: string
 *                         example: "Non Coffee"
 *                       img_product:
 *                         type: string
 *                         format: uri
 *                         example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1730445921/coffeeshops/product-Chai%20Tea-imageHandler-0.jpg"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalData:
 *                       type: integer
 *                       example: 12
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
 *                       example: "http://localhost:8080/product?searchText=&minimumPrice=&maximumPrice=&limit=6&page=2&sortBy=a-z&category=&favorite=true"
 */
productRouter.get("/",FetchAll);

/**
 * @swagger
 * /product/setting/image/{uuid}:
 *   patch:
 *     summary: Update product images
 *     description: Update the images associated with a specific product. Only accessible by admins.
 *     operationId: updateProductImages
 *     tags:
 *       - Product
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: The UUID of the product to update images for
 *         schema:
 *           type: string
 *           example: "edaf3e24-1351-4dca-8efb-ee5d9575b4b5"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imageHandler:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: List of images to upload for the product (maximum of 3 images)
 *                 minItems: 1
 *                 maxItems: 3
 *     responses:
 *       200:
 *         description: Images updated successfully
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
 *                   example: "Images updated successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       img_product:
 *                         type: string
 *                         format: uri
 *                         example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1731298966/coffeeshops/product-edaf3e24-1351-4dca-8efb-ee5d9575b4b5-imageHandler-0.png"
 *                       product_id:
 *                         type: string
 *                         example: "edaf3e24-1351-4dca-8efb-ee5d9575b4b5"
 */
productRouter.patch("/setting/image/:uuid",multiCloudUploader("imageHandler", 3),authorization(['admin']),updateImage);

/**
 * @swagger
 * /product/setting/{uuid}:
 *   patch:
 *     summary: Update product details
 *     description: Allows an admin to update the details of a specific product (e.g., name, price, description, stock).
 *     operationId: updateProductDetails
 *     tags:
 *       - Product
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: The UUID of the product to update
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
 *               product_name:
 *                 type: string
 *                 description: The new name of the product.
 *                 example: "Cappuccino Cream"
 *               product_price:
 *                 type: string
 *                 description: The new price of the product in smallest currency units.
 *                 example: "35000"
 *               discount_price:
 *                 type: string
 *                 nullable: true
 *                 description: The discounted price of the product, if applicable.
 *                 example: "30000"
 *               product_description:
 *                 type: string
 *                 description: The updated description of the product.
 *                 example: "Creamy espresso with frothed milk and a cocoa sprinkle."
 *               category_id:
 *                 type: string
 *                 description: The category ID to which the product belongs.
 *                 example: "1"
 *               product_stock:
 *                 type: string
 *                 description: The updated stock count for the product.
 *                 example: "89"
 *     responses:
 *       200:
 *         description: Product details updated successfully
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
 *                       id:
 *                         type: string
 *                         example: "edaf3e24-1351-4dca-8efb-ee5d9575b4b5"
 *                       product_name:
 *                         type: string
 *                         example: "Cappuccino Cream"
 *                       product_price:
 *                         type: integer
 *                         example: 35000
 *                       product_description:
 *                         type: string
 *                         example: "Creamy espresso with frothed milk and a cocoa sprinkle."
 *                       category_id:
 *                         type: integer
 *                         example: 1
 *                       product_stock:
 *                         type: integer
 *                         example: 89
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-11T04:26:19.154Z"
 */
productRouter.patch("/setting/:uuid",authorization(['admin']), update);

/**
 * @swagger
 * /product/detail/{uuid}:
 *   get:
 *     summary: Get product details by UUID
 *     description: Retrieves detailed information about a specific product, including product details and associated images.
 *     operationId: getProductDetail
 *     tags:
 *       - Product
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: The UUID of the product to retrieve details for
 *         schema:
 *           type: string
 *           example: "edaf3e24-1351-4dca-8efb-ee5d9575b4b5"
 *     responses:
 *       200:
 *         description: Successfully fetched product details
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
 *                       product:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "edaf3e24-1351-4dca-8efb-ee5d9575b4b5"
 *                           product_name:
 *                             type: string
 *                             example: "Cappuccino Cream"
 *                           product_price:
 *                             type: integer
 *                             example: 35000
 *                           discount_price:
 *                             type: integer
 *                             nullable: true
 *                             example: null
 *                           product_description:
 *                             type: string
 *                             example: "Creamy espresso with frothed milk and a cocoa sprinkle."
 *                           product_stock:
 *                             type: integer
 *                             example: 89
 *                           category_name:
 *                             type: string
 *                             example: "Coffee"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-11-01T07:04:14.346Z"
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-11-11T04:26:19.154Z"
 *                       images:
 *                         type: object
 *                         properties:
 *                           img_1:
 *                             type: string
 *                             example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1731298966/coffeeshops/product-edaf3e24-1351-4dca-8efb-ee5d9575b4b5-imageHandler-0.png"
 *                           img_2:
 *                             type: string
 *                             example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1731298967/coffeeshops/product-edaf3e24-1351-4dca-8efb-ee5d9575b4b5-imageHandler-1.png"
 *                           img_3:
 *                             type: string
 *                             example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1731298968/coffeeshops/product-edaf3e24-1351-4dca-8efb-ee5d9575b4b5-imageHandler-2.jpg"
 */
productRouter.get("/detail/:uuid", FetchDetail)

productRouter.get("/detail-card/:uuid", FetchSingleImageDetail)

/**
 * @swagger
 * /product/delete/{uuid}:
 *   delete:
 *     summary: Delete a product by UUID
 *     description: Removes a product from the system by its UUID.
 *     operationId: deleteProduct
 *     tags:
 *       - Product
 *     parameters:
 *       - name: uuid
 *         in: path
 *         required: true
 *         description: The UUID of the product to delete
 *         schema:
 *           type: string
 *           example: "7679905d-0e40-4f4d-854b-28053ab6e14b"
 *     responses:
 *       200:
 *         description: Product successfully deleted
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
 *                   example: "Product successfully deleted"
 */
productRouter.delete("/delete/:uuid",authorization(['admin']), Delete)