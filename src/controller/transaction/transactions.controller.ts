import { Request, Response } from "express";
import { IHistoryDetailResponse, ITransactionQuery, ITransactionResponse, ITransactionWithDetailsBody } from "../../model/transaction/transactions.model";
import db from "../../configs/pg";
import { createData, createDataProduct, getAllData, getDetailData, getDetailDataProduct, getTotalTransaction } from "../../repository/transaction/transactions.repository";
import { getLink } from "../../helper/getLink";

export const create = async (
  req: Request<{}, {}, ITransactionWithDetailsBody>,
  res: Response<ITransactionResponse>
) => {
  try {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const orderResult = await createData(req.body, client);
      const transaction_id = orderResult.rows[0].id;

      const detailResultPromises = req.body.products.map((product) =>
        createDataProduct(transaction_id, product, client)
      );

      const detailResults = await Promise.all(detailResultPromises);

      const ordersWithDetails = orderResult.rows.map((order, index) => ({
        ...order,
        products: detailResults[index].rows,
      }));
      await client.query("COMMIT");
      return res.status(201).json({
        code:201,
        msg: "Success",
        data: ordersWithDetails,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
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
  req: Request<{ uuid: string }, {}, {}, ITransactionQuery>,
  res: Response
) => {
  try {
    const { uuid } = req.params;

    console.log("debugin id dari luar",uuid)
    const result = await getAllData(req.query, uuid);

    const dataTransaction = await getTotalTransaction(uuid);

    if (dataTransaction.rows.length === 0) {
      return res.status(404).json({
        msg: "Error",
        err: "Transaction Data Not Found",
      });
    }

    const totalData = parseInt(dataTransaction.rows[0].total_product);

    const page = parseInt((req.query.page as string) || "1");
    const limit = parseInt((req.query.limit as string) || "4");

    const totalPage = Math.ceil(totalData / limit);
    return res.status(200).json({
      msg: "success",
      data: result.rows,
      pagination: {
        totalData,
        totalPage,
        page,
        prevLink: page > 1 ? getLink(req, "previous") : null,
        nextLink: page != totalPage ? getLink(req, "next") : null,
      },
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

export const FetchDetail = async (
  req: Request,
  res: Response<IHistoryDetailResponse>
) => {
  const { uuid } = req.params;
  try {
    const infoHistory = await getDetailData(uuid);
    const productHistory = await getDetailDataProduct(uuid);

    if (!infoHistory.rows.length || !productHistory.rows.length) {
      return res.status(404).json({
        code: 404,
        msg: "No data found",
        error: { message: "The requested details do not exist." },
      });
    }

    res.status(200).json({
      code: 200,
      msg: "Success",
      data: [
        {
          info: infoHistory.rows[0],
          product: productHistory.rows,
        },
      ],
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