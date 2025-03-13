import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import db from "./config/db.js";
import { connectDB, sequelize } from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

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
    console.error("Running failed:", error);
  }
};
startServer();
app.use("/api/auth", authRoutes);
app.use(errorHandler);