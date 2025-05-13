/**
 * @swagger
 * tags:
 *   - name: Contracts
 *     description: Quản lý hợp đồng trong hệ thống
 */

/**
 * @swagger
 * /api/contract/fetchlist:
 *   get:
 *     summary: Lấy danh sách hợp đồng
 *     tags: [Contracts]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Số trang (mặc định là 1)
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Số lượng hợp đồng mỗi trang (mặc định là 10)
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: status
 *         in: query
 *         description: 'Trạng thái hợp đồng (ví dụ: "đã gửi", "xác nhận", "hủy")'
 *         schema:
 *           type: string
 *       - name: type
 *         in: query
 *         description: 'Loại hợp đồng (ví dụ: "1" cho hợp đồng mới, "2" cho hợp đồng gia hạn)'
 *         schema:
 *           type: integer
 *       - name: student_id
 *         in: query
 *         description: ID của sinh viên
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trả về danh sách hợp đồng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contracts:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Contract'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Tổng số hợp đồng
 *                     currentPage:
 *                       type: integer
 *                       description: Trang hiện tại
 *                     totalPages:
 *                       type: integer
 *                       description: Tổng số trang
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /api/contract/fetch/{contractId}:
 *   get:
 *     summary: Lấy chi tiết hợp đồng
 *     tags: [Contracts]
 *     parameters:
 *       - name: contractId
 *         in: path
 *         required: true
 *         description: ID của hợp đồng cần lấy chi tiết
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin chi tiết hợp đồng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/ContractDetail'
 *       404:
 *         description: Không tìm thấy hợp đồng
 */

/**
 * @swagger
 * /api/contract/create:
 *   post:
 *     summary: Tạo hợp đồng mới
 *     tags: [Contracts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - apply_date
 *             properties:
 *               type:
 *                 type: integer
 *                 description: Loại hợp đồng (1 - mới, 2 - gia hạn, 3 - hủy)
 *                 example: 1
 *               apply_date:
 *                 type: string
 *                 format: date
 *                 description: Ngày tạo hợp đồng
 *                 example: "2025-04-12"
 *               status:
 *                 type: string
 *                 description: Trạng thái hợp đồng (mặc định "đã gửi")
 *                 example: "đã gửi"
 *               form_data:
 *                 type: object
 *                 description: Dữ liệu mẫu cho hợp đồng (có thể là thông tin sinh viên, phòng ký túc xá,...)
 *                 example: { "student_code": "12345", "full_name": "Nguyễn Văn A", "gender": "Nam" }
 *     responses:
 *       201:
 *         description: Tạo hợp đồng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Contract'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /api/contract/update/{contractId}:
 *   put:
 *     summary: Cập nhật hợp đồng
 *     tags: [Contracts]
 *     parameters:
 *       - name: contractId
 *         in: path
 *         required: true
 *         description: ID của hợp đồng cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 description: Trạng thái hợp đồng
 *                 example: "xác nhận"
 *               form_data:
 *                 type: object
 *                 description: Dữ liệu hợp đồng đã cập nhật
 *     responses:
 *       200:
 *         description: Cập nhật hợp đồng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Contract'
 *       404:
 *         description: Không tìm thấy hợp đồng
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * definitions:
 *   Contract:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: ID duy nhất của hợp đồng
 *       student_id:
 *         type: string
 *         description: ID của sinh viên liên kết với hợp đồng
 *       type:
 *         type: integer
 *         description: Loại hợp đồng (1 - mới, 2 - gia hạn, 3 - hủy)
 *       status:
 *         type: string
 *         description: Trạng thái hợp đồng
 *       apply_date:
 *         type: string
 *         format: date
 *         description: Ngày tạo hợp đồng
 *       file_path:
 *         type: string
 *         description: Đường dẫn tới file hợp đồng
 *       form_data:
 *         type: object
 *         description: Dữ liệu mẫu hợp đồng (ví dụ thông tin sinh viên)
 *   ContractDetail:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       type:
 *         type: integer
 *       student_id:
 *         type: string
 *       apply_date:
 *         type: string
 *       status:
 *         type: string
 *       file_path:
 *         type: string
 *       student:
 *         type: object
 *         description: Dữ liệu sinh viên
 *         properties:
 *           full_name:
 *             type: string
 *             description: Họ tên sinh viên
 *           gender:
 *             type: string
 *             description: Giới tính sinh viên
 *           student_code:
 *             type: string
 *             description: Mã sinh viên
 */
