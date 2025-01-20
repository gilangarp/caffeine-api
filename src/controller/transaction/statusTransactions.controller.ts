import { Request, Response } from "express";
import {
  IStatusTransactionBody,
  IStatusTransactionResponse,
} from "../../model/transaction/statusTransactions.model";
import {
  createData,
  deleteData,
  getData,
  updateData,
} from "../../repository/transaction/statusTransactions.repository";
import { IDelateResponse } from "../../model/auth/user.model";

export const create = async (
  req: Request<{}, {}, IStatusTransactionBody>,
  res: Response<IStatusTransactionResponse>
) => {
  try {
    const result = await createData(req.body);
    return res.status(201).json({
      code: 201,
      msg: "success",
      data: result.rows,
    });
  } catch (err: unknown) {
    let errorMessage = "Internal Server Error";
    if (err instanceof Error) {
      errorMessage = err.message;
      if (
        errorMessage.includes(
          'duplicate key value violates unique constraint "unique_status"'
        )
      ) {
        errorMessage = "Duplicate status transaction name";
        return res.status(400).json({
          code: 400,
          msg: "Error",
          error: {
            message: errorMessage,
          },
        });
      }
    }
    if (err instanceof Error) {
      return res.status(500).json({
        code: 500,
        msg: err.message,
        error: {
          message: err.message,
          details: err.stack || "No additional error details",
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

export const FetchAll = async (
  req: Request,
  res: Response<IStatusTransactionResponse>
) => {
  try {
    const result = await getData();
    return res.status(201).json({
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

export const update = async (
  req: Request,
  res: Response<IStatusTransactionResponse>
) => {
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
