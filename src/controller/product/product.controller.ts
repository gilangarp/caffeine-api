import { Request, Response } from "express";
import {
  ICreateDataResponse,
  IDetailSingleImageData,
  IFetchDetailResponse,
  IProductBody,
  IProductQuery,
  IProductResponse,
  IUpdateDataResponse,
  IUpdateImageResponse,
} from "../../model/product/product.model";
import db from "../../configs/pg";
import {
  createData,
  createDataImage,
  DeleteData,
  deleteImage,
  getAllData,
  getDetailData,
  getDetailSingleImageData,
  getImgData,
  getTotalData,
  updateData,
} from "../../repository/product/product.repository";
import { cloudinaryArrayUploader } from "../../helper/cloudinary";
import { getLink } from "../../helper/getLink";

export const create = async (
  req: Request<{}, {}, IProductBody>,
  res: Response<ICreateDataResponse>
) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");
    if (!req.body) {
      return res.status(400).json({
        code: 400,
        msg: "Error",
        error: {
          message: "Body is missing",
        },
      });
    }

    const productResult = await createData(req.body);
    const product = productResult.rows[0];
    if (!product || !product.id) {
      throw new Error("Failed to create product");
    }

    const productId = product.id;
    const productName = product.product_name;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({
        code: 400,
        msg: "Error",
        error: { message: "Product images cannot be null" },
      });
    }

    const { results, errors } = await cloudinaryArrayUploader(
      req,
      `product-${productName}`
    );

    if (errors && errors.length > 0) {
      throw new Error(
        `Failed to upload images: ${errors
          .map((err) => err.message)
          .join(", ")}`
      );
    }

    const secureUrls = results?.map((result) => result.secure_url) || [];

    const imgPromises = secureUrls.map((url) =>
      createDataImage(client, productId, url)
    );
    const imgResults = await Promise.all(imgPromises);
    const imgProducts = imgResults.map((res) => res.rows[0]);

    await client.query("COMMIT");

    return res.status(201).json({
      code: 201,
      msg: "Product created successfully",
      data: [
        {
          product,
          images: imgProducts,
        },
      ],
    });
  } catch (err) {
    console.error("Error in createNewProduct:", err);
    try {
      await client.query("ROLLBACK");
    } catch (rollbackErr) {
      console.error("Rollback error:", rollbackErr);
    }

    if (err instanceof Error) {
      if (
        err.message.includes(
          'duplicate key value violates unique constraint "product_name"'
        )
      ) {
        return res.status(400).json({
          code: 400,
          msg: "Error",
          error: {
            message: "Product name already exists",
          },
        });
      }
      if (err.message.includes("No files uploaded")) {
        return res.status(400).json({
          code: 400,
          msg: "Error",
          error: {
            message: "Product images cannot be null",
          },
        });
      }
      return res.status(500).json({
        code: 500,
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

export const FetchAll = async (
  req: Request<{}, {}, {}, IProductQuery>,
  res: Response<IProductResponse>
) => {
  try {
    const result = await getAllData(req.query);
    if (!result) {
      return res.status(404).json({
        code: 404,
        msg: "Error",
        error: { message: "Data Not Found" },
      });
    }
    const dataProduct = await getTotalData(req.query);

    const page = parseInt((req.query.page as string) || "1");

    const totalData = parseInt(dataProduct.rows[0].total_product);

    const totalPage = Math.ceil(totalData / parseInt(req.query.limit || "6"));

    return res.status(200).json({
      code: 200,
      msg: "Data fetched successfully",
      data: result.rows,
      meta: {
        totalData,
        totalPage,
        page,
        prevLink: page > 1 ? getLink(req, "previous") : null,
        nextLink: page != totalPage ? getLink(req, "next") : null,
      },
    });
  } catch (err) {
    console.error("Error:", err);
    let errorMessage = "Internal Server Error";
    if (err instanceof Error) {
      errorMessage = err.message;
      if (errorMessage.includes("Sort invalid options")) {
        errorMessage =
          "Sort invalid options. Allowed options are: cheapest, priciest, a-z, z-a, latest, longest.";
      }
    }

    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: { message: errorMessage },
    });
  }
};

export const FetchDetail = async (
  req: Request,
  res: Response<IFetchDetailResponse>
) => {
  const client = await db.connect();

  try {
    const { uuid } = req.params;

    await client.query("BEGIN");

    const product = await getDetailData(uuid);
    if (!product.rows[0]) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        code: 404,
        msg: "error",
        error: {
          message: "Product does not exist",
        },
      });
    }

    const productId = product.rows[0].id;
    if (!productId) {
      await client.query("ROLLBACK");
      return res.status(500).json({
        code: 500,
        msg: "error",
        error: { message: "Product ID does not exist" },
      });
    }

    const imgProduct = await getImgData(client, productId);

    await client.query("COMMIT");

    return res.status(200).json({
      code: 200,
      msg: "Success",
      data: [
        {
          product: product.rows[0],
          images: imgProduct.rows[0],
        },
      ],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error in FetchDetail:", err);
    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: { message: "Internal Server Error" },
    });
  } finally {
    client.release();
  }
};

export const updateImage = async (
  req: Request,
  res: Response<IUpdateImageResponse>
) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const { uuid } = req.params;

    const data = await getDetailData(uuid);
    if (!data.rows[0]) {
      return res.status(404).json({
        code: 404,
        msg: "Error",
        error: { message: "Product not found" },
      });
    }

    const productId = data.rows[0].id;
    if (!productId) {
      return res.status(400).json({
        code: 400,
        msg: "Error",
        error: { message: "Invalid product ID" },
      });
    }

    await deleteImage(productId);

    const { results, errors } = await cloudinaryArrayUploader(
      req,
      `product-${productId}`
    );
    if (errors && errors.length > 0) {
      throw new Error(
        `Failed to upload images: ${errors
          .map((err) => err.message)
          .join(", ")}`
      );
    }

    const secureUrls = results?.map((result) => result.secure_url) || [];
    const imgPromises = secureUrls.map((url) =>
      createDataImage(client, productId, url)
    );

    const imgResults = await Promise.all(imgPromises);
    const imgProducts = imgResults.map((res) => res.rows[0]);

    await client.query("COMMIT");
    res.status(200).json({
      code: 200,
      msg: "Images updated successfully",
      data: imgProducts,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Error in updateImage:", error);
    res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: "An error occurred",
        details: error instanceof Error ? error.message : "Unexpected error",
      },
    });
  } finally {
    client.release();
  }
};

export const update = async (
  req: Request,
  res: Response<IUpdateDataResponse>
) => {
  const { uuid } = req.params;
  try {
    const product = await updateData(uuid, req.body);
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        code: 400,
        msg: "Error",
        error: {
          message: "Request body cannot be empty",
        },
      });
    }
    return res.status(200).json({
      code: 200,
      msg: "Success",
      data: product.rows,
    });
  } catch (err: unknown) {
    let errorMessage = "Internal Server Error";

    if (err instanceof Error) {
      errorMessage = err.message;

      if (
        errorMessage.includes(
          'duplicate key value violates unique constraint "product_name"'
        )
      ) {
        errorMessage = "Product name already exists";
        return res.status(400).json({
          code: 400,
          msg: "Error",
          error: {
            message: errorMessage,
          },
        });
      }

      if (
        errorMessage.includes(
          'null value in column "product_name" of relation "categories" violates not-null constraint'
        )
      ) {
        errorMessage = "Product name cannot be null";
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

export const Delete = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const result = await DeleteData(uuid);
    return res.status(200).json({
      msg: "Success",
      data: result,
    });
  } catch (err: unknown) {
    console.error(err);
    let errorMessage = "Internal Server Error";
    return res.status(500).json({
      code: 500,
      msg: "Error",
      err: errorMessage,
    });
  }
};

export const FetchSingleImageDetail = async (
  req: Request,
  res: Response<IDetailSingleImageData>
) => {
  const { uuid } = req.params;
  try {
    const result = await getDetailSingleImageData(uuid);
    return res.status(200).json({
      code: 200,
      msg: "Success",
      data: result.rows,
    });
  } catch (err: unknown) {
    let errorMessage = "Internal Server Error";
    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: errorMessage,
      },
    });
  }
};
