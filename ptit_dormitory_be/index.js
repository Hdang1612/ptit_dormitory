import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import db from "./config/db.js";
import { connectDB, sequelize } from './config/db.js';
import './models/Assocication.js';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

import router from './routes/Routes.js';
import fs from 'fs';

// Tạo thư mục `uploads/` nếu chưa có
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

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
