import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/login";

// Gửi request đăng nhập
const login = async (email, password) => {
  const response = await axios.post(API_URL, {
    email,
    password,
  });

  // Nếu có token thì lưu vào localStorage
  if (response.data?.data?.token) {
    localStorage.setItem("token", response.data.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
    localStorage.setItem("role", response.data.data.user.role_id);
  }

  return response.data;
};

// Đăng xuất
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

// Lấy token hiện tại
const getCurrentToken = () => {
  return localStorage.getItem("token");
};

// Xuất ra các hàm
export default {
  login,
  logout,
  getCurrentToken,
};
