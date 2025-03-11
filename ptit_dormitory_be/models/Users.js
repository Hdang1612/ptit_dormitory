import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Role from "./Roles.js";

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
      validate: {
        isEmail: true,
      },
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
      defaultValue: DataTypes.NOW,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    phone_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
      validate: {
        isNumeric: true,
      },
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
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
  }
);

// Một user có thể có nhiều vai trò
User.hasMany(Role, { foreignKey: "user_id", as: "roles" });


export default User;
