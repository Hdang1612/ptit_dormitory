import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataRoom from "../components/TopRoomList";
import editIcon from "../assets/edit_button.png";
import { getRooms } from "../service/placeService.js";

const RoomList = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [parentId, setParentId] = useState("B1");
  const [data, setData] = useState([]);
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(8);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
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
  }, [currentPage, limit, parentId, gender, status, search]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > pagination.totalPages) return;
    setCurrentPage(pageNumber);
  };

  const indexOfLastRoom = currentPage * limit;
  const indexOfFirstRoom = indexOfLastRoom - limit;
  const currentRooms = Array.isArray(data)
    ? data.slice(indexOfFirstRoom, indexOfLastRoom)
    : [];   

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        <h2 style={styles.title}>Danh sách phòng</h2>
        <DataRoom
          area={area}
          floor={floor}
          gender={gender}
          status={status}
          search={search}
          limit={limit}
          fetchData={fetchData}
        />

        <div style={styles.gridContainer}>
          {data.map((room, index) => (
            <div key={index} style={styles.roomCard}>
              <div style={styles.iconContainer}>
                <img src={editIcon} alt="Edit" style={styles.icon} />
              </div>
              <h3 style={styles.roomNum}>{room.area_name}</h3>
              <div style={styles.gridContent}>
                <p style={styles.p}>Loại: {room.room_detail?.capacity || "Không rõ"}</p>
                <p style={styles.p}>
                  <span
                    style={{
                      ...styles.status,
                      backgroundColor:
                        room.room_detail?.status === "Còn chỗ"
                          ? "#EBF9F1"
                          : room.room_detail?.status === "Hết chỗ"
                          ? "#FEFFE2"
                          : "#F9D2D3",
                      color:
                        room.room_detail?.status === "Còn chỗ"
                          ? "#1F9254"
                          : room.room_detail?.status === "Hết chỗ"
                          ? "#8D9720"
                          : "#A30D11",
                    }}
                  >
                    {room.room_detail?.status || "Không rõ"}
                  </span>
                </p>

                <p style={styles.p}>Số người hiện tại: {room.memNum}</p>
                <button style={styles.viewBtn}>Xem</button>
                <p style={styles.p}>Giới tính: {room.room_detail?.gender || "Không rõ"}</p>
                <button style={styles.viewBtn}>Thêm SV</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            style={styles.pageBtn}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          {[...Array(pagination.totalPages).keys()].map((number) => (
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
          ))}
          <button
            style={styles.pageBtn}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
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
};

export default RoomList;
