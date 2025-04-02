import swaggerJsDoc from 'swagger-jsdoc';
const PORT = process.env.PORT || 3000;
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'PTIT_Dormitory',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    // components: {
    //   schemas: {
    //     SensorData: {
    //       type: "object",
    //       properties: {
    //         id: { type: "integer", example: 1 },
    //         temperature: { type: "number", example: 25.3 },
    //         humidity: { type: "number", example: 60 },
    //         light: { type: "number", example: 300 },
    //         timestamp: {
    //           type: "string",
    //           format: "date-time",
    //           example: "2024-03-20T14:30:00Z",
    //         },
    //       },
    //     },
    //     ActionLog: {
    //       type: "object",
    //       properties: {
    //         id: { type: "integer", example: 1 },
    //         device_id: { type: "integer", example: 101 },
    //         action: { type: "string", example: "Turn On" },
    //         timestamp: {
    //           type: "string",
    //           format: "date-time",
    //           example: "2024-03-20T14:30:00Z",
    //         },
    //       },
    //     },
    //     Device: {
    //       type: "object",
    //       properties: {
    //         id: { type: "integer", example: 1 },
    //         name: { type: "string", example: "Sensor A" },
    //         status: { type: "string", example: "active" },
    //       },
    //     },
    //   },
    // },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
