import { Request, Response } from "express";
import {
  checkIfDeliveryExists,
  createData,
  deleteData,
  getAllData,
  updateData,
} from "../../repository/transaction/shipping.repository";
import {
  IDataDeliveryResponse,
  IDeliveryBody,
} from "../../model/transaction/shipping.model";
import { IDelateResponse } from "../../model/auth/user.model";

export const create = async (
  req: Request<{}, {}, IDeliveryBody>,
  res: Response<IDataDeliveryResponse>
) => {
  try {
    const result = await createData(req.body);
    if (!result) {
      return res.status(404).json({
        code: 400,
        msg: "Error",
        error: {
          message: "Data Not Found",
        },
      });
    }
    return res.status(201).json({
      code: 2001,
      msg: "success",
      data: result.rows,
    });
  } catch (err: unknown) {
    let errorMessage = "Internal Server Error";
    if (err instanceof Error) {
      errorMessage = err.message;
      if (
        errorMessage.includes(
          'null value in column "delivery_method" of relation "delivery" violates not-null constraint'
        )
      ) {
        errorMessage = "delivery method cannot be null";
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
  res: Response<IDataDeliveryResponse>
) => {
  const { id } = req.params;
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

export const update = async (
  req: Request,
  res: Response<IDataDeliveryResponse>
) => {
  const { id } = req.params;
  try {
    const deliveryExists = await checkIfDeliveryExists(id);
    console.log(id);
    if (!deliveryExists) {
      return res.status(404).json({
        code: 404,
        msg: "error",
        error: {
          message: "Shipping ID not found",
        },
      });
    }
    const result = await updateData(id, req.body);
    return res.status(200).json({
      code: 200,
      msg: "success",
      data: result.rows,
    });
  } catch (err: unknown) {
    let errorMessage = "Internal Server Error";
    if (err instanceof Error) {
      errorMessage = err.message;
      if (
        errorMessage.includes(
          'duplicate key value violates unique constraint "unique_delivery_method"'
        )
      ) {
        errorMessage = "Delivery method are the same, no need to change";
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
