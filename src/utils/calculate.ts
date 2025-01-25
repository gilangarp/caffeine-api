import { ITransactionProduct } from "../model/transaction/transactions.model";

export const calculate = (data: ITransactionProduct[]) => {
  let total = 0;
  let tax = 0;
  let subtotal = 0;

  data.forEach((product) => {
    const productSubtotal = product.product_price;
    const productTax = productSubtotal * 0.05;

    subtotal += productSubtotal;
    tax += productTax;
  });

  total = subtotal + tax;

  return { total, tax, subtotal };
};
