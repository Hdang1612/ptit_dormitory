import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DataRoom from "../components/TopRoomList";
import deleteIcon from "../assets/delete_button.png";
import editIcon from "../assets/edit_button.png";

const RoomList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const RoomsPerPage = 8;

  const rooms = [
    {
      roomNum: "Phòng 101",
      type: "4 người/phòng",
      memNum: "2/4",
      gender: "Nam",
      state: "Còn chỗ",
    },
    {
      roomNum: "Phòng 102",
      type: "4 người/phòng",
      memNum: "4/4",
      gender: "Nam",
      state: "Hết chỗ",
    },
    {
      roomNum: "Phòng 103",
      type: "4 người/phòng",
      memNum: "0/4",
      gender: "Nam",
      state: "Tạm khóa",
    },
    {
      roomNum: "Phòng 104",
      type: "4 người/phòng",
      memNum: "0/4",
      gender: "Nam",
      state: "Đang bảo trì",
    },
    {
      roomNum: "Phòng 105",
      type: "6 người/phòng",
      memNum: "4/6",
      gender: "Nam",
      state: "Còn chỗ",
    },
    {
      roomNum: "Phòng 106",
      type: "6 người/phòng",
      memNum: "6/6",
      gender: "Nam",
      state: "Hết chỗ",
    },
    {
      roomNum: "Phòng 201",
      type: "4 người/phòng",
      memNum: "0/4",
      gender: "Nam",
      state: "Tạm khóa",
    },
    {
      roomNum: "Phòng 202",
      type: "4 người/phòng",
      memNum: "0/4",
      gender: "Nam",
      state: "Đang bảo trì",
    },
  ];

  const indexOfLastRoom = currentPage * RoomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - RoomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <Sidebar role="admin" username="Hoàng Dũng" />
      <div style={styles.content}>
        <h2 style={styles.title}>Danh sách phòng</h2>
        <DataRoom />
        <div style={styles.gridContainer}>
          {currentRooms.map((room, index) => (
            <div key={index} style={styles.roomCard}>
              <div style={styles.iconContainer}>
                <img src={deleteIcon} alt="Delete" style={styles.icon} />
                <img src={editIcon} alt="Edit" style={styles.icon} />
              </div>
              <h3 style={styles.roomNum}>{room.roomNum}</h3>
              <div style={styles.gridContent}>
                <p>Loại: {room.type}</p>
                <p>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor:
                        room.state === "Còn chỗ"
                          ? "#EBF9F1"
                          : room.state === "Hết chỗ"
                          ? "#FEFFE2"
                          : "#F9D2D3",
                      color:
                        room.state === "Còn chỗ"
                          ? "#1F9254"
                          : room.state === "Hết chỗ"
                          ? "#8D9720"
                          : "#A30D11",
                    }}
                  >
                    {room.state}
                  </span>
                </p>
                <p>Số người hiện tại: {room.memNum}</p>
                <button style={styles.viewBtn}>Xem</button>
                <p>Giới tính: {room.gender}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Phân trang */}
        <div style={styles.pagination}>
          <button
            style={styles.pageBtn}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          {[...Array(Math.ceil(rooms.length / RoomsPerPage)).keys()].map(
            (number) => (
              <button
                key={number + 1}
                style={{
                  ...styles.pageBtn,
                  ...(currentPage === number + 1 ? styles.pageBtnActive : {}),
                }}
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </button>
            )
          )}
          <button
            style={styles.pageBtn}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(rooms.length / RoomsPerPage)}
          >
            Sau
          </button>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.addButton}>Thêm phòng</button>
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
  },
  gridContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0px",
    marginTop: "10px",
    alignItems: "center",
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
};

export default RoomList;
