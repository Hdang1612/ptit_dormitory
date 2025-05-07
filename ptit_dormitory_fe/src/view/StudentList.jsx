import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/TopStudentList";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const navigate = useNavigate();
  const handleInfor = () => {
    navigate("/student-infor");
  };
  const students = [
    {
      id: "SV001",
      name: "Nguyễn Văn A",
      studentId: "2021001",
      phone: "0987654xxx",
      email: "a@example.com",
      hometown: "Hà Nội",
    },
    {
      id: "SV002",
      name: "Trần Thị B",
      studentId: "2021002",
      phone: "0976543xxx",
      email: "b@example.com",
      hometown: "Hải Phòng",
    },
    {
      id: "SV003",
      name: "Lê Văn C",
      studentId: "2021003",
      phone: "0965432xxx",
      email: "c@example.com",
      hometown: "Đà Nẵng",
    },
    {
      id: "SV004",
      name: "Phạm Văn D",
      studentId: "2021004",
      phone: "0954321xxx",
      email: "d@example.com",
      hometown: "Huế",
    },
    {
      id: "SV005",
      name: "Hoàng Thị E",
      studentId: "2021005",
      phone: "0943210xxx",
      email: "e@example.com",
      hometown: "Sài Gòn",
    },
    {
      id: "SV006",
      name: "Đặng Văn F",
      studentId: "2021006",
      phone: "0932109xxx",
      email: "f@example.com",
      hometown: "Cần Thơ",
    },
    {
      id: "SV007",
      name: "Ngô Thị G",
      studentId: "2021007",
      phone: "0921098xxx",
      email: "g@example.com",
      hometown: "Bắc Giang",
    },
    {
      id: "SV008",
      name: "Bùi Văn H",
      studentId: "2021008",
      phone: "0910987xxx",
      email: "h@example.com",
      hometown: "Nam Định",
    },
    {
      id: "SV009",
      name: "Vũ Thị L",
      studentId: "2021009",
      phone: "0909876xxx",
      email: "l@example.com",
      hometown: "Thanh Hóa",
    },
    {
      id: "SV010",
      name: "Dương Văn M",
      studentId: "2021010",
      phone: "0898765xxx",
      email: "m@example.com",
      hometown: "Nghệ An",
    },
  ];

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={styles.container}>
      <Sidebar role="admin" username="Hoàng Dũng" />
      <div style={styles.content}>
        <h2 style={styles.title}>Danh sách sinh viên</h2>
        <div style={styles.tableContainer}>
          <DataTable />
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Họ và tên</th>
                <th style={styles.th}>Mã sinh viên</th>
                <th style={styles.th}>Số điện thoại</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Quê quán</th>
                <th style={styles.th}>Thông tin</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{student.id}</td>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.studentId}</td>
                  <td style={styles.td}>{student.phone}</td>
                  <td style={styles.td}>{student.email}</td>
                  <td style={styles.td}>{student.hometown}</td>
                  <td style={styles.td}>
                    <button style={styles.viewBtn} onClick={handleInfor}>
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
            {[
              ...Array(Math.ceil(students.length / studentsPerPage)).keys(),
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
                currentPage === Math.ceil(students.length / studentsPerPage)
              }
            >
              Sau
            </button>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.addButton}>Thêm sinh viên</button>
          <button style={styles.updateButton}>Cập nhật từ Excel</button>
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
    marginTop: "10px",
    marginRight: "10px",
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
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  updateButton: {
    padding: "10px 20px",
    backgroundColor: "#BC2626",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "10px",
  },
};

export default StudentList;
