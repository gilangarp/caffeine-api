import { Request, Response } from "express";
import {
  IDataUpdateProfileResponse,
  IDetailDataResponse,
} from "../../model/auth/profile.model";
import { cloudinarySingleUploader } from "../../helper/cloudinary";
import {
  getDetailData,
  updateData,
} from "../../repository/auth/profile.repository";

export const Update = async (
  req: Request,
  res: Response<IDataUpdateProfileResponse>
) => {
  try {
    const { file } = req;
    const { id } = req.params;
    let profileImage: string | undefined;

    if (file) {
      const profileID = id.split("-")[1];
      const { result, error } = await cloudinarySingleUploader(
        req,
        "product-image",
        profileID
      );
      if (error) {
        throw new Error(error.message);
      }
      if (!result?.secure_url) {
        throw new Error("Failed to upload image");
      }
      profileImage = result.secure_url;
    }

    const result = await updateData(id, req.body, profileImage);
    if (!result || result.rowCount === 0) {
      return res.status(404).json({
        code: 404,
        msg: "error",
        error: {
          message: "Data not found",
        },
      });
    }

    res.status(200).json({
      code: 200,
      msg: "success",
      data: [result.rows[0]],
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    if (
      error instanceof Error &&
      error.message.includes(
        'duplicate key value violates unique constraint "unique_phone_number"'
      )
    ) {
      return res.status(409).json({
        code: 409,
        msg: "error",
        error: {
          message: "Phone number already exists",
        },
      });
    }

    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: errorMessage,
      },
    });
  }
};

export const FetchDetail = async (
  req: Request,
  res: Response<IDetailDataResponse>
) => {
  const { id } = req.params;

  try {
    const result = await getDetailData(id);
    if (!result.rows.length) {
      return res.status(404).json({
        code: 404,
        msg: "Data not found",
        error: {
          message: "No details found for the given ID",
        },
      });
    }

    return res.status(200).json({
      code: 200,
      msg: "Success",
      data: result.rows,
    });
  } catch (err: unknown) {
    console.error("FetchDetail error:", err);

    let errorMessage = "Internal Server Error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: errorMessage,
      },
    });
  }
};
