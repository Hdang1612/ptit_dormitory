// services/userService.js
import { userApi } from "./axiosInstance";

// Lấy danh sách người dùng (có thể search, phân trang, lọc theo role)
export const fetchUsers = async ({
  search,
  page = 1,
  limit = 10,
  role,
} = {}) => {
  try {
    const response = await userApi.get("/fetch", {
      params: { search, page, limit, role },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
  try {
    const response = await userApi.get(`/fetch/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Tạo tài khoản người dùng mới
export const createUser = async (data) => {
  try {
    const response = await userApi.post("/create", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Cập nhật người dùng theo ID
export const updateUser = async (id, data) => {
  try {
    const response = await userApi.put(`/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Xóa người dùng theo ID
export const deleteUser = async (id) => {
  try {
    const response = await userApi.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Import sinh viên Việt Nam từ file Excel
export const importVietnameseStudents = async (file, area) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await userApi.post(`/importVn?area=${area}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Import sinh viên quốc tế từ file Excel
export const importForeignStudents = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await userApi.post("/importForeign", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
