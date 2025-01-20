import { Router } from "express";
import { create, FetchAll } from "../controller/auth/testimonial.controller";
import { authorization } from "../middleware/authorization.middleware";

export const testimonialRouter = Router();

/**
 * @swagger
 * /testimonial/add/{id}:
 *   post:
 *     summary: Add a new testimonial
 *     description: Adds a new testimonial from a user for a service or product.
 *     operationId: addTestimonial
 *     tags:
 *       - Testimonial
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user submitting the testimonial.
 *         schema:
 *           type: string
 *           example: "c2c61aea-c66d-46be-8ea2-21d2d9013373"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *               - rating
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The content of the testimonial.
 *                 example: "Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!"
 *               rating:
 *                 type: integer
 *                 description: The rating given by the user (1 to 5).
 *                 example: 5
 *     responses:
 *       200:
 *         description: Testimonial successfully added
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
 *                   example: "thanks for the suggestion"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                         example: "c2c61aea-c66d-46be-8ea2-21d2d9013373"
 *                       comment:
 *                         type: string
 *                         example: "Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!"
 *                       rating:
 *                         type: integer
 *                         example: 5
 */
testimonialRouter.post("/add/:id", authorization(["user"]), create);

/**
 * @swagger
 * /testimonial:
 *   get:
 *     summary: Fetch all testimonials
 *     description: Retrieves all the testimonials submitted by users, including their comments, ratings, and user information.
 *     operationId: fetchAllTestimonials
 *     tags:
 *       - Testimonial
 *     responses:
 *       200:
 *         description: Successfully retrieved all testimonials
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
 *                       role:
 *                         type: string
 *                         example: "user"
 *                       full_name:
 *                         type: string
 *                         example: "full name"
 *                       profile_image:
 *                         type: string
 *                         format: uri
 *                         example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1730745723/coffeeshops/product-image-profile-c66d.jpg"
 *                       user_email:
 *                         type: string
 *                         example: "coffee.test@gmail.com"
 *                       id:
 *                         type: string
 *                         example: "c2c61aea-c66d-46be-8ea2-21d2d9013373"
 *                       comment:
 *                         type: string
 *                         example: "Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!"
 *                       rating:
 *                         type: integer
 *                         example: 5
 */
testimonialRouter.get("/", FetchAll);
