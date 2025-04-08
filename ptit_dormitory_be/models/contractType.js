import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const ContractType = sequelize.define(
  'ContractType',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'contract_type',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at',
  }
);

export default ContractType;
