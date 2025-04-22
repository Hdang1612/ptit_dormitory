import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerJsDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'PTIT_Dormitory',
      version: '1.0.0',
      description: 'API documentation for Dormitory manage system',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, './**/*.js')], // Đảm bảo rằng các file controller có @swagger comment
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
