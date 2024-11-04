import * as dotenv from "dotenv";
const env = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: env });

import express  from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Test success");
});

const PORT = process.env.PORT ;

app.listen(PORT, () => {
    console.log(`Server Is Running On PORT http://localhost:${PORT}`)
});

export default app