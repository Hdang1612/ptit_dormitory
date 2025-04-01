import React from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/TopTable";

const RegistrationList = () => {
  const data = [
    {
      id: "#20462",
      name: "Nguyễn Văn A",
      roomType: "4 người / phòng",
      dorm: "KTX A",
      duration: "01/09/2024 - 30/06/2025",
      addedDate: "13/05/2022",
      status: "Đã duyệt",
    },
    {
      id: "#20463",
      name: "Nguyễn Văn B",
      roomType: "2 người / phòng",
      dorm: "KTX B",
      duration: "01/09/2024 - 30/06/2025",
      addedDate: "13/05/2022",
      status: "Chưa duyệt",
    },
    {
      id: "#20464",
      name: "Nguyễn Văn C",
      roomType: "1 người / phòng",
      dorm: "KTX C",
      duration: "01/09/2024 - 30/06/2025",
      addedDate: "13/05/2022",
      status: "Đã duyệt",
    },
  ];

  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.content}>
        <h2 style={styles.title}>Danh sách đơn đăng ký lưu trú</h2>

        <div style={styles.tableContainer}>
          <DataTable />
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Mã đơn</th>
                <th style={styles.th}>Họ tên</th>
                <th style={styles.th}>Loại phòng</th>
                <th style={styles.th}>Khu ký túc</th>
                <th style={styles.th}>Thời hạn lưu trú</th>
                <th style={styles.th}>Ngày thêm</th>
                <th style={styles.th}>Trạng thái</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{item.id}</td>
                  <td style={styles.td}>{item.name}</td>
                  <td style={styles.td}>{item.roomType}</td>
                  <td style={styles.td}>{item.dorm}</td>
                  <td style={styles.td}>{item.duration}</td>
                  <td style={styles.td}>{item.addedDate}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          item.status === "Đã duyệt" ? "#d4edda" : "#f8d7da",
                        color:
                          item.status === "Đã duyệt" ? "#155724" : "#721c24",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={styles.viewBtn}>Sửa</button>
                    <button style={styles.deleteBtn}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={styles.pagination}>
            <button style={styles.pageBtn}>Trước</button>
            <button style={{ ...styles.pageBtn, ...styles.pageBtnActive }}>
              1
            </button>
            <button style={styles.pageBtn2}>2</button>
            <button style={styles.pageBtn2}>3</button>
            <button style={styles.pageBtn}>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  content: {
    flex: 1,
    padding: "40px 20px 20px 20px",
    background: "#f0f0f0",
    marginLeft: "220px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  tableContainer: {
    background: "white",
    padding: "20px",
    borderRadius: "10px ",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderColor: "#ccc",
    // borderCollapse: "collapse",
    marginTop: "10px",
    backgroundColor: "#F7F6FE",
  },
  th: {
    padding: "10px",
    textAlign: "left",
    background: "#fff",
    color: "#000",
    fontWeight: "bold",
    fontSize: "18px",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "10px",
    color: "#333",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  viewBtn: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#BC2626",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "5px",
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
  pageBtn2: {
    background: "#E0E0E0",
    color: "#000",
    border: "none",
    padding: "8px 16px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.2s",
  },

  pageBtnHover: {
    background: "#0056b3",
  },
  pageBtnActive: {
    background: "#BC2626",
    color: "white",
  },
};

export default RegistrationList;
