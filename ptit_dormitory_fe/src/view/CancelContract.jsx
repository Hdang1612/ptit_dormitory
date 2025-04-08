import React, { useState } from "react";
import "../style/CancelContract.css";
import Sidebar from "../components/Sidebar";

function CancelContract() {
  const [formData, setFormData] = useState({
    studentName: "",
    birthDate: "",
    studentId: "",
    gender: "",
    class: "",
    faculty: "",
    khoa: "",
    idNumber: "",
    nganh: "",
    nationality: "",
    hometown: "",
    cityProvince: "",
    residentialAddress: "",
    email: "",
    contractId: "",
    dormitoryArea: "",
    room: "",
    floor: "",
    startDate: "",
    endDate: "",
    renewalDuration: "",
    renewalReason: "",
    studentCommitment: "",
    relativesName: "",
    relativesAddress: "",
    resonCancel: "",
    note: "",
  });

  const [showPrintView, setShowPrintView] = useState(false);

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

  const handleReset = () => {
    setFormData({
      studentName: "",
      birthDate: "",
      studentId: "",
      gender: "",
      class: "",
      faculty: "",
      khoa: "",
      idNumber: "",
      nganh: "",
      nationality: "",
      hometown: "",
      cityProvince: "",
      residentialAddress: "",
      email: "",
      contractId: "",
      dormitoryArea: "",
      room: "",
      startDate: "",
      endDate: "",
      renewalDuration: "",
      renewalReason: "",
      studentCommitment: "",
      fatherName: "",
      fatherNumber: "",
      motherName: "",
      motherNumber: "",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setShowPrintView(false);
  };

  if (showPrintView) {
    return (
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
                  {new Date().getMonth() + 1} năm {new Date().getFullYear()}
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
                <strong>Kính gửi:</strong> - Học viện Công nghệ Bưu chính Viễn
                thông
              </p>
              <p>- Trung tâm Dịch vụ - KTX</p>
            </div>

            <div className="content">
              <table>
                <tbody>
                  <tr>
                    <td colSpan="2" style={{ paddingLeft: "70px" }}>
                      Tên sinh viên: {formData.studentName}
                    </td>
                    <td colSpan="4">Điện thoại: {formData.hometown}</td>
                  </tr>
                  <tr align="center">
                    <td width="34%">Lớp: {formData.class}</td>
                    <td width="33%">Khóa: {formData.khoa}</td>
                    <td width="33%">Mã SV: {formData.studentId}</td>
                  </tr>
                  <tr align="center">
                    <td width="34%">KTX (Nhà): {formData.dormitoryArea}....</td>
                    <td width="33%">Tầng: {formData.floor}....</td>

                    <td width="33%">Phòng ở hiện tại: {formData.room}....</td>
                  </tr>

                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      Đề nghị được tạm dừng lưu trú KTX sinh viên của Học viện
                      kể từ ngày: từ ngày{" "}
                      {new Date(formData.startDate).toLocaleDateString("vi-VN")}{" "}
                      đến ngày{" "}
                      {new Date(formData.endDate).toLocaleDateString("vi-VN")}
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
                      <p>{formData.note}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="commitment">
              <p style={{ marginTop: "5px" }}>
                <strong>
                  Tôi cam kết thực hiện đúng các quy định liên quan của Học
                  viện.
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
                      <p>{formData.studentName}</p>
                    </td>
                  </tr>

                  <tr>
                    <td width="33%" align="center">
                      <p>{"."}</p>
                      <p>
                        <strong>CÁN BỘ QUẢN LÝ KTX </strong>
                      </p>

                      <p>
                        (ghi ý kiến(nếu có) và xác nhận về việc tiếp nhận bàn
                        giao và sinh viên rời khỏi KTX)
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
                Đơn này được lưu kèm cùng bản cam kết tại Tổ phận quản lý KTX
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
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="form-container">
          <h2>Hủy hợp đồng</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Thông tin sinh viên</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Họ tên sinh viên</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Lớp</label>
                  <input
                    type="text"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mã sinh viên</label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Khóa</label>
                  <input
                    type="text"
                    name="khoa"
                    value={formData.khoa}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Khu ký túc xá</label>
                  <select
                    name="dormitoryArea"
                    value={formData.dormitoryArea}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="B5">B5</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tầng</label>
                  <input
                    type="text"
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phòng</label>
                  <input
                    type="text"
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tạm dừng từ ngày</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Đến ngày</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
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
                  ></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label>Các tài sản có giá trị để lại tại phòng ở KTX </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="reset-btn">
                Hủy
              </button>
              <button type="button" className="submit-btn">
                Lưu
              </button>
              <button type="submit" className="print-preview-btn">
                In đơn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CancelContract;
