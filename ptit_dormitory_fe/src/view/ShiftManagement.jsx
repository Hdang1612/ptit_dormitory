import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopShiftSchedule from "../components/TopShiftSchedule";
import { useNavigate } from "react-router-dom";

const ShiftManagement = () => {
  const navigate = useNavigate();
  const handleArrange = () => {
    navigate("/shiftschedule");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 5;

  const [shifts, setShifts] = useState([
    {
      id: "1",
      name: "Nguyễn Văn A",
      date: "2025-04-08",
      shiftTime: "11:00 - 16:00",
      attendance: "Chưa điểm danh",
      report: "Không có",
    },
    {
      id: "2",
      name: "Nguyễn Văn B",
      date: "2025-04-08",
      shiftTime: "11:00 - 16:00",
      attendance: "Đã điểm danh",
      report: "Xem",
    },
    {
      id: "3",
      name: "Nguyễn Văn C",
      date: "2025-04-09",
      shiftTime: "11:00 - 16:00",
      attendance: "Chưa điểm danh",
      report: "Chưa tạo",
    },
    {
      id: "4",
      name: "Nguyễn Văn D",
      date: "2025-04-09",
      shiftTime: "11:00 - 16:00",
      attendance: "Ngoài giờ",
      report: "Chưa tạo",
    },
    {
      id: "5",
      name: "Nguyễn Văn A",
      date: "2025-04-10",
      shiftTime: "11:00 - 16:00",
      attendance: "Ngoài giờ",
      report: "Chưa tạo",
    },
    {
      id: "6",
      name: "Nguyễn Văn B",
      date: "2025-04-10",
      shiftTime: "11:00 - 16:00",
      attendance: "Ngoài giờ",
      report: "Chưa tạo",
    },
  ]);

  const indexOfLast = currentPage * shiftsPerPage;
  const indexOfFirst = indexOfLast - shiftsPerPage;
  const currentShifts = shifts.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <Sidebar role="nguoitruc" username="Nguyễn Thị B" />
      <div style={styles.content}>
        <h2 style={styles.title}>Quản lý ca trực</h2>

        <TopShiftSchedule />

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Họ và Tên</th>
                <th style={styles.th}>Ngày</th>
                <th style={styles.th}>Ca trực</th>
                <th style={styles.th}>Điểm danh trực</th>
                <th style={styles.th}>Báo cáo</th>
                <th style={styles.th}>Thông tin</th>
              </tr>
            </thead>
            <tbody>
              {currentShifts.map((shift) => (
                <tr key={shift.id} style={styles.tr}>
                  <td style={styles.td}>{shift.id}</td>
                  <td style={styles.td}>{shift.name}</td>
                  <td style={styles.td}>{shift.date}</td>
                  <td style={styles.td}>{shift.shiftTime}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          shift.attendance === "Đã điểm danh"
                            ? "#EBF9F1"
                            : shift.attendance === "Chưa điểm danh"
                            ? "#F9D2D3"
                            : "#FEFFE2",
                        color:
                          shift.attendance === "Đã điểm danh"
                            ? "#1F9254"
                            : shift.attendance === "Chưa điểm danh"
                            ? "#A30D11"
                            : "#8D9720",
                      }}
                    >
                      {shift.attendance}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {shift.report === "Xem" ? (
                      <button
                        style={styles.viewBtn}
                        onClick={() => alert(`Xem báo cáo: ${shift.id}`)}
                      >
                        Xem
                      </button>
                    ) : (
                      shift.report
                    )}
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => alert(`Xem thông tin: ${shift.id}`)}
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.pagination}>
            <button
              style={styles.pageBtn}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            {[...Array(Math.ceil(shifts.length / shiftsPerPage)).keys()].map(
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
                currentPage === Math.ceil(shifts.length / shiftsPerPage)
              }
            >
              Sau
            </button>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.scheduleButton} onClick={handleArrange}>
            Sắp xếp lịch trực
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
    background: "#f0f0f0",
    marginLeft: "220px",
    width: "calc(100% - 220px)",
  },
  title: {
    textAlign: "center",
    marginBottom: "40px",
    color: "#333",
  },
  tableContainer: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderColor: "#ccc",
    backgroundColor: "#F7F6FE",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  th: {
    padding: "10px",
    textAlign: "center",
    background: "#fff",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    border: "1px solid #ccc",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    textAlign: "center",
    color: "#333",
    border: "1px solid #ccc",
    wordWrap: "break-word",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  viewBtn: {
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    padding: "5px 10px",
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
  scheduleButton: {
    padding: "10px 20px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "100px",
    marginTop: "5px",
  },
};

export default ShiftManagement;
