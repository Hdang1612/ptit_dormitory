import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataRoom from "../components/TopRoomList";
import Modal from "react-modal";
import editIcon from "../assets/edit_button.png";
import { getRooms, getPlaceDetail, updatePlace, createPlace } from "../service/placeService.js";

Modal.setAppElement("#root");

const RoomList = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRoomDetail, setSelectedRoomDetail] = useState(null);
  const openModal = async (roomId) => {
    try {
      const detail = await getPlaceDetail(roomId);
      console.log("Chi tiết phòng:", detail.room_detail);
      setSelectedRoomDetail(detail);
      setModalIsOpen(true);
    } catch (err) {
      console.error("Lỗi lấy chi tiết phòng:", err);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRoomDetail(null);
  };

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [roomToEditDetail, setRoomToEditDetail] = useState(null);
  // state form
  const [formCapacity, setFormCapacity] = useState("");
  const [formStatus, setFormStatus]     = useState("");
  const [formGender, setFormGender]     = useState("");
  const [formLeader, setFormLeader]     = useState("");

  const openEditModal = async (room) => {
    try {
      const detail = await getPlaceDetail(room.id);
      setRoomToEditDetail(detail);

      // map sang form state
      setFormCapacity(detail.room_detail.capacity || "");
      setFormStatus  (detail.room_detail.status   || "");
      setFormGender  (detail.room_detail.gender   || "");
      setFormLeader  (detail.room_detail.leaderUser
                        ? `${detail.room_detail.leaderUser.first_name} ${detail.room_detail.leaderUser.last_name}` : "");

      setEditModalIsOpen(true);
    } catch (err) {
      console.error("Lỗi load detail cho edit:", err);
    }
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setRoomToEditDetail(null);
  };

  const handleSaveEdit = async () => {
    if (!roomToEditDetail) return;

    const payload = {
      level: "room",
      area_name: roomToEditDetail.area_name,
      parent_id:   roomToEditDetail.parent_id,
      capacity:    formCapacity || null,
      status:      formStatus   || null,
      gender:      formGender   || null,
      leader:      formLeader   || null,
    };

    try {
      await updatePlace(roomToEditDetail.id, payload);
      // reload dữ liệu sau khi update
      fetchData(parentId, gender, status, search, pagination.currentPage, pagination.limit);
      closeEditModal();
    } catch (err) {
      console.error("Lỗi cập nhật phòng:", err);
      alert("Cập nhật thất bại");
    }
  };

// Modal Thêm Phòng 
const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
const [newRoomData, setNewRoomData] = useState({
  room_name: "",
  floorId: "",
  capacity: "",
  status: "",
  gender: "",
  leader: ""
});

const openCreateModal = () => {
  setNewRoomData({ room_name: "", floorId: "", capacity: "", status: "", gender: "", leader: "" });
  setCreateModalIsOpen(true);
};
const closeCreateModal = () => setCreateModalIsOpen(false);

// lưu mới
const handleSaveCreate = async () => {
  const { room_name, floorId } = newRoomData;
  if (!room_name || !floorId) {
    alert("Vui lòng nhập Tên phòng và ID tầng");
    return;
  }
  try {
    await createPlace({
      level: "room",
      room_name,
      floorId,
      capacity: newRoomData.capacity || null,
      status:   newRoomData.status   || null,
      gender:   newRoomData.gender   || null,
      leader:   newRoomData.leader   || null
    });
    fetchData(parentId, gender, status, search, pagination.currentPage, pagination.limit);
    closeCreateModal();
  } catch (err) {
    console.error(err);
    alert("Thêm phòng thất bại");
  }
};
  
  // Modal Thêm SV
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [roomToAdd, setRoomToAdd] = useState(null);

  const openAddModal = (room) => {
    setRoomToAdd(room);
    setAddModalIsOpen(true);
  };
  const closeAddModal = () => {
    setRoomToAdd(null);
    setAddModalIsOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [parentId, setParentId] = useState("B1");
  const [data, setData] = useState([]);
  const [area, setArea] = useState("B1");
  const [floor, setFloor] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 8,
    totalPages: 0,
    totalRecords: 0,
  });

  // Hàm lấy dữ liệu từ API
  const fetchData = async (parentId, gender, status, search, page, limit) => {
    try {
      const rooms = await getRooms(parentId, gender, status, search, page, limit);
      if (!rooms || !Array.isArray(rooms.data)) {
        setData([]);
        return;
      }
      setData(rooms.data);
      setPagination({
        currentPage: rooms.pagination.currentPage,
        limit: rooms.pagination.limit,
        totalPages: rooms.pagination.totalPages,
        totalRecords: rooms.pagination.totalRecords,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("data room", data);
  console.log("pagination", pagination)

  useEffect(() => {
    fetchData(parentId, gender, status, search, pagination.currentPage, pagination.limit);
  }, [area, parentId, gender, status, search, pagination.currentPage, pagination.limit]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > pagination.totalPages) return;
    setPagination((prev) => ({
      ...prev,
      currentPage: pageNumber,
    }));
  };
  
  const getPageNumbers = (current, total, maxButtons = 3) => {
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, current - half);
  let end   = Math.min(total, current + half);

  // Nếu ở đầu, đẩy end ra để đủ maxButtons
  if (current <= half) {
    end = Math.min(total, maxButtons);
  }
  // Nếu ở cuối, đẩy start vào để đủ maxButtons
  if (current + half >= total) {
    start = Math.max(1, total - maxButtons + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
    return pages;
  };

  const handlePaginationChange = ()=>{
    fetchData(parentId, gender, status, search, pagination.currentPage, pagination.limit);
  }

  const indexOfLastRoom = pagination.currentPage * pagination.limit;
  const indexOfFirstRoom = indexOfLastRoom - pagination.limit;
  const currentRooms = Array.isArray(data)
    ? data.slice(indexOfFirstRoom, indexOfLastRoom)
    : [];   

  return (
    <div style={styles.container}>
      <Sidebar role="admin" username="Hoàng Dũng" />
      <div style={styles.content}>
        <h2 style={styles.title}>Danh sách phòng</h2>
        <DataRoom
          setParentId={setParentId}
          area={area}
          setArea={setArea}
          floor={floor}
          setFloor={setFloor}
          gender={gender}
          setGender={setGender}
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}
          pagination={pagination}
          setPagination={setPagination}
          handlePaginationChange={handlePaginationChange}
        />

        <div style={styles.gridContainer}>
          {data.map((room, index) => (
            <div key={index} style={styles.roomCard}>
              <div style={styles.iconContainer}>
              <button type="button" onClick={() => openEditModal(room)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '10px',
                  cursor: 'pointer',
                }}>
                  <img src={editIcon} alt="Edit" style={styles.icon}/>
                </button> 
              </div>

              <h3 style={styles.roomNum}>Phòng {room.area_name}</h3>
              <div style={styles.gridContent}>
                <p style={styles.p}>Loại: {room.room_detail?.capacity || "Không rõ"}</p>
                <p style={styles.p}>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor:
                        room.room_detail?.status === "notfull"
                          ? "#EBF9F1"
                          : room.room_detail?.status === "full"
                          ? "#FEFFE2"
                          : "#F9D2D3",
                      color:
                        room.room_detail?.status === "notfull"
                          ? "#1F9254"
                          : room.room_detail?.status === "full"
                          ? "#8D9720"
                          : "#A30D11",
                    }}
                  >
                    {room.room_detail?.status === "full" ? "Hết chỗ"
                      : room.room_detail?.status === "notfull" ? "Còn chỗ"
                      : room.room_detail?.status === "available" ? "Trống"
                      : "Không rõ"}
                  </span>
                </p>

                <p style={styles.p}>Số người hiện tại: {room.memNum}</p>
                <button style={styles.viewBtn} onClick={() => openModal(room.id)}>Xem</button>
                <p style={styles.p}>Giới tính: {room.room_detail?.gender || "Không rõ"}</p>
                <button style={styles.viewBtn} onClick={() => openAddModal(room)}>Thêm SV</button>
              </div>
            </div>
          ))}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Chi tiết phòng"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "20px",
                borderRadius: "12px",
                position: "relative", // để nút Đóng có thể định vị absolute
                width: "800px",
                border: "2px solid black",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              },
            }}
          >
            {selectedRoomDetail && (
              <div>
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalRoomName}>Phòng {selectedRoomDetail.area_name}</h2>
                </div>

                <button onClick={closeModal} style={styles.modalCloseButton}>×</button>

                <div style={styles.modalGrid}>
                  <p><strong>Khu vực:</strong> {selectedRoomDetail.ParentPlace?.ParentPlace?.area_name || "–"}</p>
                  <p><strong>Loại:</strong> {selectedRoomDetail.room_detail?.capacity || "Không rõ"}</p>
                  <p><strong style={{marginRight:"10px",}}>Trạng thái:</strong>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          selectedRoomDetail.room_detail?.status === "notfull"
                            ? "#EBF9F1"
                            : selectedRoomDetail.room_detail?.status === "full"
                            ? "#FEFFE2"
                            : "#F9D2D3",
                        color:
                          selectedRoomDetail.room_detail?.status === "notfull"
                            ? "#1F9254"
                            : selectedRoomDetail.room_detail?.status === "full"
                            ? "#8D9720"
                            : "#A30D11",
                      }}
                    >
                      {selectedRoomDetail.room_detail?.status === "full" ? "Hết chỗ"
                      : selectedRoomDetail.room_detail?.status === "notfull" ? "Còn chỗ"
                      : selectedRoomDetail.room_detail?.status === "available" ? "Trống"
                      : "Không rõ"}
                    </span>
                  </p>
                  <p><strong>Giới tính:</strong> {selectedRoomDetail.room_detail?.gender || "Không rõ"}</p>
                  <p><strong>Số người hiện tại:</strong> {selectedRoomDetail.StudentRoom?.length || 0}</p>
                  <p><strong>Leader:</strong> {
                      selectedRoomDetail.room_detail.leaderUser
                        ? `${selectedRoomDetail.room_detail.leaderUser.first_name} ${selectedRoomDetail.room_detail.leaderUser.last_name}`
                        : "Chưa có leader"
                    }
                  </p>
                </div>

                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Họ và tên</th>
                      <th style={styles.th}>Mã sinh viên</th>
                      <th style={styles.th}>Số điện thoại</th>
                      <th style={styles.th}>Thông tin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRoomDetail.StudentRoom?.map((sr) => (
                      <tr key={sr.id} style={styles.tr}>
                        <td style={styles.td}>{sr.id}</td>
                        <td style={styles.td}>
                          {sr.student.first_name} {sr.student.last_name}
                        </td>
                        <td style={styles.td}>{sr.student.student_code}</td>
                        <td style={styles.td}>{sr.student.email}</td>
                        <td style={styles.td}>
                          <button
                            style={styles.viewBtn}
                            onClick={() => handleInfor(sr.student.id)}
                          >
                            Xem
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          
              </div>
            )}
          </Modal>

          <Modal
            isOpen={editModalIsOpen}
            onRequestClose={closeEditModal}
            contentLabel="Chỉnh sửa phòng"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "20px",
                borderRadius: "12px",
                position: "relative",
                width: "800px",
                border: "2px solid black",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              },
            }}
          >
            {roomToEditDetail  && (
              <div>
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalRoomName}>Chỉnh sửa phòng {roomToEditDetail.area_name}</h2>
                </div>

                <button onClick={closeEditModal} style={styles.modalCloseButton}>×</button>

                <div style={styles.modalGrid}>
                  <div style={styles.selectWrapper}>
                    <label><strong>Loại:</strong></label>
                    <select
                      value={formCapacity}
                      onChange={e => setFormCapacity(e.target.value)}
                      style={styles.select}
                    >
                      <option value="">– Chọn –</option>
                      <option value="4">4 người/phòng</option>
                      <option value="6">6 người/phòng</option>
                    </select>
                  </div>

                  <div style={styles.selectWrapper}>
                    <label><strong>Trạng thái:</strong></label>
                    <select
                      value={formStatus}
                      onChange={e => setFormStatus(e.target.value)}
                      style={styles.select}
                    >
                      <option value="">– Chọn –</option>
                      <option value="notfull">Còn chỗ</option>
                      <option value="full">Hết chỗ</option>
                      <option value="available">Trống</option>
                    </select>
                  </div>

                  <div style={styles.selectWrapper}>
                    <label><strong>Giới tính:</strong></label>
                    <select
                      value={formGender}
                      onChange={e => setFormGender(e.target.value)}
                      style={styles.select}
                    >
                      <option value="">– Chọn –</option>
                      <option value="X">Nam</option>
                      <option value="Y">Nữ</option>
                    </select>
                  </div>

                  
                </div>
                <div style={{marginTop:"10px",}}>
                    <label><strong>Leader:</strong></label>
                    <input
                      type="text"
                      value={formLeader}
                      onChange={e => setFormLeader(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Họ và tên</th>
                      <th style={styles.th}>Mã sinh viên</th>
                      <th style={styles.th}>Số điện thoại</th>
                      <th style={styles.th}>Xóa SV</th>
                    </tr>
                  </thead>
                  <tbody>
                  {roomToEditDetail.StudentRoom?.map((sr) => (
                      <tr key={sr.id} style={styles.tr}>
                        <td style={styles.td}>{sr.id}</td>
                        <td style={styles.td}>
                          {sr.student.first_name} {sr.student.last_name}
                        </td>
                        <td style={styles.td}>{sr.student.student_code}</td>
                        <td style={styles.td}>{sr.student.email}</td>
                        <td style={styles.td}>
                          <button style={styles.addButton}>
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: "20px" }}>
                  <button style={styles.addButton} onClick={handleSaveEdit}>Lưu</button>
                </div>
              </div>
            )}
          </Modal>

          <Modal
            isOpen={addModalIsOpen}
            onRequestClose={closeAddModal}
            contentLabel="Thêm sinh viên"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "20px",
                borderRadius: "12px",
                position: "relative",
                width: "600px",
                border: "2px solid black",
                textAlign: "center",
              },
            }}
          >
            {roomToAdd && (
              <div>
                <div style={styles.modalHeader}>
                  <h2 style={styles.modalRoomName}>
                    Thêm SV vào phòng {roomToAdd.area_name}
                  </h2>
                </div>
                <button 
                  onClick={closeAddModal} 
                  style={styles.modalCloseButton}
                >
                  ×
                </button>

                {/* Nhập ID sinh viên */}
                <div style={{ marginBottom: "15px", marginLeft:"20px", textAlign: "left", }}>
                  <label><strong>Mã sinh viên:</strong></label>
                  <input
                    type="text"
                    placeholder="Nhập Mã sinh viên"
                    style={styles.input}
                  />
                </div>

                {/* Grid 2 cột cho các thông tin */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                    padding: "20px",
                    textAlign: "left",                  
                    borderRadius: "12px",
                    border: "2px solid black",
                    backgroundColor: "#F7F6FE",
                  }}
                >
                  <p><strong>Họ và tên:</strong> </p>
                  <p><strong>Ngày sinh:</strong> </p>
                  <p><strong>Giới tính:</strong> </p>
                  <p><strong>SDT:</strong> </p>
                  <p><strong>Mã sinh viên:</strong> </p>
                  <p><strong>Email:</strong> </p>
                </div>

                {/* Nút Lưu */}
                <div style={{ marginTop: "20px" }}>
                  <button style={styles.addButton}>Lưu</button>
                </div>
              </div>
            )}
          </Modal>

            {/* Modal Thêm phòng */}
          <Modal
            isOpen={createModalIsOpen}
            onRequestClose={closeCreateModal}
            contentLabel="Thêm phòng"
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "20px",
                borderRadius: "12px",
                width: "600px",
                border: "2px solid black",
                textAlign: "center"
              }
            }}
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalRoomName}>Thêm phòng mới</h2>
            </div>
            <button onClick={closeCreateModal} style={styles.modalCloseButton}>×</button>

            <div style={styles.modalGrid}>
              {/* Tên phòng */}
              <div style={styles.selectWrapper}>
                <label><strong>Tên phòng:</strong></label>
                <input
                  type="text"
                  value={newRoomData.room_name}
                  onChange={e => setNewRoomData(d => ({ ...d, room_name: e.target.value }))}
                  style={styles.input2}
                />
              </div>

              {/* ID tầng */}
              <div style={styles.selectWrapper}>
                <label><strong>ID tầng:</strong></label>
                <input
                  type="text"
                  value={newRoomData.floorId}
                  onChange={e => setNewRoomData(d => ({ ...d, floorId: e.target.value }))}
                  style={styles.input2}
                />
              </div>
              {/* Leader */}
              <div style={styles.selectWrapper}>
                <label><strong>Leader:</strong></label>
                <input
                  type="text"
                  value={newRoomData.leader}
                  onChange={e => setNewRoomData(d => ({ ...d, leader: e.target.value }))}
                  style={styles.input2}
                />
              </div>
              {/* Loại (capacity) */}
              <div style={styles.selectWrapper}>
                <label><strong>Loại:</strong></label>
                <select
                  value={newRoomData.capacity}
                  onChange={e => setNewRoomData(d => ({ ...d, capacity: e.target.value }))}
                  style={styles.select}
                >
                  <option value="">– Chọn –</option>
                  <option value="4">4 người/phòng</option>
                  <option value="6">6 người/phòng</option>
                </select>
              </div>

              {/* Trạng thái */}
              <div style={styles.selectWrapper}>
                <label><strong>Trạng thái:</strong></label>
                <select
                  value={newRoomData.status}
                  onChange={e => setNewRoomData(d => ({ ...d, status: e.target.value }))}
                  style={styles.select}
                >
                  <option value="">– Chọn –</option>
                  <option value="notfull">Còn chỗ</option>
                  <option value="full">Hết chỗ</option>
                  <option value="available">Trống</option>
                </select>
              </div>

              {/* Giới tính */}
              <div style={styles.selectWrapper}>
                <label><strong>Giới tính:</strong></label>
                <select
                  value={newRoomData.gender}
                  onChange={e => setNewRoomData(d => ({ ...d, gender: e.target.value }))}
                  style={styles.select}
                >
                  <option value="">– Chọn –</option>
                  <option value="X">Nam</option>
                  <option value="Y">Nữ</option>
                </select>
              </div>

            </div>

            <div style={{ marginTop: "20px" }}>
              <button style={styles.addButton} onClick={handleSaveCreate}>Lưu</button>
            </div>
          </Modal>

        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          {/* nút lui */}
          <button
            style={styles.pageBtn}
            onClick={() => paginate(1)}
            disabled={pagination.currentPage === 1}
          >
            «
          </button>
          <button
            style={styles.pageBtn}
            onClick={() => paginate(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
          >
            ‹
          </button>

          {/* nếu nhóm pageNumbers không chứa trang 1, thêm nút 1 và dấu ... */}
          {(getPageNumbers(pagination.currentPage, pagination.totalPages)[0] > 1) && (
            <>
              <button style={styles.pageBtn} onClick={() => paginate(1)}>1</button>
              <span style={{ padding: "8px" }}>…</span>
            </>
          )}

          {/* render nhóm nút trang */}
          {getPageNumbers(pagination.currentPage, pagination.totalPages).map((num) => (
            <button
              key={num}
              style={{
                ...styles.pageBtn,
                ...(pagination.currentPage === num ? styles.pageBtnActive : {}),
              }}
              onClick={() => paginate(num)}
            >
              {num}
            </button>
          ))}

          {/* nếu nhóm pageNumbers không chứa trang cuối, thêm dấu ... và nút cuối */}
          {getPageNumbers(pagination.currentPage, pagination.totalPages).slice(-1)[0] < pagination.totalPages && (
            <>
              <span style={{ padding: "8px" }}>…</span>
              <button
                style={styles.pageBtn}
                onClick={() => paginate(pagination.totalPages)}
              >
                {pagination.totalPages}
              </button>
            </>
          )}

          {/* nút tới */}
          <button
            style={styles.pageBtn}
            onClick={() => paginate(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            ›
          </button>
          <button
            style={styles.pageBtn}
            onClick={() => paginate(pagination.totalPages)}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            »
          </button>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.addButton} onClick={openCreateModal}>Thêm phòng</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: 1,
    padding: "20px",
    background: "#f0f0f0",
    marginLeft: "220px",
    width: "calc(100% - 220px)",
    color: "black",
    overflowY: "auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "24px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5px",
  },
  iconContainer: {
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
    gap: "5px",
  },
  icon: {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  roomCard: {
    position: "relative",
    background: "#F7F6FE",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px",
    border: "2px solid #D1C4E9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  roomNum: {
    textAlign: "center",
    margin: "0px",
    fontSize: "16px",
    fontWeight: "bold",
    height: "40px",
    lineHeight: "40px",
  },
  gridContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0px",
    marginTop: "10px",
    alignItems: "center",
  },
  p: {
    paddingTop: "10px",
    paddingBottom: "15px",
  },
  viewBtn: {
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    width: "60%",
    height: "60%",
    padding: "0px",
    marginLeft: "20%",
    marginTop: "10%",
    marginBottom: "10%",
    borderRadius: "5px",
    cursor: "pointer",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  pageBtn: {
    background: "#fff",
    color: "#9E9E9E",
    border: "none",
    padding: "8px 16px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.2s",
  },
  pageBtnActive: {
    background: "#BC2626",
    color: "white",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },

  modalHeader: {
    marginBottom: "20px",
    textAlign: "center",
  },
  
  modalRoomName: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0",
  },
  
  modalGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
  },
  
  modalCloseButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    bottom: "10px",
    background: "transparent",
    border: "none",
    fontSize: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#BC2626",
    padding: "10px",
    width: "40px",
    height: "40px",
    display: "flex",       // canh giữa
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",      // tránh vùng click quá cao
  },

  table: {
    width: "100%",
    borderColor: "#ccc",
    marginTop: "10px",
    marginRight: "10px",
    backgroundColor: "#F7F6FE",
  },
  th: {
    padding: "10px",
    textAlign: "center",
    background: "#fff",
    color: "#000",
    fontWeight: "bold",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    color: "#333",
    textAlign: "center",
  },
  selectWrapper: {
    display: "flex",
    alignItems: "center",
    color: "black",
    justifyContent: "center",
  },
  select: {
    marginLeft: "8px",
    padding: "5px 0px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "white",
    color: "black",
  },
  input:{
    marginLeft: "10px",
    padding: "5px",
    borderRadius:"5px",
    backgroundColor: "white",
    border: "1px solid black",
    width: "30%",
  },
  input2:{
    marginLeft: "10px",
    padding: "5px",
    borderRadius:"5px",
    backgroundColor: "white",
    border: "1px solid black",
    width: "100%",
  },
};

export default RoomList;
