import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { ROLES } from "../utils/admin_role.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    qr_code: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("1", "2", "3", "4"),
      allowNull: false,
      defaultValue: "4",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
  }
);

export default User;
