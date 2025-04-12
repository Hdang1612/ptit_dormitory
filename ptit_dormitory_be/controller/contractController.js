import {
  getContractsService,
  getContractDetailService,
  createContractService,
  updateContractService,
} from '../services/contractService.js';

// Lấy danh sách hợp đồng
export const getContractlist = async (req, res) => {
  try {
    const contracts = await getContractsService(req.query);
    console.log('>>>param', req.query);
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

// Lấy chi tiết hợp đồng
export const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await getContractDetailService(id, req.user);
    res.status(200).json({
      success: true,
      data: contract,
    });
  } catch (error) {
    console.error('getContractById error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Lỗi khi lấy chi tiết hợp đồng',
    });
  }
};

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
