import { Request, Response } from "express";
import {
  IRegisterResponse,
  IUserRegisterBody,
} from "../../model/auth/user.model";
import db from "../../configs/pg";
import { createData } from "../../repository/auth/user.repository";
import sendMail from "../../helper/nodemailer";
import { IProfileBody } from "../../model/auth/profile.model";
import { createDataProfile } from "../../repository/auth/profile.repository";
import bcrypt from "bcrypt";
import { IAuthResponse, IUserLoginBody } from "../../model/auth/auth.model";
import { GetByEmail } from "../../repository/auth/auth.repository";
import { IPayload } from "../../model/auth/payload.model";
import jwt from 'jsonwebtoken'
import { jwtOptions } from "../../middleware/authorization.middleware";

export const register = async (
  req: Request<{}, {}, IUserRegisterBody>,
  res: Response<IRegisterResponse>
): Promise<Response<IRegisterResponse>> => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    const { user_pass, user_email } = req.body;

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(user_email)) {
      return res.status(400).json({
        code: 400,
        msg: "Registration failed",
        error: {
          message: "Email must end with @gmail.com.",
        },
      });
    }

    if (user_pass.length < 6) {
      return res.status(400).json({
        code: 400,
        msg: "Registration failed",
        error: {
          message: "Password must be at least 6 characters long.",
        },
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user_pass, salt);

    const createUserResult = await createData(
      hashedPassword,
      user_email,
      client
    );
    const userId = createUserResult.rows[0]?.id;

    if (!userId) {
      throw new Error("User ID not found in result");
    }

    const emailSent = await sendMail(user_email);
    if (!emailSent) {
      await client.query("ROLLBACK");
      return res.status(500).json({
        code: 500,
        msg: "Error",
        error: {
          message: "Failed to send email",
        },
      });
    }

    const defaultProfile: IProfileBody = {
      full_name: "full name",
      phone_number: "phone number",
      address: "address",
      profile_image:
        "https://res.cloudinary.com/drppjxoxb/image/upload/v1727346163/coffeeshops/profileDefault.jpg",
    };

    await createDataProfile(userId, defaultProfile, client);

    await client.query("COMMIT");

    return res.status(201).json({
      code: 201,
      msg: "Register success",
      data: createUserResult.rows,
    });
  } catch (err) {
    await client.query("ROLLBACK");

    if (err instanceof Error) {
      if (
        err.message.includes(
          'duplicate key value violates unique constraint "users_user_email_key"'
        )
      ) {
        return res.status(409).json({
          code: 409,
          msg: "Registration failed",
          error: {
            message:
              "Email already registered. Please login or use a different email.",
          },
        });
      }

      if (/(invalid(.)+id(.)+)/g.test(err.message)) {
        return res.status(401).json({
          code: 401,
          msg: "Error",
          error: {
            message: "User not found",
          },
        });
      }

      return res.status(400).json({
        code: 400,
        msg: "Error",
        error: {
          message: err.message,
        },
      });
    }

    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: "Internal Server Error",
      },
    });
  } finally {
    client.release();
  }
};

export const login = async (
  req: Request<{}, {}, IUserLoginBody>,
  res: Response<IAuthResponse>
) => {
  const { user_email, user_pass } = req.body;
  try {
    const result = await GetByEmail(user_email);

    if (!result.rows.length)
      throw new Error("The email you entered is incorrect");

    const { user_pass: hash, id, role } = result.rows[0];

    const isPwdValid = await bcrypt.compare(user_pass, hash);
    if (!isPwdValid) throw new Error("The password you entered is incorrect");

    const payload: IPayload = {
      user_email: user_email,
      role: role,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      jwtOptions
    );

    return res.status(200).json({
      code: 200,
      msg: `Welcome, ${user_email}!`,
      data: [{ token, id, role }],
    });
  } catch (error) {
    if (error instanceof Error) {
      if (/(invalid(.)+id(.)+)/g.test(error.message)) {
        return res.status(401).json({
          code: 401,
          msg: "Error",
          error: {
            message: "User not found",
          },
        });
      }

      return res.status(401).json({
        code: 401,
        msg: "Error",
        error: {
          message: error.message,
        },
      });
    }

    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: "Internal Server Error",
      },
    });
  }
};
