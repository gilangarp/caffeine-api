import { Request, Response } from "express";
import {
  IDataPromoResponse,
  IPromoBody,
} from "../../model/product/promo.model";
import {
  createData,
  DeleteData,
  getAllData,
} from "../../repository/product/promo.repository";

export const create = async (
  req: Request<{ id: string }, {}, IPromoBody>,
  res: Response<IDataPromoResponse>
) => {
  const { id } = req.params;
  try {
    const result = await createData(req.body, id);
    return res.status(201).json({
      code: 201,
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

export const FetchAll = async (
  req: Request,
  res: Response<IDataPromoResponse>
) => {
  try {
    const result = await getAllData();
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

export const Delete = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const result = await DeleteData(id);
    return res.status(200).json({
      code: 200,
      msg: "Success",
      data: result,
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
