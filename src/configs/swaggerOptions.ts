import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CAFFEINE-API",
      version: "1.0.0",
      description: "Dokumentasi API menggunakan Swagger dan Express",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
      {
        url: "https://caffeine-api-pi.vercel.app",
        description: "Production server",
      },
    ],
  },
  apis: ["./src/router/**/*.ts"],
};

export default swaggerOptions;
