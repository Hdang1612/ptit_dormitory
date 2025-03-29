import {
  updateUserService,
  getListUserService,
  createUserService,
  deleteUserService,
  getUserByIdService,
  importUsersFromExcel,
} from '../services/userServices.js';

export const getUsersList = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';
    const data = await getListUserService(search, page, limit);

    res.status(200).json({
      success: true,
      data: data.users,
      pagination: data.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Tạo user mới
export const createUser = async (req, res, next) => {
  try {
    const newUser = await createUserService(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const result = await updateUserService(userId, updateData);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteUserService(id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

//import sinh viên lào
export const importUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'upload Excel file !!!' });
    }

    const result = await importUsersFromExcel(req.file.path);

    res.status(200).json({
      success: true,
      message: 'Import successful',
      inserted: result.inserted,
      updated: result.updated,
    });
  } catch (error) {
    next(error);
  }
};
