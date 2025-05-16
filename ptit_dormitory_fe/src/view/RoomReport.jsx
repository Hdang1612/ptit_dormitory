import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const RoomReport = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  const [reports] = useState([
    { id: "1", name: "Nguyễn Văn A", studentId: "SV001", room: "101", attendance: "Đúng" },
    { id: "2", name: "Trần Thị B", studentId: "SV002", room: "102", attendance: "Sai" },
    { id: "3", name: "Lê Văn C", studentId: "SV003", room: "103", attendance: "Chưa điểm danh" },
    { id: "4", name: "Phạm Thị D", studentId: "SV004", room: "104", attendance: "Đúng" },
    { id: "5", name: "Hoàng Văn E", studentId: "SV005", room: "105", attendance: "Sai" },
    { id: "6", name: "Vũ Thị F", studentId: "SV006", room: "106", attendance: "Chưa điểm danh" },
  ]);

  const indexOfLast = currentPage * reportsPerPage;
  const indexOfFirst = indexOfLast - reportsPerPage;
  const currentReports = reports.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const roomComment = "Phòng hoạt động tốt, sinh viên tuân thủ quy định.";
  
  return (
    <div style={styles.container}>
      <Sidebar role="admin" username="Nguyễn Thị B" />
      <div style={styles.content}>
        <h2 style={styles.title}>Báo cáo điểm danh phòng</h2>

        <div style={styles.infoWrapper}>
          <div style={styles.infoBox}>
            <div><strong>Ngày:</strong> 08/04/2025</div>
            <div><strong>Ca trực:</strong> 11:00 - 16:00</div>
            <div><strong>Người trực:</strong> Nguyễn Văn A</div>
            <div><strong>Phòng:</strong> 101</div>
          </div>
          <div style={styles.statsBox}>
            <div><strong>Số lượng điểm danh:</strong> 10</div>
            <div><strong>Đúng:</strong> 8</div>
            <div><strong>Sai:</strong> 2</div>
          </div>
        </div>

        <div style={styles.commentBox}>
          <strong>Nhận xét:</strong> {roomComment}
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Họ và Tên</th>
                <th style={styles.th}>Mã sinh viên</th>
                <th style={styles.th}>Phòng</th>
                <th style={styles.th}>Điểm danh</th>
                <th style={styles.th}>Thông tin</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((r) => (
                <tr key={r.id} style={styles.tr}>
                  <td style={styles.td}>{r.id}</td>
                  <td style={styles.td}>{r.name}</td>
                  <td style={styles.td}>{r.studentId}</td>
                  <td style={styles.td}>{r.room}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          r.attendance === "Đúng"
                            ? "#EBF9F1"
                            : r.attendance === "Sai"
                            ? "#F9D2D3"
                            : "#FEFFE2",
                        color:
                          r.attendance === "Đúng"
                            ? "#1F9254"
                            : r.attendance === "Sai"
                            ? "#A30D11"
                            : "#8D9720",
                      }}
                    >
                      {r.attendance}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => alert(`Xem báo cáo: ${r.id}`)}
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
            {[...Array(Math.ceil(reports.length / reportsPerPage)).keys()].map(
              (num) => (
                <button
                  key={num + 1}
                  style={{
                    ...styles.pageBtn,
                    ...(currentPage === num + 1 ? styles.pageBtnActive : {}),
                  }}
                  onClick={() => paginate(num + 1)}
                >
                  {num + 1}
                </button>
              )
            )}
            <button
              style={styles.pageBtn}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(reports.length / reportsPerPage)}
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh"
},
  content: {
    flex: 1,
    padding: "20px",
    background: "#f0f0f0",
    marginLeft: "220px",
    width: "calc(100% - 220px)"
},
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "24px"
},
  tableContainer: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
},
  table: {
    width: "100%",
    borderColor: "#ccc",
    backgroundColor: "#F7F6FE",
    borderCollapse: "collapse",
    tableLayout: "fixed"
},
  th: {
    padding: "10px",
    textAlign: "center",
    background: "#fff",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    border: "1px solid #ccc"
},
  tr: {
    borderBottom: "1px solid #ddd"
},
  td: {
    padding: "10px",
    textAlign: "center",
    color: "#333",
    border: "1px solid #ccc",
    wordWrap: "break-word"
},
  status: {
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold"
},
  viewBtn: {
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer"
},
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px"
},
  pageBtn: {
    background: "#fff",
    color: "#9E9E9E",
    border: "none",
    padding: "8px 16px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.2s"
},
  pageBtnActive: {
    background: "#BC2626",
    color: "white"
},
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "20px",
    marginBottom:"20px",
  },
  viewReportButton: {
    padding: "10px 20px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "50px",
  },
  infoWrapper: {
    display: "flex",
    justifyContent: "space-between",
    background: "#ffffff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    gap: "40px"
  },
  infoBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px"
  },
  statsBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "20px"
  },
  commentBox: {
    background: "#fff7e6",
    padding: "15px",
    borderRadius:"8px",
    border: "1px solid #ffd699",
    marginBottom: "20px",
    fontSize: "16px"
  },

};

export default RoomReport;