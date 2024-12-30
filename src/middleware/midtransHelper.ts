interface IMidtransTransaction {
  transaction_id: string;
  grossAmount: number;
  full_name: string;
  address: string;
  user_email: string;
  products: { name: string; price: number; quantity: number }[];
}

export const createMidtransTransaction = async ({
  transaction_id,
  grossAmount,
  full_name,
  address,
  user_email,
  products,
}: IMidtransTransaction) => {
  const payload = {
    transaction_details: {
      order_id: transaction_id,
      gross_amount: grossAmount,
    },
    items: products.map((product) => ({
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1,
    })),
    customer_details: {
      full_name: full_name,
      address: address,
      email: user_email,
    },
    callbacks: {
      finish: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
      error: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
      pending: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
    },
  };

  console.log(products[0].name, products[0].price);
  const authString = Buffer.from(
    `${process.env.MIDTRANS_SERVER_KEY}:`
  ).toString("base64");

  const response = await fetch(
    "https://app.sandbox.midtrans.com/snap/v1/transactions",
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
