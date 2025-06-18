/**
 * @swagger
 * tags:
 *   - name: Attendance
 *     description: Quản lý điểm danh sinh viên theo ca trực
 */

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Tạo bản ghi điểm danh mới
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - shift_id
 *             properties:
 *               student_id:
 *                 type: string
 *                 example: 123e4567-e89b-12d3-a456-426614174000
 *               shift_id:
 *                 type: string
 *                 example: shift-001
 *               status:
 *                 type: boolean
 *                 example: true
 *                 description: Trạng thái điểm danh, mặc định là false nếu không truyền
 *     responses:
 *       201:
 *         description: Tạo bản ghi điểm danh thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thêm thành công !
 *                 data:
 *                   $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Dữ liệu không hợp lệ (thiếu student_id hoặc shift_id)
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/attendance/{id}?status={status}:
 *   put:
 *     summary: Cập nhật trạng thái điểm danh
 *     tags: [Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bản ghi điểm danh
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Trạng thái mới cần cập nhật (true/false)
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cập nhật trạng thái thành công !
 *                 data:
 *                   $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Không tìm thấy bản ghi điểm danh
 *       500:
 *         description: Lỗi server
 */
