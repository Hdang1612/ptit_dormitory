import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
const Role = sequelize.define(
  'Role',
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    role_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: 'role',
    timestamps: false,
  },
);

export default Role;
