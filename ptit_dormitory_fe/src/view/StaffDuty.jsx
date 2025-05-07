import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopStaffDuty from "../components/TopStaffDuty";
import { useNavigate } from "react-router-dom";

const StaffDuty = () => {
  const navigate = useNavigate();
  const handleAttendance = () => {
    navigate("/studentcheckin");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 6;

  const shiftData = [
    {
      area: "Khu A",
      shift: "11:00 - 18:00",
      attendanceStatus: "Trong giờ",
      studentCheckin: "Trong giờ",
      reportStatus: "Trong giờ",
    },
    {
      area: "Khu A",
      shift: "11:00 - 18:00",
      attendanceStatus: "Đã điểm danh",
      studentCheckin: "Ngoài giờ",
      reportStatus: "Ngoài giờ",
    },
    {
      area: "Khu B",
      shift: "11:00 - 18:00",
      attendanceStatus: "Chưa điểm danh",
      studentCheckin: "Ngoài giờ",
      reportStatus: "Ngoài giờ",
    },
    {
      area: "Khu B",
      shift: "11:00 - 18:00",
      attendanceStatus: "Ngoài giờ",
      studentCheckin: "Ngoài giờ",
      reportStatus: "Ngoài giờ",
    },
    {
      area: "Khu C",
      shift: "11:00 - 18:00",
      attendanceStatus: "Trong giờ",
      studentCheckin: "Trong giờ",
      reportStatus: "Trong giờ",
    },
    {
      area: "Khu C",
      shift: "11:00 - 18:00",
      attendanceStatus: "Chưa điểm danh",
      studentCheckin: "Ngoài giờ",
      reportStatus: "Ngoài giờ",
    },
    {
      area: "Khu A",
      shift: "11:00 - 18:00",
      attendanceStatus: "Đã điểm danh",
      studentCheckin: "Ngoài giờ",
      reportStatus: "Ngoài giờ",
    },
    {
      area: "Khu B",
      shift: "11:00 - 18:00",
      attendanceStatus: "Trong giờ",
      studentCheckin: "Trong giờ",
      reportStatus: "Trong giờ",
    },
  ];

  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = shiftData.slice(indexOfFirstShift, indexOfLastShift);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <Sidebar role="nguoitruc" username="Nguyễn Thị B" />
      <div style={styles.content}>
        <h2 style={styles.title}>Lịch trực</h2>

        <TopStaffDuty />

        <div style={styles.gridContainer}>
          {currentShifts.map((shift, index) => (
            <div key={index} style={styles.shiftCard}>
              <div style={styles.gridContent}>
                <p style={styles.p}>
                  <strong>Khu vực:</strong> {shift.area}
                </p>

                <p style={styles.p}>
                  {shift.attendanceStatus === "Trong giờ" ? (
                    <button style={styles.button}>Điểm danh trực</button>
                  ) : (
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          shift.attendanceStatus === "Đã điểm danh"
                            ? "#EBF9F1"
                            : "#F9D2D3",
                        color:
                          shift.attendanceStatus === "Đã điểm danh"
                            ? "#1F9254"
                            : "#A30D11",
                      }}
                    >
                      {shift.attendanceStatus}
                    </span>
                  )}
                </p>

                <p style={styles.p}>
                  <strong>Ca trực:</strong> {shift.shift}
                </p>

                <p style={styles.p}>
                  {shift.studentCheckin === "Trong giờ" ? (
                    <button style={styles.button} onClick={handleAttendance}>
                      ĐD sinh viên
                    </button>
                  ) : (
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor: "#F9D2D3",
                        color: "#A30D11",
                      }}
                    >
                      {shift.studentCheckin}
                    </span>
                  )}
                </p>

                <p style={styles.p}></p>

                <p style={styles.p}>
                  {shift.reportStatus === "Trong giờ" ? (
                    <button style={styles.button}>Tạo báo cáo</button>
                  ) : (
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor: "#F9D2D3",
                        color: "#A30D11",
                      }}
                    >
                      {shift.reportStatus}
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.pagination}>
          <button
            style={styles.pageBtn}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </button>
          {[...Array(Math.ceil(shiftData.length / shiftsPerPage)).keys()].map(
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
            disabled={
              currentPage === Math.ceil(shiftData.length / shiftsPerPage)
            }
          >
            Sau
          </button>
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
    background: "#f8f8f8",
    marginLeft: "220px",
    width: "calc(100% - 220px)",
    overflowY: "auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "black",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
  },
  shiftCard: {
    background: "#F7F6FE",
    // border: "1px solid #ccc",  dùng 2 border nên lỗi?
    borderRadius: "10px",
    padding: "15px",
    width: "380px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    border: "2px solid #D1C4E9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "black",
  },
  gridContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  p: {
    textAlign: "center",
    margin: 0,
    height: "32px",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  button: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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
  },
  pageBtnActive: {
    background: "#BC2626",
    color: "white",
  },
};

export default StaffDuty;
