import Sidebar from "../components/Sidebar";
import React from "react";
import { useState } from "react";
import { updateUser } from "../service/userService";
import { useLocation } from "react-router-dom";

const StudentEdit = () => {
  const location = useLocation();
  const student = location.state?.student;
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };
  const hanleUpdate = async (id, data) => {
    try {
      await updateUser(id, data);
      alert("Cập  nhật thành công !");
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu sinh viên:", error);
    }
  };
  const [formData, setFormData] = useState({
    first_name: student.first_name || "",
    last_name: student.last_name || "",
    gender: student.gender || "",
    student_code: student.student_code || "",
    birth_place: student.birth_place || "",
    dob: student.dob || "",
    phone_number: student.phone_number || "",
    email: student.email || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFullNameChange = (e) => {
    const fullName = e.target.value.trim();
    const nameParts = fullName.split(" ");
    const firstName = nameParts.slice(0, -1).join(" "); // Tất cả trừ từ cuối
    const lastName = nameParts.slice(-1).join(); // Từ cuối cùng

    setFormData((prev) => ({
      ...prev,
      first_name: firstName,
      last_name: lastName,
    }));
  };
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
                  defaultValue={`${formData.first_name} ${formData.last_name}`}
                  style={styles.input}
                  onChange={handleFullNameChange}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Giới tính:</label>
                <select
                  onChange={handleChange}
                  defaultValue={formData.gender}
                  style={styles.input}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Mã sinh viên:</label>
                <input
                  type="text"
                  defaultValue={formData.student_code}
                  style={styles.input}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Quê quán:</label>
                <input
                  type="text"
                  name="birth_place"
                  defaultValue={formData.birth_place}
                  style={styles.input}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={styles.column}>
              <div style={styles.field}>
                <label style={styles.label}>Ngày sinh:</label>
                <input
                  type="text"
                  defaultValue={formatDate(formData.dob)}
                  style={styles.input}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>SDT:</label>
                <input
                  type="text"
                  defaultValue={formData.phone_number}
                  style={styles.input}
                  onChange={handleChange}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Email:</label>
                <input
                  type="text"
                  defaultValue={formData.email}
                  style={styles.input}
                  onChange={handleChange}
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
                <span style={styles.input}>#20462</span>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Ngày bắt đầu:</label>
                <span style={styles.input}>01/09/2024</span>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Khu ký túc:</label>
                <span style={styles.input}>Khu A</span>
              </div>
            </div>

            <div style={styles.column}>
              <div style={styles.field}>
                <label style={styles.label}>Trạng thái:</label>
                <span style={styles.input}>Còn hạn</span>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Ngày kết thúc:</label>
                <span style={styles.input}>30/06/2025</span>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Số phòng:</label>
                <span style={styles.input}>101</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={() => hanleUpdate(student.id, formData)}
            style={styles.saveButton}
          >
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
    marginLeft: "30%",
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
    marginLeft: "33%",
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
    marginTop: "10px",
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
    marginRight: "20px",
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
