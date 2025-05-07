import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopShiftSchedule from "../components/TopShiftSchedule";

const ShiftSchedule = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const shiftsPerPage = 5;

  const [shifts, setShifts] = useState([
    {
      id: "1",
      date: "2025-04-08",
      shiftTime: "08:00 - 12:00",
      floor: "1",
      staff: "",
    },
    {
      id: "2",
      date: "2025-04-08",
      shiftTime: "13:00 - 17:00",
      floor: "2",
      staff: "",
    },
    {
      id: "3",
      date: "2025-04-09",
      shiftTime: "17:00 - 22:00",
      floor: "3",
      staff: "",
    },
    {
      id: "4",
      date: "2025-04-10",
      shiftTime: "08:00 - 12:00",
      floor: "1",
      staff: "",
    },
    {
      id: "5",
      date: "2025-04-10",
      shiftTime: "13:00 - 17:00",
      floor: "2",
      staff: "",
    },
    {
      id: "6",
      date: "2025-04-10",
      shiftTime: "17:00 - 22:00",
      floor: "3",
      staff: "",
    },
    {
      id: "7",
      date: "2025-04-11",
      shiftTime: "08:00 - 12:00",
      floor: "1",
      staff: "",
    },
    {
      id: "8",
      date: "2025-04-11",
      shiftTime: "13:00 - 17:00",
      floor: "2",
      staff: "",
    },
  ]);

  const staffOptions = [
    "Nguyễn Văn A",
    "Nguyễn Văn B",
    "Nguyễn Văn C",
    "Nguyễn Văn D",
  ];

  const indexOfLastShift = currentPage * shiftsPerPage;
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  const currentShifts = shifts.slice(indexOfFirstShift, indexOfLastShift);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleStaffChange = (index, value) => {
    const updatedShifts = [...shifts];
    const shiftIndex = indexOfFirstShift + index;
    updatedShifts[shiftIndex].staff = value;
    setShifts(updatedShifts);
  };

  const handleSave = () => {
    alert("Đã lưu lịch trực!");
    // TODO: Gửi dữ liệu lên server hoặc lưu vào localStorage
  };

  return (
    <div style={styles.container}>
      <Sidebar role="nguoitruc" username="Nguyễn Thị B" />
      <div style={styles.content}>
        <h2 style={styles.title}>Sắp xếp ca trực</h2>

        <TopShiftSchedule />

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Ngày</th>
                <th style={styles.th}>Ca trực</th>
                <th style={styles.th}>Tầng</th>
                <th style={styles.th}>Người trực</th>
              </tr>
            </thead>
            <tbody>
              {currentShifts.map((shift, index) => (
                <tr key={shift.id} style={styles.tr}>
                  <td style={styles.td}>{shift.id}</td>
                  <td style={styles.td}>{shift.date}</td>
                  <td style={styles.td}>{shift.shiftTime}</td>
                  <td style={styles.td}>{shift.floor}</td>
                  <td style={styles.td}>
                    <select
                      value={shift.staff}
                      onChange={(e) => handleStaffChange(index, e.target.value)}
                      style={styles.select}
                    >
                      <option value="">-- Chọn --</option>
                      {staffOptions.map((name, idx) => (
                        <option key={idx} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
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
          <button style={styles.saveButton} onClick={handleSave}>
            Lưu
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
  select: {
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "white",
    color: "black",
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
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "100px",
    marginTop: "20px",
  },
};

export default ShiftSchedule;
