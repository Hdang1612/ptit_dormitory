import React, { useState, useEffect } from "react";
import "../style/CancelContract.css";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CancelContract() {
  const { id } = useParams(); // Get contract ID from URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    student_code: "",
    class_code: "",
    school_year: "",
    major: "",
    phone_number: "",
    contractId: "",
    area: "",
    room: "",
    floor: "",
    apply_date: "",
    expired_date: "",
    resonCancel: "",
    studentNote: "",
  });

  const [showPrintView, setShowPrintView] = useState(false);

  useEffect(() => {
    const fetchContractDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/contract/fetch/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const contractData = response.data.data;
          const studentData = contractData.student;

          // Format dates for input fields
          const formatDate = (dateStr) => {
            if (!dateStr) return "";
            const date = new Date(dateStr);
            return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
          };

          setFormData({
            full_name: studentData?.full_name || "",
            student_code: studentData?.student_code || "",
            class_code: studentData?.class_code || "",
            school_year: studentData?.school_year || "",
            major: studentData?.major || "",
            phone_number: studentData?.phone_number || "",
            contractId: contractData?.id || "",
            area: studentData?.area || "",
            room: studentData?.room || "",
            floor: studentData?.floor || "",
            apply_date: formatDate(studentData?.apply_date),
            expired_date: formatDate(studentData?.expired_date),
            resonCancel: "", // User will input this
            studentNote: "", // User will input this
          });
        } else {
          setError("Không thể tải thông tin hợp đồng");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Đã xảy ra lỗi khi tải thông tin hợp đồng");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchContractDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPrintView(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setShowPrintView(false);
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(`/thongtinhopdong/${id}`);
  };

  if (loading) {
    return (
      <div className="app-container">
        <Sidebar role="admin" username="Hoàng Dũng" />
        <div className="main-content">
          <div className="loading-container">
            <p>Đang tải thông tin hợp đồng...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <Sidebar role="admin" username="Hoàng Dũng" />
        <div className="main-content">
          <div className="error-container">
            <p>{error}</p>
            <button onClick={() => navigate("/danhsachhopdong")}>
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Print view

  return (
    <div className="app-container">
      <Sidebar role="admin" username="Hoàng Dũng" />
      <div className="main-content">
        <div className="form-container">
          <h2>Hủy hợp đồng</h2>
          {showPrintView ? (
            <div>
              <div className="print-container">
                <div className="print-document">
                  <div className="header">
                    <div className="school-info">
                      <h2 style={{ marginLeft: "240px" }}>
                        HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG
                      </h2>
                      <p style={{ marginLeft: "400px" }}>
                        Km10, Đường Nguyễn Trãi, Hà Đông, Hà Nội
                      </p>
                      <p style={{ marginLeft: "350px" }}>
                        Tel: 024-33525248 (B5); 33510435 (B2), 33501463 (B1)
                      </p>
                      <p className="date" style={{ marginLeft: "400px" }}>
                        Hà Nội, ngày {new Date().getDate()} tháng{" "}
                        {new Date().getMonth() + 1} năm{" "}
                        {new Date().getFullYear()}
                      </p>
                    </div>
                  </div>

                  <div className="document-title">
                    <h2>PHIẾU BÁO TẠM THỜI DỪNG LƯU TRÚ KTX </h2>
                    <p className="document-number" align="center">
                      Số:...... Kỳ I (2024-2025)
                    </p>
                  </div>

                  <div className="recipient" align="center">
                    <p>
                      <strong>Kính gửi:</strong> - Học viện Công nghệ Bưu chính
                      Viễn thông
                    </p>
                    <p>- Trung tâm Dịch vụ - KTX</p>
                  </div>

                  <div className="content">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan="2" style={{ paddingLeft: "70px" }}>
                            Tên sinh viên: {formData.full_name}
                          </td>
                          <td colSpan="4">
                            Điện thoại: {formData.phone_number}
                          </td>
                        </tr>
                        <tr align="center">
                          <td width="34%">Lớp: {formData.class_code}</td>
                          <td width="33%">Khóa: {formData.school_year}</td>
                          <td width="33%">Mã SV: {formData.student_code}</td>
                        </tr>
                        <tr align="center">
                          <td width="34%">KTX (Nhà): {formData.area}....</td>
                          <td width="33%">Tầng: {formData.floor}....</td>

                          <td width="33%">
                            Phòng ở hiện tại: {formData.room}....
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="6" style={{ paddingLeft: "60px" }}>
                            Đề nghị được tạm dừng lưu trú KTX sinh viên của Học
                            viện kể từ ngày: từ ngày{" "}
                            {new Date(formData.apply_date).toLocaleDateString(
                              "vi-VN"
                            )}{" "}
                            đến ngày{" "}
                            {new Date(formData.expired_date).toLocaleDateString(
                              "vi-VN"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="6" style={{ paddingLeft: "60px" }}>
                            <p>
                              <strong>Lý do: </strong>
                            </p>
                            <p>{formData.resonCancel}</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="6" style={{ paddingLeft: "60px" }}>
                            <p>
                              <strong>
                                Các tài sản có giá trị để lại tại phòng ở KTX
                              </strong>{" "}
                              (Ghi rõ: Không có hoặc Có kèm theo mô tả cụ thể)
                            </p>
                            <p>{formData.studentNote}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="commitment">
                    <p style={{ marginTop: "5px" }}>
                      <strong>
                        Tôi cam kết thực hiện đúng các quy định liên quan của
                        Học viện.
                      </strong>
                    </p>
                  </div>

                  <div className="signatures">
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td width="33%" align="center">
                            <p>
                              <strong>KT.GIÁM ĐỐC</strong>
                            </p>
                            <p>
                              <strong>PHÓ GIÁM ĐỐC</strong>
                            </p>
                            <p>(Ký, ghi rõ họ tên)</p>
                            <div className="signature-space"></div>
                            <p></p>
                          </td>
                          <td width="34%" align="center">
                            <p>
                              <strong>NGƯỜI VIẾT ĐƠN</strong>
                            </p>
                            <p>(Ký, ghi rõ họ tên)</p>
                            <div className="signature-space"></div>
                            <p>{formData.full_name}</p>
                          </td>
                        </tr>

                        <tr>
                          <td width="33%" align="center">
                            <p>{"."}</p>
                            <p>
                              <strong>CÁN BỘ QUẢN LÝ KTX </strong>
                            </p>

                            <p>
                              (ghi ý kiến(nếu có) và xác nhận về việc tiếp nhận
                              bàn giao và sinh viên rời khỏi KTX)
                            </p>
                            <div className="signature-space"></div>
                            <p></p>
                          </td>
                          <td width="34%" align="center">
                            <p>
                              <strong>TỔ QUẢN LÝ</strong>
                            </p>
                            <p>(Ký xác nhận)</p>
                            <div className="signature-space"></div>
                            <p></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="footer">
                    <p>
                      -------------------------------------------------------------
                    </p>
                    <p className="note">
                      Đơn này được lưu kèm cùng bản cam kết tại Tổ phận quản lý
                      KTX
                    </p>
                  </div>

                  <div className="print-controls no-print">
                    <button className="print-btn" onClick={handlePrint}>
                      In đơn
                    </button>
                    <button className="back-btn" onClick={handleBack}>
                      Quay lại chỉnh sửa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Thông tin sinh viên</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label>Họ tên sinh viên</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Lớp</label>
                    <input
                      type="text"
                      name="class_code"
                      value={formData.class_code}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Mã sinh viên</label>
                    <input
                      type="text"
                      name="student_code"
                      value={formData.student_code}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Khóa</label>
                    <input
                      type="text"
                      name="school_year"
                      value={formData.school_year}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Thông tin hợp đồng</h3>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Mã hợp đồng</label>
                    <input
                      type="text"
                      name="contractId"
                      value={formData.contractId}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Khu ký túc xá</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Tầng</label>
                    <input
                      type="text"
                      name="floor"
                      value={formData.floor}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Phòng</label>
                    <input
                      type="text"
                      name="room"
                      value={formData.room}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ngày bắt đầu</label>
                    <input
                      type="date"
                      name="apply_date"
                      value={formData.apply_date}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Ngày kết thúc</label>
                    <input
                      type="date"
                      name="expired_date"
                      value={formData.expired_date}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Lý do hủy</label>
                    <textarea
                      name="resonCancel"
                      value={formData.resonCancel}
                      onChange={handleChange}
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>
                      Các tài sản có giá trị để lại tại phòng ở KTX{" "}
                    </label>
                    <textarea
                      name="studentNote"
                      value={formData.studentNote}
                      onChange={handleChange}
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="reset-btn"
                  onClick={handleCancel}
                >
                  Hủy
                </button>
                <button type="submit" className="submit-btn">
                  Lưu
                </button>
                <button type="submit" className="print-preview-btn">
                  In đơn
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CancelContract;
