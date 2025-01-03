import { Router } from "express";
import { authRouter } from "./auth.router";
import { profileRouter } from "./profile.router";
import { categoryRouter } from "./category.router";
import { productRouter } from "./product.router";
import { promoRouter } from "./promo.router";
import { testimonialRouter } from "./testimonial.router";
import { sizeProductRouter } from "./sizeProduct.router";
import { paymentRouter } from "./payment.router";
import { statusTransactionsRouter } from "./statusTransactions.router";
import { transactionsRouter } from "./transactions.router";
import { shippingRouter } from "./shipping.router";

const mainRouter = Router();

    mainRouter.use("/user", authRouter);
    mainRouter.use("/profile", profileRouter);
    mainRouter.use("/category", categoryRouter);
    mainRouter.use("/product", productRouter);
    mainRouter.use("/promo", promoRouter);
    mainRouter.use("/testimonial", testimonialRouter);
    mainRouter.use("/size-product", sizeProductRouter);
    mainRouter.use("/payment", paymentRouter)
    mainRouter.use("/status", statusTransactionsRouter);
    mainRouter.use("/transaction", transactionsRouter);
    mainRouter.use("/delivery", shippingRouter);

export default mainRouter;