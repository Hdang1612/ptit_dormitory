import { useEffect } from "react";
import React, { useState } from "react";
import "../style/AddContract.css";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function InforContract() {
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    student_code: "",
    gender: "",
    class_code: "",
    ethnicity: "",
    school_year: "",
    major: "",
    nationality: "",
    education_type: "",
    identification_code: "",
    birth_place: "",
    phone_number: "",
    email: "",
    religion: "",
    area: "",
    room: "",
    floor: "",
    apply_date: "",
    expired_date: "",
    renewalDuration: "",
    price: "",
    studentNote: "",
    relativesName: "",
    address: "",
    father_name: "",
    father_phone: "",
    mother_name: "",
    mother_phone: "",
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

  const reason = Number(formData.renewalReason);
  const duration = Number(formData.renewalDuration);
  const total = reason * duration;
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

  const navigate = useNavigate();
  const handleRenewal = () => {
    navigate("/danhsachhopdong");
  };
  const handleCancel = () => {
    navigate("/huyhopdong");
  };

  return (
    <div className="app-container">
      <Sidebar role="admin" username="Hoàng Dũng" />
      <div className="main-content">
        <div className="form-container">
          <h2>Thông tin hợp đồng</h2>

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
                  <label>CMND/CCCD</label>
                  <input
                    type="text"
                    name="identification_code"
                    value={formData.identification_code}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tôn giáo</label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
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
                    name="nationality"
                    value={formData.nationality}
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

              <div className="form-row">
                <div className="form-group">
                  <label>Họ tên bố</label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại bố</label>
                  <input
                    type="text"
                    name="father_phone"
                    value={formData.father_phone}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Họ tên mẹ</label>
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại mẹ</label>
                  <input
                    type="text"
                    name="mother_phone"
                    value={formData.mother_phone}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ tên người thân(nếu có)</label>
                  <input
                    type="text"
                    name="relativesName"
                    value={formData.relativesName}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ người thân</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Thông tin hợp đồng</h3>

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
                <div className="form-group">
                  <label>Thời hạn hợp đồng</label>
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
                  <input
                    type="text"
                    name="price"
                    value={
                      formData.price
                        ? `${Number(formData.price).toLocaleString()} VND`
                        : ""
                    }
                    onChange={handleChange}
                    readOnly
                  />
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
                    readOnly
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="submit-btn"
                onClick={handleRenewal}
              >
                Quay lại
              </button>
              <button
                type="button"
                className="submit-btn"
                onClick={handleCancel}
              >
                Hủy hợp đồng
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

export default InforContract;
