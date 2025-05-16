import React from "react";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// StudentInfo nhận props `student` để hiển thị thông tin sinh viên
const StudentInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;

  if (!student) return <p>Không có thông tin sinh viên!</p>;
  const handleUpdate = (id) => {
    console.log(">>>");
    navigate(`/student-edit/${id}`, { state: { student: student } });
  };

  return (
    <div style={styles.container}>
      <Sidebar role="admin" username="Hoàng Dũng" />

      <div style={styles.content}>
        <h2 style={styles.title}>Thông tin sinh viên</h2>

        <div style={styles.card}>
          <div style={styles.gridContainer}>
            <div style={styles.column}>
              <div style={styles.image}></div>
            </div>

            <div style={styles.column}>
              <p>
                <strong>Họ và tên:</strong> {student.first_name}{" "}
                {student.last_name}
              </p>
              <p>
                <strong>Giới tính:</strong> {student.gender || "Chưa cập nhật"}
              </p>
              <p>
                <strong>Mã sinh viên:</strong>{" "}
                {student.student_code || "Chưa cập nhật"}
              </p>
              <p>
                <strong>Quê quán:</strong>{" "}
                {student.birth_place || "Chưa cập nhật"}
              </p>
            </div>

            <div style={styles.column}>
              <p>
                <strong>Ngày sinh:</strong> {formatDate(student.dob)}
              </p>
              <p>
                <strong>SDT:</strong> {student.phone_number || "Chưa cập nhật"}
              </p>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
            </div>
          </div>

          {/* Contract Info (Nếu có) */}
          <hr style={styles.hr} />
          <h3 style={styles.subTitle}>Thông tin hợp đồng</h3>
          <div style={styles.gridContainer2}>
            <div style={styles.column}>
              <p>
                <strong>Mã hợp đồng:</strong> #20462
              </p>
              <p>
                <strong>Ngày bắt đầu:</strong> 01/09/2024
              </p>
              <p>
                <strong>Khu ký túc:</strong> Khu A
              </p>
            </div>

            <div style={styles.column}>
              <p>
                <strong>Trạng thái:</strong> Còn hạn
              </p>
              <p>
                <strong>Ngày kết thúc:</strong> 30/06/2025
              </p>
              <p>
                <strong>Số phòng:</strong> 101
              </p>
            </div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button
            style={styles.editButton}
            onClick={() => handleUpdate(student.id)}
          >
            Chỉnh sửa
          </button>
          <button style={styles.deleteButton}>Xóa sinh viên</button>
        </div>
      </div>
    </div>
  );
};

// Format ngày sinh (dd/mm/yyyy)
const formatDate = (dateString) => {
  if (!dateString) return "Chưa cập nhật";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
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
    marginBottom: "40px",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    marginLeft: "225px",
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
    marginLeft: "350px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "150px",
    height: "225px",
    backgroundColor: "#e0e0e0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginLeft: "225px",
    marginRight: "225px",
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
    marginTop: "20px",
  },
  deleteButton: {
    padding: "10px 20px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  editButton: {
    padding: "10px 20px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default StudentInfo;
