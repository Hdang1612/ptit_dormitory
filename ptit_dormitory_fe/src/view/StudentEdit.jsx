import Sidebar from "../components/Sidebar";
import React from "react";

const StudentEdit = () => {
    return (
      <div style={styles.container}>
        <Sidebar />
  
        <div style={styles.content}>
          <h2 style={styles.title}>Chỉnh sửa thông tin sinh viên</h2>
          <div style={styles.card}>
            <div style={styles.gridContainer}>
              <div style={styles.column}>
                <div style={styles.image}></div>
              </div>
  
              <div style={styles.column}>
                <div style={styles.field}>
                  <label style={styles.label}>Họ và tên:</label>
                  <input
                    type="text"
                    defaultValue="Nguyễn Văn A"
                    style={styles.input}
                  />
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>Giới tính:</label>
                  <select defaultValue="Nam" style={styles.input}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>Mã sinh viên:</label>
                  <input
                    type="text"
                    defaultValue="B21DCPTxxx"
                    style={styles.input}
                  />
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>Quê quán:</label>
                  <input
                    type="text"
                    defaultValue="Hà Nội"
                    style={styles.input}
                  />
                </div>
              </div>
  
              <div style={styles.column}>
                <div style={styles.field}>
                  <label style={styles.label}>Ngày sinh:</label>
                  <input
                    type="text"
                    defaultValue="dd/mm/yyyy"
                    style={styles.input}
                  />
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>SDT:</label>
                  <input
                    type="text"
                    defaultValue="0912345678"
                    style={styles.input}
                  />
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>Email:</label>
                  <input
                    type="text"
                    defaultValue="nguyenvanA@gmail.com"
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
  
            <hr style={styles.hr} />
            <h3 style={styles.subTitle}>Thông tin hợp đồng</h3>
            <div style={styles.gridContainer2}>
              <div style={styles.column}>
                <div style={styles.field}>
                  <label style={styles.label}>Mã hợp đồng:</label>
                  <input
                    type="text"
                    defaultValue="#20462"
                    style={styles.input}
                  />
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>Ngày bắt đầu:</label>
                  <input
                    type="text"
                    defaultValue="01/09/2024"
                    style={styles.input}
                  />
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>Khu ký túc:</label>
                  <input
                    type="text"
                    defaultValue="Khu A"
                    style={styles.input}
                  />
                </div>
              </div>
  
              <div style={styles.column}>
                <div style={styles.field}>
                  <label style={styles.label}>Trạng thái:</label>
                  <input
                    type="text"
                    defaultValue="Còn hạn"
                    style={styles.input}
                  />
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>Ngày kết thúc:</label>
                  <input
                    type="text"
                    defaultValue="30/06/2025"
                    style={styles.input}
                  />
                </div>
  
                <div style={styles.field}>
                  <label style={styles.label}>Số phòng:</label>
                  <input
                    type="text"
                    defaultValue="101"
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
          </div>
  
          <div style={styles.buttonContainer}>
            <button style={styles.saveButton}>Lưu</button>
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
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontWeight: "bold",
      fontSize: "24px",
    },
    subTitle: {
        fontSize: "18px",
        fontWeight: "600",
        marginBottom: "20px",
        marginLeft:"30%",
    },
    card: {
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    gridContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr", // 3 columns
        gap: "10px",
    },
    gridContainer2: {
        marginLeft:"33%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
    },
    column: {
        display: "flex",
        flexDirection: "column",
    },
    field: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px"
    },
    label: {
          minWidth: "120px",
          fontWeight: "bold",
    },
    input: {
        flex: 1,
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "white",
        marginRight:"20px",
    },
    image: {
        width: "150px",
        height: "225px",
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        border: "1px solid #ccc",
        alignSelf: "center",
    },
    hr: {
        marginTop: "20px",
        marginBottom: "20px",
        border: "0",
        borderTop: "1px solid #ddd",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "50px",
    },
    saveButton: {
      padding: "10px 20px",
      backgroundColor: "#BC2626",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "10%",
    },
};

export default StudentEdit;
