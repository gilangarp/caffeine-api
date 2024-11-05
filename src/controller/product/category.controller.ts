import { Request, Response } from "express";
import {
  ICategoriesResponse,
  IDelateResponse,
} from "../../model/product/category.model";
import {
  checkIfCategoryExists,
  createData,
  deleteData,
  getAllData,
  updateData,
} from "../../repository/product/category.repository";

export const create = async (
  req: Request,
  res: Response<ICategoriesResponse>
) => {
  try {
    const result = await createData(req.body);
    return res.status(200).json({
      code: 200,
      msg: "success",
      data: result.rows,
    });
  } catch (err) {
    let errorMessage = "Internal Server Error";
    if (err instanceof Error) {
      errorMessage = err.message;

      if (
        errorMessage.includes(
          'null value in column "categorie_name" of relation "categories" violates not-null constraint'
        )
      ) {
        errorMessage = "Category name cannot be null";
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
          'duplicate key value violates unique constraint "unique_categorie_name"'
        )
      ) {
        errorMessage = "Category name already exists";
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
          'duplicate key value violates unique constraint "unique_delivery_method"'
        )
      ) {
        errorMessage = "Category name is the same, no need to change";
        return res.status(400).json({
          code: 400,
          msg: "Error",
          error: {
            message: errorMessage,
          },
        });
      }
    }
    console.error(errorMessage);
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
  res: Response<ICategoriesResponse>
) => {
  try {
    const result = await getAllData();
    return res.status(200).json({
      code: 200,
      msg: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error(err instanceof Error ? err.message : "Unknown error");
    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: err instanceof Error ? err.message : "Unknown error",
      },
    });
  }
};

export const update = async (
  req: Request,
  res: Response<ICategoriesResponse>
) => {
  const { id } = req.params;
  try {
    const categoryExists = await checkIfCategoryExists(id);
    if (!categoryExists) {
      return res.status(404).json({
        code: 404,
        msg: "Category ID not found",
      });
    }
    const result = await updateData(id, req.body);
    return res.status(200).json({
      code: 200,
      msg: "success",
      data: result.rows,
    });
  } catch (err) {
    let errorMessage = "Internal Server Error";
    if (err instanceof Error) {
      errorMessage = err.message;
      if (
        errorMessage.includes(
          'null value in column "categorie_name" of relation "categories" violates not-null constraint'
        )
      ) {
        errorMessage = "Category name cannot be null";
        return res.status(400).json({
          code: 400,
          msg: "Error",
          error: {
            message: errorMessage,
          },
        });
      }
    }
    console.error(errorMessage);
    return res.status(500).json({
      code: 500,
      msg: "Error",
      error: {
        message: errorMessage,
      },
    });
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
  } catch (err: unknown) {
    console.error(err);
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
