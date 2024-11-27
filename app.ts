import * as dotenv from "dotenv";
const env = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: env });

const PORT = process.env.PORT ;

import express from 'express';
import router from "./src/router";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./src/configs/swaggerOptions";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: 'http://localhost:5173'  
}));

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);
app.listen(PORT, () => {
    console.log(`Server Is Running On PORT ${PORT}`)
});

export default app