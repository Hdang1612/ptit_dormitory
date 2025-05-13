// ContractRenewalApp.js
import { useEffect } from "react";
import React, { useState } from "react";
import "../style/ContractRenewalApp.css";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ContractRenewalApp() {
  const { contractId } = useParams(); // Get contract ID from URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    student_code: "",
    gender: "",
    class_code: "",
    ethnicity: "",
    school_year: "",
    major: "",
    birth_place: "",
    education_type: "",
    phone_number: "",
    email: "",
    contractId: "",
    area: "",
    room: "",
    floor: "",
    apply_date: "",
    expired_date: "",
    renewalDuration: "",
    price: "",
    studentNote: "",
  });

  const [showPrintView, setShowPrintView] = useState(false);
  const navigate = useNavigate();

  // Fetch contract data when component mounts
  useEffect(() => {
    const fetchContractData = async () => {
      if (!contractId) {
        setError("Không tìm thấy ID hợp đồng");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/contract/fetch/${contractId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const contractData = response.data.data;
          const studentData = contractData.student || {};

          // Set today's date as the default start date for renewal
          const today = new Date();
          const formattedToday = today.toISOString().split("T")[0];

          // Calculate default end date (6 months from today)
          const defaultEndDate = new Date();
          defaultEndDate.setMonth(today.getMonth() + 6);
          const formattedEndDate = defaultEndDate.toISOString().split("T")[0];

          setFormData({
            full_name: studentData.full_name || "",
            dob: studentData.dob || "",
            student_code: studentData.student_code || "",
            gender: studentData.gender || "",
            class_code: studentData.class_code || "",
            ethnicity: studentData.ethnicity || "",
            school_year: studentData.school_year || "",
            major: studentData.major || "",
            birth_place: studentData.birth_place || "",
            education_type: studentData.education_type || "",
            phone_number: studentData.phone_number || "",
            email: studentData.email || "",
            contractId: contractData.id || "",
            area: studentData.area || "",
            room: studentData.room || "",
            floor: studentData.floor || "",
            price: studentData.price || "",
          });
          setLoading(false);
        } else {
          setError(
            "Không thể tải thông tin hợp đồng: " + response.data.message
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setError("Lỗi khi tải thông tin hợp đồng. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchContractData();
  }, [contractId]);

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

  const formatVND = (value) => {
    if (!value) return "0";
    return Number(value).toLocaleString("vi-VN");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setShowPrintView(false);
  };

  useEffect(() => {
    if (formData.apply_date && formData.expired_date) {
      const start = new Date(formData.apply_date);
      const end = new Date(formData.expired_date);

      if (start < end) {
        const months =
          (end.getFullYear() - start.getFullYear()) * 12 +
          (end.getMonth() - start.getMonth());

        setFormData((prev) => ({
          ...prev,
          renewalDuration: months.toString(), // Cập nhật giá trị
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          renewalDuration: "", // Reset nếu ngày không hợp lệ
        }));
      }
    }
  }, [formData.apply_date, formData.expired_date]);

  const handleAccept = async () => {
    // Submit renewal data to API
    try {
      const token = localStorage.getItem("token");
      const payload = {
        contractId: formData.contractId,
        apply_date: formData.apply_date,
        expired_date: formData.expired_date,
        studentNote: formData.studentNote,
      };

      const response = await axios.post(
        "http://localhost:8000/api/contract/renew",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Gia hạn hợp đồng thành công!");
        navigate("/danhsachhopdong");
      } else {
        alert("Lỗi khi gia hạn hợp đồng: " + response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Lỗi khi gia hạn hợp đồng. Vui lòng thử lại sau.");
    }
  };

  const handleBackList = () => {
    navigate("/danhsachhopdong");
  };

  if (loading) {
    return (
      <div className="app-container">
        <Sidebar role="admin" username="Hoàng Dũng" />
        <div className="main-content">
          <div className="loading">Đang tải thông tin hợp đồng...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <Sidebar role="admin" username="Hoàng Dũng" />
        <div className="main-content">
          <div className="error-message">{error}</div>
          <button onClick={handleBackList} className="back-btn">
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar role="admin" username="Hoàng Dũng" />
      <div className="main-content">
        <div className="form-container">
          <h2>Gia hạn hợp đồng</h2>
          {showPrintView ? (
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
                  <h2>ĐƠN ĐĂNG KÝ Ở NỘI TRÚ KTX (LẦN ....)</h2>
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

                <div className="student-info">
                  <table>
                    <tbody>
                      <tr>
                        <td width="50%">
                          - Tên sinh viên: {formData.full_name}
                        </td>
                        <td width="50%">Nam/Nữ: {formData.gender}</td>
                      </tr>
                      <tr>
                        <td>
                          - Sinh ngày:{" "}
                          {new Date(formData.dob).toLocaleDateString("vi-VN")}
                        </td>
                        <td>Dân tộc: {formData.ethnicity}</td>
                      </tr>
                      <tr>
                        <td>- Nơi sinh [tỉnh/thành]: {formData.birth_place}</td>
                        <td>Lớp: {formData.class_code}</td>
                      </tr>
                      <tr>
                        <td>- Khóa: {formData.school_year}</td>
                        <td>Mã SV: {formData.student_code}</td>
                      </tr>
                      <tr>
                        <td>- Ngành: {formData.major}</td>
                        <td>Hệ đào tạo: {formData.education_type}</td>
                      </tr>
                      <tr>
                        <td>- Điện thoại: {formData.phone_number}</td>
                        <td>Email: {formData.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="content">
                  <p>
                    <strong style={{ marginLeft: "50px" }}>1. Nội dung:</strong>{" "}
                    đăng ký tiếp tục ở lại nội trú tại KTX của Học viện kỳ
                    .....(20... -- 20....).
                  </p>

                  <table>
                    <tbody>
                      <tr align="center">
                        <td width="34%">KTX (Nhà): {formData.area}....</td>
                        <td width="33%">Tầng: {formData.floor}....</td>
                        <td width="33%">- Phòng ở: {formData.room}....</td>
                      </tr>
                      <tr>
                        <td colSpan="6" style={{ paddingLeft: "60px" }}>
                          - Thời gian: từ ngày{" "}
                          {new Date(formData.apply_date).toLocaleDateString(
                            "vi-VN"
                          )}{" "}
                          đến ngày{" "}
                          {new Date(formData.expired_date).toLocaleDateString(
                            "vi-VN"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p>
                    <strong style={{ marginLeft: "50px" }}>
                      2. Mức thu, hình thức thanh toán và thời hạn đăng ký tiếp
                      theo:
                    </strong>
                  </p>

                  <p style={{ marginLeft: "70px", color: "red" }}>
                    {" "}
                    1. Mức thu tính tại thời điểm:
                  </p>
                  <p className="payment">
                    <strong>
                      {formatVND(formData.price)} đồng/tháng x{" "}
                      {formData.renewalDuration} tháng ={" "}
                      {formatVND(formData.price * formData.renewalDuration)} VNĐ
                    </strong>

                    <br />
                    <em></em>
                  </p>

                  <p style={{ marginLeft: "70px", color: "red" }}>
                    2.2. Hình thức thanh toán:
                  </p>
                  <p style={{ marginLeft: "130px", marginRight: "50px" }}>
                    + Nộp tiền ngay tại bộ phận Kế toán của Học viện sau khi
                    được chấp thuận đơn vào ở nội trú KTX.
                  </p>
                  <p align="center">
                    + Hình thức thanh toán: Chuyển khoản hoặc tiền mặt (bằng
                    tiền VNĐ).
                  </p>

                  <p style={{ marginLeft: "70px", color: "red" }}>
                    2.3. Thời hạn đăng ký ở lại KTX tiếp theo:
                  </p>
                  <p align="center">
                    Trước khi đơn đăng ký hết hiệu lực <strong>15</strong> ngày{" "}
                    <em>(có biểu mẫu kèm theo)</em>
                  </p>
                </div>

                <div className="commitment">
                  <p>
                    Em làm đơn này kính gửi Học viện xem xét cho em được tiếp
                    tục ở tại KTX của Học viện.
                  </p>
                  <p>
                    Em xin cam kết thực hiện đúng và chấp hành nghiêm túc các
                    quy định về Nội trú của Học viện.
                  </p>
                  <p className="thanks">
                    <strong>Xin chân thành cảm ơn!</strong>
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
                        <td width="33%" align="center" valign="top">
                          <p>
                            <strong>TỔ QUẢN LÝ KTX</strong>
                          </p>
                          <p>(Ký, ghi rõ họ tên)</p>
                          <div className="signature-space"></div>
                          <p></p>
                        </td>
                        <td width="34%" align="center">
                          <p>
                            <strong>NGƯỜI ĐĂNG KÝ</strong>
                          </p>
                          <p>(Ký, ghi rõ họ tên)</p>
                          <div className="signature-space"></div>
                          <p>{formData.full_name}</p>
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
                    Đơn này được lưu kèm cùng hồ sơ đăng ký ban đầu tại Tổ QL
                    KTX
                  </p>
                </div>

                <div className="print-controls no-print">
                  <button className="print-btn" onClick={handlePrint}>
                    Tải xuống
                  </button>
                  <button className="back-btn" onClick={handleBack}>
                    Quay lại chỉnh sửa
                  </button>
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
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Ngày sinh</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Mã sinh viên</label>
                    <input
                      type="text"
                      name="student_code"
                      value={formData.student_code}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Giới tính</label>
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
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
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Dân tộc</label>
                    <input
                      type="text"
                      name="ethnicity"
                      value={formData.ethnicity}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Khóa</label>
                    <input
                      type="text"
                      name="school_year"
                      value={formData.school_year}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Quê quán</label>
                    <input
                      type="text"
                      name="birth_place"
                      value={formData.birth_place}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ngành</label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Hệ đào tạo</label>
                    <input
                      type="text"
                      name="education_type"
                      value={formData.education_type}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Thông tin gia hạn</h3>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Mã hợp đồng</label>
                    <input
                      type="text"
                      name="contractId"
                      value={formData.contractId}
                      onChange={handleChange}
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
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Tầng</label>
                    <input
                      type="text"
                      name="floor"
                      value={formData.floor}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Phòng</label>
                    <input
                      type="text"
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Gia hạn từ</label>
                    <input
                      type="date"
                      name="apply_date"
                      value={formData.apply_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Gia hạn đến</label>
                    <input
                      type="date"
                      name="expired_date"
                      value={formData.expired_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Thời gian gia hạn</label>
                    <input
                      type="text"
                      name="renewalDuration"
                      value={
                        formData.renewalDuration
                          ? `${formData.renewalDuration} tháng`
                          : ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Mức thu/tháng</label>
                    <select
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">-- Chọn mức thu --</option>
                      <option value="1800000">1.800.000 đồng</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Ghi chú</label>
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
                  onClick={handleBackList}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="submit-btn"
                  onClick={handleAccept}
                >
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

export default ContractRenewalApp;
