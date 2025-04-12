import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import db from "./config/db.js";
import { connectDB, sequelize } from './config/db.js';
import './models/Assocication.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';
// import swaggerDocs from './config/swagger.js';
import swaggerDocs from './swagger/index.js';

import router from './routes/Routes.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Tạo thư mục `uploads/` nếu chưa có
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//test read file template
// const file = fs.readFileSync('./templates/contract_template.docx');
// JSZip.loadAsync(file)
//   .then(() => console.log('Valid zip/docx file'))
//   .catch(err => console.error('Invalid zip/docx:', err));

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/contracts', express.static(path.join(__dirname, 'upload/contract')));

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Running failed:', error);
  }
};
startServer();
app.use('/api', router);
app.use(errorHandler);
