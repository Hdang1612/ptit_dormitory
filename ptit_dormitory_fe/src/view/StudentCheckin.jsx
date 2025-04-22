import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopStudentCheckin from "../components/TopStudentCheckin";

const studentData = [
  { name: "Nguyễn Văn A", studentId: "B21DCPT001" },
  { name: "Trần Thị B", studentId: "B21DCPT002" },
  { name: "Lê Văn C", studentId: "B21DCPT003" },
  { name: "Phạm Thị D", studentId: "B21DCPT004" },
  { name: "Hoàng Văn E", studentId: "B21DCPT005" },
  { name: "Đỗ Thị F", studentId: "B21DCPT006" },
  { name: "Ngô Văn G", studentId: "B21DCPT007" },
  { name: "Vũ Thị H", studentId: "B21DCPT008" },
];

const StudentCheckin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6;

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = studentData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <Sidebar role="nguoitruc" username="Nguyễn Thị B" />
      <div style={styles.content}>
        <h2 style={styles.title}>Điểm danh phòng</h2>

        <TopStudentCheckin />

        <div style={styles.gridContainer}>
          {currentStudents.map((student, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.gridContent}>
                <div style={styles.leftCol}>
                  <div>
                    <strong>Họ và tên:</strong>
                  </div>
                  <div>{student.name}</div>
                </div>

                <div style={styles.buttonGroup}>
                  <button style={styles.buttonPresent}>Có mặt</button>
                  <button style={styles.buttonAbsent}>Vắng</button>
                </div>

                <div style={styles.leftCol}>
                  <strong>Mã sinh viên:</strong> {student.studentId}
                </div>

                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <button style={styles.viewBtn}>Xem thông tin</button>
                </div>
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
          {[
            ...Array(Math.ceil(studentData.length / studentsPerPage)).keys(),
          ].map((number) => (
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
            disabled={
              currentPage === Math.ceil(studentData.length / studentsPerPage)
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
    width: "100%",
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
  card: {
    background: "#F7F6FE",
    border: "2px solid #D1C4E9",
    borderRadius: "10px",
    padding: "20px",
    width: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    color: "black",
  },
  gridContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  leftCol: {
    marginLeft: "20px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  buttonPresent: {
    backgroundColor: "#1F9254",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "48%",
  },
  buttonAbsent: {
    backgroundColor: "#A30D11",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "48%",
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
  },
  pageBtnActive: {
    background: "#BC2626",
    color: "white",
  },
};

export default StudentCheckin;
