import { Request, Response } from "express";
import {
  IDataResponse,
  ISizeProductBody,
} from "../../model/transaction/sizeProduct.model";
import {
  createData,
  deleteData,
  getAllData,
  updateData,
} from "../../repository/transaction/sizeProduct.repository";
import { IDelateResponse } from "../../model/auth/user.model";

export const create = async (
  req: Request<{}, {}, ISizeProductBody>,
  res: Response
) => {
  try {
    const result = await createData(req.body);
    if (!result) {
      return res.status(404).json({
        msg: "Error",
        err: "Data Not Found",
      });
    }
    return res.status(201).json({
      code: 201,
      msg: "success",
      data: result.rows,
    });
  } catch (err: unknown) {
    console.error("Error in updateImage:", err);
    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: err,
      },
    });
  }
};

export const FetchAll = async (req: Request, res: Response<IDataResponse>) => {
  try {
    const result = await getAllData();
    return res.status(200).json({
      code: 200,
      msg: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error details:", error);
    if (error instanceof Error) {
      return res.status(500).json({
        code: 500,
        msg: error.message,
        error: {
          message: error.message,
          details: error.stack || "No additional error details",
        },
      });
    } else {
      return res.status(500).json({
        code: 500,
        msg: "Internal Server Error",
        error: {
          message: "Unknown error occurred",
          details: "No additional error details",
        },
      });
    }
  }
};

export const update = async (req: Request, res: Response<IDataResponse>) => {
  const { id } = req.params;
  try {
    const result = await updateData(id, req.body);
    return res.status(200).json({
      code: 200,
      msg: "success",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error details:", error);
    if (error instanceof Error) {
      return res.status(500).json({
        code: 500,
        msg: error.message,
        error: {
          message: error.message,
          details: error.stack || "No additional error details",
        },
      });
    } else {
      return res.status(500).json({
        code: 500,
        msg: "Internal Server Error",
        error: {
          message: "Unknown error occurred",
          details: "No additional error details",
        },
      });
    }
  }
};

export const Delete = async (req: Request, res: Response<IDelateResponse>) => {
  const { id } = req.params;
  try {
    const result = await deleteData(id);
    return res.status(200).json({
      code: 200,
      msg: result,
    });
  } catch (error) {
    console.error("Error details:", error);
    if (error instanceof Error) {
      return res.status(500).json({
        code: 500,
        msg: error.message,
        error: {
          message: error.message,
          details: error.stack || "No additional error details",
        },
      });
    } else {
      return res.status(500).json({
        code: 500,
        msg: "Internal Server Error",
        error: {
          message: "Unknown error occurred",
          details: "No additional error details",
        },
      });
    }
  }
};
