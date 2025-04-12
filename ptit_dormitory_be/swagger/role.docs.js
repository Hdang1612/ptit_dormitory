/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Quản lý vai trò trong hệ thống
 */

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: Lấy tất cả các vai trò
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Trả về danh sách các vai trò
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Role'
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     summary: Tạo một vai trò mới
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_name
 *             properties:
 *               role_name:
 *                 type: string
 *                 example: Admin
 *               description:
 *                 type: string
 *                 example: Vai trò quản trị viên với quyền truy cập đầy đủ
 *     responses:
 *       201:
 *         description: Tạo vai trò thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Role'
 *       400:
 *         description: Dữ liệu không hợp lệ
 */

/**
 * @swagger
 * /api/v1/roles/{roleId}:
 *   get:
 *     summary: Lấy thông tin vai trò theo ID
 *     tags: [Roles]
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         description: ID của vai trò cần lấy
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin của vai trò
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Role'
 *       404:
 *         description: Không tìm thấy vai trò
 */

/**
 * @swagger
 * /api/v1/roles/{roleId}:
 *   put:
 *     summary: Cập nhật thông tin vai trò theo ID
 *     tags: [Roles]
 *     parameters:
 *       - name: roleId
 *         in: path
 *         required: true
 *         description: ID của vai trò cần cập nhật
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_name
 *             properties:
 *               role_name:
 *                 type: string
 *                 example: Editor
 *               description:
 *                 type: string
 *                 example: Vai trò biên tập viên có quyền chỉnh sửa nội dung
 *     responses:
 *       200:
 *         description: Cập nhật vai trò thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Role'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy vai trò
 */

/**
 * @swagger
 * definitions:
 *   Role:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         description: ID duy nhất của vai trò
 *       role_name:
 *         type: string
 *         description: Tên vai trò
 *       description:
 *         type: string
 *         description: Mô tả vai trò
 *     required:
 *       - id
 *       - role_name
 */
