import { registerService, loginService } from "../services/authServices.js";

export const register = async (req, res) => {
  try {
    const response = await registerService(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const response = await loginService(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
