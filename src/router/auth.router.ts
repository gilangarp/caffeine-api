import { Router } from "express";
import {
  Delete,
  FetchAll,
  login,
  register,
  update,
} from "../controller/auth/auth.controller";

export const authRouter = Router();

/**
 * @swagger
 * user/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 description: User's email address
 *               user_pass:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                   example: "Register success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_email:
 *                         type: string
 *                         example: "coffee.test1@gmail.com"
 *                       id:
 *                         type: string
 *                         example: "dee94087-c7ed-4c66-a796-64583c26ddc0"
 *       400:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                  type: integer
 *                  example: 400
 *                 msg:
 *                   type: string
 *                   example: "Registration failed"
 *                 error:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: "Email already registered. Please login or use a different email."
 */
authRouter.post("/register", register);

/**
 * @swagger
 * user/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User successfully logged in
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
 *                   example: "Welcome, coffee@gmail.com!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     id:
 *                       type: string
 *                       example: "41eb3a61-bf2f-4efd-ab99-b693abaf2b7f"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Invalid email or password
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
 *                   example: "Error"
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "The email or password you entered is incorrect"
 */
authRouter.post("/login", login);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve user with pagination
 *     description: Get a list of user profiles with support for pagination.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 6
 *         description: Number of items per page (default is 6).
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number (default is 1).
 *     responses:
 *       200:
 *         description: Successfully retrieved user profiles.
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
 *                   example: "User profile successfully retrieved"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "9d633644-08e6-4471-a652-00388ed2d09e"
 *                       profile_image:
 *                         type: string
 *                         example: "https://res.cloudinary.com/drppjxoxb/image/upload/v1727346163/coffeeshops/profileDefault.jpg"
 *                       full_name:
 *                         type: string
 *                         example: "full name"
 *                       phone_number:
 *                         type: string
 *                         example: "phone number"
 *                       address:
 *                         type: string
 *                         example: "address"
 *                       user_email:
 *                         type: string
 *                         example: "coffee@gmail.com"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalData:
 *                       type: integer
 *                       example: 4
 *                     totalPage:
 *                       type: integer
 *                       example: 1
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     prevLink:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     nextLink:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *       400:
 *         description: Invalid query parameters.
 *       500:
 *         description: Internal server error.
 */
authRouter.get("/", FetchAll);

/**
 * Update User Settings (e.g., profile settings)
 * @swagger
 * /user/setting/{id}:
 *   patch:
 *     summary: Update user settings by ID
 *     description: Allows users to update their profile or settings.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *           example: "dee94087-c7ed-4c66-a796-64583c26ddc0"
 *       - in: body
 *         name: user
 *         description: User settings to update.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             user_email:
 *               type: string
 *               example: "coffee@gmail.com"
 *             user_pass: 
 *               type: string
 *               example: "admin123"
 *     responses:
 *       200:
 *         description: User settings updated successfully
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
 *                   example: "User has been upgraded"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_email:
 *                         type: string
 *                         example: "coffee.test1@gmail.com"
 *                       updated_at:
 *                         type: string
 *                         example: "2024-11-11T03:28:56.079Z"
 */
authRouter.patch("/setting/:id", update);

/**
 * Delete User by ID
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user from the system by providing the user's ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *           example: "dee94087-c7ed-4c66-a796-64583c26ddc0"
 *     responses:
 *       200:
 *         description: User successfully deleted
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
 *                   example: "User successfully deleted"
 */
authRouter.delete("/delete/:id", Delete);
