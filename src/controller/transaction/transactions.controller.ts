import { Request, Response } from "express";
import {
  IHistoryDetailResponse,
  ITransactionQuery,
  ITransactionResponse,
  ITransactionWithDetailsBody,
  IUpdateStatusOnMidtransBody,
} from "../../model/transaction/transactions.model";
import db from "../../configs/pg";
import {
  createData,
  createDataProduct,
  getAllData,
  getBytransactionById,
  getDetailData,
  getDetailDataProduct,
  getTotalTransaction,
  updateTransactionsStatus,
} from "../../repository/transaction/transactions.repository";
import { getLink } from "../../helper/getLink";
import { createMidtransTransaction } from "../../middleware/midtransHelper";
import crypto from "crypto";
import midtransConfig from "../../configs/midtrans";

export const create = async (
  req: Request<{}, {}, ITransactionWithDetailsBody>,
  res: Response<ITransactionResponse>
) => {
  try {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      if (!req.body.products || req.body.products.length === 0) {
        return res.status(400).json({
          code: 400,
          msg: "Product not found in request",
        });
      }

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

      const grossAmount = req.body.grand_total;
      let midtransResponse = null;
      let responseData = null;

      if (req.body.payments_id !== 1) {
        const products = req.body.products.map((product) => ({
          name: product.product_name,
          price: product.product_price,
          quantity: product.quantity || 1,
        }));

        midtransResponse = await createMidtransTransaction({
          transaction_id,
          grossAmount,
          full_name: req.body.full_name,
          address: req.body.address,
          user_email: req.body.user_email,
          products,
        });

        responseData = {
          id: transaction_id,
          token: midtransResponse.token,
          payment_method: "Midtrans",
          redirect_url: midtransResponse.redirect_url,
        };
      } else {
        responseData = {
          id: transaction_id,
          payment_method: "Cash",
        };
      }

      await client.query("COMMIT");

      return res.status(201).json({
        code: 201,
        msg: "Success",
        data: [responseData],
      });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Error processing transaction:", err);
      throw err; // rethrow the error to be caught in the outer try-catch
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

export const UpdateStatusOnMidtransResponse = async (
  req: Request<{}, {}, IUpdateStatusOnMidtransBody>,
  res: Response
) => {
  const { transaction_id, status, grand_total, data } = req.body;

  const hash = crypto
    .createHash("sha512")
    .update(
      `${transaction_id}${status}${grand_total}${midtransConfig.serverKey}`
    )
    .digest("hex");

  if (data.signature_key !== hash) {
    return res.status(400).json({
      code: 400,
      msg: "Error",
      error: {
        message: "Invalid signature key",
        details:
          "The provided signature_key does not match the calculated hash.",
      },
    });
  }

  try {
    let transactionStatus = data.transaction_status;
    let fraudStatus = data.fraud_status;
    switch (transactionStatus) {
      case "capture":
        if (fraudStatus === "accept") {
          const transaction = await updateTransactionsStatus(
            transaction_id,
            3,
            data.payment_type
          );
          return res.status(200).json({
            code: 200,
            msg: "Transaction captured",
            data: transaction,
          });
        }
        break;
      case "settlement":
        const settlementTransaction = await updateTransactionsStatus(
          transaction_id,
          3,
          data.payment_type
        );
        return res.status(200).json({
          code: 200,
          msg: "Transaction settled",
          data: settlementTransaction,
        });
      case "cancel":
      case "deny":
      case "expire":
        const canceledTransaction = await updateTransactionsStatus(
          transaction_id,
          2
        );
        return res.status(200).json({
          code: 200,
          msg: "Transaction canceled",
          data: canceledTransaction,
        });
      case "pending":
        const pendingTransaction = await updateTransactionsStatus(
          transaction_id,
          1
        );
        return res.status(200).json({
          code: 200,
          msg: "Transaction pending",
          data: pendingTransaction,
        });
      default:
        return res.status(400).json({
          code: 400,
          msg: "Invalid transaction status",
          error: { message: "Unknown transaction status" },
        });
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

export const TrxNotif = async (
  req: Request<{}, {}, IUpdateStatusOnMidtransBody>,
  res: Response
) => {
  const { transaction_id, data } = req.body;

  if (transaction_id && data) {
    try {
      const response = await getBytransactionById(transaction_id);
      if (response) {
        const result = await UpdateStatusOnMidtransResponse(req, res);
        console.log("Result:", result);
      }
    } catch (error) {
      console.error("Error in TrxNotif:", error);
    }
  }

  return res.status(200).json({
    code: 200,
    msg: "Success",
  });
};
