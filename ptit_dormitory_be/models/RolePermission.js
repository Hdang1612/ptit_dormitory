import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const RolePermission = sequelize.define(
  'RolePermission',
  {
    role_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: 'role_permission',
    timestamps: false,
  },
);

export default RolePermission;
