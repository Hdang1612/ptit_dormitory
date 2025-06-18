/**
 * @swagger
 * tags:
 *   - name: ShiftSchedule
 *     description: Quản lý lịch trực và điểm danh
 */

/**
 * @swagger
 * /api/shiftSchedule/create:
 *   post:
 *     summary: Tạo mới một ca trực
 *     tags: [ShiftSchedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - shift_date
 *               - place_id
 *               - shift_start
 *               - shift_end
 *             properties:
 *               user_id:
 *                 type: string
 *               shift_date:
 *                 type: string
 *                 format: date
 *               place_id:
 *                 type: string
 *               shift_start:
 *                 type: string
 *               shift_end:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tạo thành công
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/shiftSchedule/getListOfAllUser:
 *   get:
 *     summary: Lấy danh sách các ca trực với lọc và phân trang
 *     tags: [ShiftSchedule]
 *     parameters:
 *       - in: query
 *         name: shift_date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: place_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trả về danh sách ca trực có phân trang
 *       500:
 *         description: Lỗi máy chủ
 */

/**
 * @swagger
 * /api/shiftSchedule/edit/{id}:
 *   put:
 *     summary: Cập nhật ca trực
 *     tags: [ShiftSchedule]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               shift_date:
 *                 type: string
 *               place_id:
 *                 type: string
 *               shift_start:
 *                 type: string
 *               shift_end:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy bản ghi
 *       500:
 *         description: Lỗi hệ thống
 */

/**
 * @swagger
 * /api/shiftSchedule/getListOfUser/{user_id}:
 *   get:
 *     summary: Lấy lịch trực cá nhân theo user_id
 *     tags: [ShiftSchedule]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: shift_date
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trả về danh sách ca trực của người dùng
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/shiftSchedule/attedanceOfShift/{shift_id}/{place_id}:
 *   get:
 *     summary: Lấy danh sách sinh viên thuộc ca trực và trạng thái điểm danh
 *     tags: [ShiftSchedule]
 *     parameters:
 *       - in: path
 *         name: shift_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: place_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Trả về thông tin điểm danh và báo cáo
 *       500:
 *         description: Lỗi truy vấn hoặc dữ liệu không hợp lệ
 */
