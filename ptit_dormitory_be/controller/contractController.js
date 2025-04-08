import {
  getContractsService,
  // getContractByIdService,
  createContractService,
  updateContractService,
  // deleteContractService,
  fillContractService,
  // generateContractFile,
  generateRegistrationFormFileService,
} from '../services/contractService.js';

// Lấy danh sách hợp đồng
export const getContractlist = async (req, res) => {
  try {
    const contracts = await getContractsService(req.query);
    res.status(200).json({
      success: true,
      data: contracts,
    });
  } catch (error) {
    console.error('getContracts error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi lấy danh sách hợp đồng',
    });
  }
};

// // Lấy chi tiết hợp đồng
// export const getContractById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const contract = await getContractByIdService(id);
//     res.status(200).json({
//       success: true,
//       data: contract,
//     });
//   } catch (error) {
//     console.error('getContractById error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Lỗi khi lấy chi tiết hợp đồng',
//     });
//   }
// };

// Tạo hợp đồng mới
export const createContract = async (req, res) => {
  try {
    const contractData = req.body;

    const newContract = await createContractService(contractData);

    res.status(201).json({
      success: true,
      message: 'Tạo hợp đồng thành công',
      data: {
        ...newContract.dataValues,
        file_url: `${req.protocol}://${req.get('host')}${
          newContract.file_path
        }`,
      },
    });
  } catch (error) {
    console.error('createContract error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Lỗi khi tạo hợp đồng',
    });
  }
};

// // Cập nhật hợp đồng
export const updateContract = async (req, res) => {
  try {
    console.log('....', req.params);
    const updated = await updateContractService(req.params.studentId, req.body);
    res.json({
      success: true,
      message: 'Cập nhật hợp đồng thành công',
      data: updated,
    });
  } catch (err) {
    console.error('updateContract error:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Lỗi khi cập nhật hợp đồng',
    });
  }
};

// // Xóa hợp đồng
// export const deleteContract = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await deleteContractService(id);
//     res.status(200).json({
//       success: true,
//       message: 'Xóa hợp đồng thành công',
//     });
//   } catch (error) {
//     console.error('deleteContract error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Lỗi khi xóa hợp đồng',
//     });
//   }
// };

// Lấy thông tin điền hợp đồng
export const fillContract = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await fillContractService(studentId);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('fillContract error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi lấy thông tin điền hợp đồng',
    });
  }
};

// // Tạo file Word từ hợp đồng
// export const generateContractDoc = async (req, res) => {
//   try {
//     const { contractId } = req.params;
//     const result = await generateContractFile(contractId);

//     res.status(200).json({
//       success: true,
//       message: 'Tạo file hợp đồng thành công',
//       data: {
//         filePath: result.filePath,
//         fileName: result.fileName,
//       },
//     });
//   } catch (error) {
//     console.error('generateContractDoc error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Lỗi khi tạo file hợp đồng',
//     });
//   }
// };

// Tạo file docx đăng ký
export const printRegistrationForm = async (req, res) => {
  try {
    const buffer = await generateRegistrationFormFileService(req.body);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=don_dang_ky_ktx.docx',
    );
    res.end(buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
