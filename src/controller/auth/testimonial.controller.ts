import { Request, Response } from "express";
import { getLink } from "../../helper/getLink";
import {
  createData,
  getAllData,
  getTotalTestimonialData,
} from "../../repository/auth/testimonial.repository";
import { IUsersQuery } from "../../model/auth/user.model";
import {
  IDataTestimonialBody,
  ITestimonialResponse,
} from "../../model/auth/testimonial.model";

export const create = async (
  req: Request<{ id: string }, {}, IDataTestimonialBody>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const result = await createData(req.body, id);
    return res.status(201).json({
      msg: "thanks for the suggestion",
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
  req: Request<{}, {}, {}, IUsersQuery>,
  res: Response<ITestimonialResponse>
) => {
  try {
    const result = await getAllData(req.query);
    const dataUser = await getTotalTestimonialData();
    if (!dataUser) {
      return res.status(404).json({
        code: 404,
        msg: "Testimonial data not found",
        error: {
          message: "No testimonial data available",
          details: "No additional error details",
        },
      });
    }
    const page = parseInt((req.query.page as string) || "1");
    const totalData = parseInt(dataUser.rows[0].total_user);
    const totalPage = Math.ceil(totalData / parseInt(req.query.limit || "2"));
    const response = {
      msg: "success",
      data: result.rows,
      meta: {
        totalData,
        totalPage,
        page,
        prevLink: page > 1 ? getLink(req, "previous") : null,
        nextLink: page != totalPage ? getLink(req, "next") : null,
      },
    };
    res.status(200).json({
      code: 200,
      msg: "success",
      data: result.rows,
      meta: response.meta,
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
