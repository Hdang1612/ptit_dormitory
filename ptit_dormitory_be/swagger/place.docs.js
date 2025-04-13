/**
 * @swagger
 * /getPlaces:
 *   get:
 *     summary: Lấy danh sách khu vực, tầng hoặc phòng
 *     tags:
 *       - Place
 *     parameters:
 *       - in: query
 *         name: level
 *         required: true
 *         schema:
 *           type: string
 *           enum: [area, floor, room]
 *         description: Cấp độ của nơi (area, floor, room)
 *       - in: query
 *         name: parent_id
 *         required: false
 *         schema:
 *           type: string
 *         description: ID của bản ghi cha (với floor là areaId, room là floorId)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm theo tên khu vực hoặc số phòng
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang hiện tại (chỉ áp dụng khi level = room)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số bản ghi mỗi trang (chỉ áp dụng khi level = room)
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female]
 *         description: Giới tính của phòng (chỉ áp dụng khi level = room)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Trạng thái của phòng (chỉ áp dụng khi level = room)
 *     responses:
 *       200:
 *         description: Danh sách địa điểm theo level
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy dữ liệu
 */

/**
 * @swagger
 * /getPlaceDetail/{id}:
 *   get:
 *     summary: Lấy thông tin chi tiết của một khu vực, tầng hoặc phòng
 *     tags:
 *       - Place
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của địa điểm (Place)
 *     responses:
 *       200:
 *         description: Trả về thông tin chi tiết của địa điểm, bao gồm thông tin cha, chi tiết phòng, và sinh viên (nếu có)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 area_name:
 *                   type: string
 *                 level:
 *                   type: string
 *                 parent_id:
 *                   type: string
 *                 ParentPlace:
 *                   type: object
 *                   description: Bản ghi cha
 *                 room_detail:
 *                   type: object
 *                   description: Thông tin chi tiết của phòng (nếu là room)
 *                   properties:
 *                     room_number:
 *                       type: string
 *                     capacity:
 *                       type: integer
 *                     gender:
 *                       type: string
 *                     status:
 *                       type: string
 *                     leaderUser:
 *                       type: object
 *                       description: Thông tin trưởng phòng (nếu có)
 *                 StudentRoom:
 *                   type: array
 *                   description: Danh sách sinh viên trong phòng (nếu là room)
 *                   items:
 *                     type: object
 *                     properties:
 *                       student:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           first_name:
 *                             type: string
 *                           last_name:
 *                             type: string
 *                           student_code:
 *                             type: string
 *                           class_code:
 *                             type: string
 *                           gender:
 *                             type: string
 *                           nationality:
 *                             type: string
 *       404:
 *         description: Không tìm thấy địa điểm với ID đã cho
 */

/**
 * @swagger
 * /createPlaces:
 *   post:
 *     summary: Tạo mới khu vực, tầng hoặc phòng
 *     tags:
 *       - Place
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 required: [level, area_name]
 *                 properties:
 *                   level:
 *                     type: string
 *                     enum: [area]
 *                   area_name:
 *                     type: string
 *               - type: object
 *                 required: [level, floor_name, areaId]
 *                 properties:
 *                   level:
 *                     type: string
 *                     enum: [floor]
 *                   floor_name:
 *                     type: string
 *                   areaId:
 *                     type: string
 *               - type: object
 *                 required: [level, room_name, floorId, room_number]
 *                 properties:
 *                   level:
 *                     type: string
 *                     enum: [room]
 *                   room_name:
 *                     type: string
 *                   floorId:
 *                     type: string
 *                   room_number:
 *                     type: string
 *                   capacity:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   gender:
 *                     type: string
 *                     enum: [male, female]
 *                   leader:
 *                     type: string
 *                   room_detailcol:
 *                     type: string
 *     responses:
 *       200:
 *         description: Tạo địa điểm thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy bản ghi cha (area/floor)
 */

/**
 * @swagger
 * /updatePlaces/{id}:
 *   put:
 *     summary: Cập nhật khu vực, tầng hoặc phòng
 *     tags:
 *       - Place
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bản ghi cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [level]
 *             properties:
 *               level:
 *                 type: string
 *                 enum: [area, floor, room]
 *               area_name:
 *                 type: string
 *               parent_id:
 *                 type: string
 *               room_detailcol:
 *                 type: string
 *               room_number:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               status:
 *                 type: string
 *               leader:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy bản ghi
 */
