import { Router } from "express";
import { FetchDetail, Update } from "../controller/auth/profile.controller";
import { singleCloudUploader } from "../middleware/upload";

export const profileRouter = Router();

profileRouter.patch("/setting/:id", singleCloudUploader("profile") , Update )
profileRouter.get("/:id", FetchDetail)