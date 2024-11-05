import { Router } from "express";
import { create, FetchAll } from "../controller/auth/testimonial.controller";

export const testimonialRouter = Router()

testimonialRouter.post("/add/:id", create);
testimonialRouter.get("/", FetchAll);