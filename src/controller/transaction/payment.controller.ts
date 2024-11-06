import { Request, Response } from "express";
import {
  checkIfPaymentMethodExists,
  createData,
  getAllData,
  updateData,
} from "../../repository/transaction/payment.repository";
import { IPaymentMethodResponse } from "../../model/transaction/payments.model";

export const create = async (
  req: Request,
  res: Response<IPaymentMethodResponse>
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
          'null value in column "payment_method" of relation "payments" violates not-null constraint'
        )
      ) {
        errorMessage = "payment method cannot be null";
        return res.status(400).json({
          code: 400,
          msg: "Error",
          error: {
            message: errorMessage,
          },
        });
      } else if (
        errorMessage.includes(
          'duplicate key value violates unique constraint "unique_payment_method"'
        )
      ) {
        errorMessage = "Duplicate payment method name";
        return res.status(400).json({
          code: 400,
          msg: "Error",
          error: {
            message: errorMessage,
          },
        });
      }
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

export const FetchAll = async (
  req: Request,
  res: Response<IPaymentMethodResponse>
) => {
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
  res: Response<IPaymentMethodResponse>
) => {
  const { id } = req.params;
  try {
    const PaymentMethod = await checkIfPaymentMethodExists(id);
    if (!PaymentMethod) {
      return res.status(404).json({
        code: 404,
        msg: "Payment method ID not found",
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
          'duplicate key value violates unique constraint "unique_payment_method"'
        )
      ) {
        errorMessage = "Payment methods are the same, no need to change";
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
