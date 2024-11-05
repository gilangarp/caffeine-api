import { Router } from "express";
import { authRouter } from "./auth.router";
import { profileRouter } from "./profile.router";
import { categoryRouter } from "./category.router";
import { productRouter } from "./product.model";
import { promoRouter } from "./promo.router";

const mainRouter = Router();

    mainRouter.use("/user", authRouter);
    mainRouter.use("/profile", profileRouter);
    mainRouter.use("/category", categoryRouter);
    mainRouter.use("/product", productRouter);
    mainRouter.use("/promo", promoRouter);
    
export default mainRouter;