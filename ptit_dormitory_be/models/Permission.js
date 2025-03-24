import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Permission = sequelize.define(
  'Permission',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
  },
  {
    tableName: 'permission',
    timestamps: false,
  },
);

export default Permission;
