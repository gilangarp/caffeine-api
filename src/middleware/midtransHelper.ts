interface IMidtransTransaction {
  transaction_id: string;
  grossAmount: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
}

export const createMidtransTransaction = async ({
  transaction_id,
  grossAmount,
  address,
  email,
  first_name,
  last_name,
}: IMidtransTransaction) => {
  const payload = {
    transaction_details: {
      order_id: transaction_id,
      gross_amount: grossAmount,
    },
    customer_details: {
      first_name: first_name,
      last_name: last_name,
      email: email,
      address: address,
    },
    callbacks: {
      finish: `${process.env.FRONT_END_URL}/history-order`,
      error: `${process.env.FRONT_END_URL}/history-order`,
      pending: `${process.env.FRONT_END_URL}/history-order`,
    },
  };

  const authString = Buffer.from(
    `${process.env.MIDTRANS_SERVER_KEY}:`
  ).toString("base64");

  const response = await fetch(
    `${process.env.MIDTRANS_APP_URL}/snap/v1/transactions`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();
  if (!data.token || !data.redirect_url) {
    throw new Error("Midtrans error: Missing token or redirect URL.");
  }

  return data;
};
