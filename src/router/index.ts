import { Router } from "express";
import { authRouter } from "./auth.router";
import { profileRouter } from "./profile.router";
import { categoryRouter } from "./category.router";

const mainRouter = Router();

    mainRouter.use("/user", authRouter);
    mainRouter.use("/profile", profileRouter)
    mainRouter.use("/category", categoryRouter)
    
export default mainRouter;