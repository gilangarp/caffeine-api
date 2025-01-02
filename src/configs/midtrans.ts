interface MidtransConfig {
  serverKey: string | undefined;
  frontEndUrl: string | undefined;
}

const midtransConfig: MidtransConfig = {
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  frontEndUrl: process.env.FRONT_END_URL,
};

export default midtransConfig;
