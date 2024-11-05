import { Router } from "express";
import { authRouter } from "./auth.router";
import { profileRouter } from "./profile.router";
import { categoryRouter } from "./category.router";
import { productRouter } from "./product.model";

const mainRouter = Router();

    mainRouter.use("/user", authRouter);
    mainRouter.use("/profile", profileRouter);
    mainRouter.use("/category", categoryRouter);
    mainRouter.use("/product", productRouter);
    
export default mainRouter;