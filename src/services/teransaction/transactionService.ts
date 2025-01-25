import { createMidtransTransaction } from "../../helper/midtrans.helper";
import { IUserDataMidtrans } from "../../model/transaction/transactions.model";

export const handleMidtransTransaction = async (
  transaction_id: string,
  grossAmount: number,
  userData: IUserDataMidtrans
) => {
  if (userData.payment_type !== "Cash") {
    const midtransResponse = await createMidtransTransaction({
      transaction_id,
      grossAmount,
      ...userData,
    });

    if (!midtransResponse) {
      return null;
    }

    return {
      id: transaction_id,
      token: midtransResponse.token,
      payment_method: "Midtrans",
      redirect_url: midtransResponse.redirect_url,
    };
  }
  return {
    id: transaction_id,
    payment_method: "Cash",
  };
};
