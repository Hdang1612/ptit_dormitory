import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/TopStudentList";
import StudentInfo from "./StudentInfo";
import { useNavigate } from "react-router-dom";
import {
  importVietnameseStudents,
  fetchUsers,
  getUserById,
} from "../service/userService";

const StudentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // Để lưu tổng số trang
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [showAreaOptions, setShowAreaOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const handleInfor = async (id) => {
    try {
      const { data } = await getUserById(id);
      navigate(`/student/${id}`, { state: { student: data } });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sinh viên:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const { data, pagination } = await fetchUsers({
        page: currentPage,
        limit: limit,
      });
      setStudents(data);
      setTotal(pagination.total);
      setTotalPages(pagination.totalPages);
      setCurrentPage(pagination.currentPage);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);
  // Xác định các trang hiển thị trong thanh phân trang
  const getPagesToDisplay = () => {
    const totalPagesToShow = 4;
    let start = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
    let end = start + totalPagesToShow - 1;

    // Nếu end vượt quá tổng số trang thì dịch ngược start
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - totalPagesToShow + 1);
    }

    // Tạo mảng các trang
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Chuyển đến trang mới
  };
  // Xử lý khi chọn khu vực
  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImportClick = async () => {
    if (!selectedFile || !selectedArea) {
      alert("Vui lòng chọn khu vực và file để import.");
      return;
    }

    setLoading(true);

    try {
      await importVietnameseStudents(selectedFile, selectedArea);
      alert("Cập nhật thành công!");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
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
              {students.map((student, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{student.id}</td>
                  <td style={styles.td}>
                    {student.first_name} {student.last_name}
                  </td>
                  <td style={styles.td}>{student.student_code}</td>
                  <td style={styles.td}>{student.phone_number}</td>
                  <td style={styles.td}>{student.email}</td>
                  <td style={styles.td}>{student.hometown}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => handleInfor(student.id)}
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
            {getPagesToDisplay().map((number) => (
              <button
                key={number}
                style={{
                  ...styles.pageBtn,
                  ...(currentPage === number ? styles.pageBtnActive : {}),
                }}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
            <button
              style={styles.pageBtn}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </div>
        {/* Nút Cập nhật từ Excel */}
        <div style={styles.buttonContainer}>
          <button style={styles.addButton}>Thêm sinh viên</button>

          <select
            style={styles.updateButton}
            onChange={(e) => handleAreaSelect(e.target.value)}
            value={selectedArea || ""}
          >
            <option className="text-white" value="" disabled>
              Cập nhật từ Excel
            </option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="B5">B5</option>
          </select>
          {/* Hiển thị nút "Chọn file" khi đã chọn khu vực */}
          {selectedArea && (
            <input
              type="file"
              accept=".xlsx,.xls"
              style={{ padding: "10px", cursor: "pointer" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          )}

          {/* Hiển thị nút "Import" sau khi chọn file */}
          {selectedFile && selectedArea && (
            <div>
              <button
                className="bg-white"
                onClick={handleImportClick}
                disabled={loading} // Vô hiệu hóa nút khi đang loading
                style={{
                  position: "relative",
                  padding: "10px 20px",
                  cursor: loading ? "wait" : "pointer",
                }}
              >
                {loading ? (
                  <div>
                    <span className="visually-hidden">Importing ... </span>
                  </div>
                ) : (
                  "Import"
                )}
              </button>
            </div>
          )}
        </div>

        {loading && <p>Đang tải thông tin sinh viên...</p>}
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
