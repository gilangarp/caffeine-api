import * as dotenv from "dotenv";
const env = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: env });

const PORT = process.env.PORT ;

import express from 'express';
import router from "./src/router";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./src/configs/swaggerOptions";
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);
app.listen(PORT, () => {
    console.log(`Server Is Running On PORT http://localhost:${PORT}`)
});

export default app