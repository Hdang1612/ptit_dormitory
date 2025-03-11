import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/Users.js";
import Role from "../models/Roles.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export const registerService = async ({ email, password, role }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email đã được sử dụng!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    id: uuidv4(),
    email,
    password: hashedPassword,
  });
  await Role.create({id:uuidv4(), name: role, user_id: newUser.id });

  return { message: "Đăng ký thành công!" };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
    include: [{ model: Role, as: "roles" }],
  });
  if (!user) {
    throw new Error("Email không tồn tại!");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mật khẩu không đúng!");
  }

  const token = jwt.sign(
    { id: user.id, roles: user.roles.map((r) => r.name) },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user };
};
