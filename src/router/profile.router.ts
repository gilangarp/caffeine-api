import { Router } from "express";
import { FetchDetail, Update } from "../controller/auth/profile.controller";
import { singleCloudUploader } from "../middleware/upload";

export const profileRouter = Router();

/**
 * @swagger
 * /profile/setting/{id}:
 *   patch:
 *     summary: Update user profile
 *     description: Update a user's profile including name, phone number, address, and profile image.
 *     tags:
 *       - Profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *           example: "dee94087-c7ed-4c66-a796-64583c26ddc0"
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               address:
 *                 type: string
 *               profile:
 *                 type: string
 *                 format: uri
 *     responses:
 *       200:
 *         description: Profile updated successfully
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
 *                   example: "User profile successfully updated"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       full_name:
 *                         type: string
 *                         example: "admin"
 *                       phone_number:
 *                         type: string
 *                         example: "085789132404"
 *                       address:
 *                         type: string
 *                         example: "jl. sumber harjo"
 *                       profile_image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/drppjxoxb/image/upload/v1727346163/coffeeshops/profileDefault.jpg"
 *       400:
 *         description: Bad request - invalid file type or data
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
 *                   example: "MulterError"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Only JPG, PNG, or JPEG files are allowed."
 */
profileRouter.patch("/setting/:id", singleCloudUploader("profile") , Update )

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Retrieve user profile by ID
 *     description: Get the profile information of a specific user by their ID.
 *     operationId: getUserProfile
 *     tags:
 *       - Profile
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user whose profile is being fetched
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile successfully retrieved
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
 *                       full_name:
 *                         type: string
 *                         example: "full name"
 *                       phone_number:
 *                         type: string
 *                         example: "phone number"
 *                       address:
 *                         type: string
 *                         example: "jl. sumber harjo"
 *                       profile_image:
 *                         type: string
 *                         format: uri
 *                         example: "https://res.cloudinary.com/dxqmdtibz/image/upload/v1730745723/coffeeshops/product-image-profile-c66d.jpg"
 *                       user_email:
 *                         type: string
 *                         example: "coffee.test@gmail.com"
 *                       created_at:
 *                         type: string
 *                         format: date
 *                         example: "04 November 2024"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 msg:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 msg:
 *                   type: string
 *                   example: "Internal server error"
 */
profileRouter.get("/:id", FetchDetail)