import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER_NAME;
const DB_PASSWORD = process.env.DB_USER_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
});
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' DB Connected ! ');
  } catch (error) {
    console.error('Error', error);
  }
};

export { sequelize, connectDB };

// const db = await mysql.createPool({
//   host: MYSQL_HOST,
//   user: MYSQL_USER,
//   password: MYSQL_PASSWORD,
//   port: PORT,
//   database: "defaultdb",
//   timezone: "+07:00",
// });

// export default db;
