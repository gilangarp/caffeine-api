import { ITransactionProduct } from "../model/transaction/transactions.model";
import { getDetailProductData } from "../repository/product/product.repository";

export const processProductDetails = async (
  products: ITransactionProduct[]
): Promise<ITransactionProduct[]> => {
  const processedProducts = await Promise.all(
    products.map(async (data) => {
      try {
        const result = await getDetailProductData(data.product_id);

        if (result.rows[0].id !== data.product_id) {
          return null;
        }

        if (result && result.rows.length > 0) {
          const product = result.rows[0];
          const basePrice =
            product.discount_price !== null &&
            product.discount_price !== undefined
              ? product.discount_price
              : product.product_price !== undefined
              ? product.product_price
              : 0;

          let additionalPrice = 0;
          if (data.size_id === 2 || data.size_id === 3) {
            additionalPrice = 5000;
          }

          return {
            product_id: data.product_id,
            size_id: data.size_id,
            fd_option_id: data.fd_option_id,
            product_name: product.product_name,
            product_price: Number(basePrice) + additionalPrice,
          };
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    })
  );

  return processedProducts.filter(
    (detail): detail is ITransactionProduct => detail !== null
  );
};
