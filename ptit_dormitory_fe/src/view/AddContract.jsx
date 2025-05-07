// ContractRenewalApp.js
import { useEffect } from "react";
import React, { useState } from "react";
import "../style/AddContract.css";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddContract() {
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    student_code: "",
    gender: "",
    class_code: "",
    ethnicity: "",
    school_year: "",
    major: "",
    nationality: "", // chỉ cần quê quán ko cần quốc tịch
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
    renewalDuration: "", // thời hạn = apply_date - expired_date
    price: "", // chưa có mức giá
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

  const numberToVietnamese = (number) => {
    const ChuSo = [
      "không",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ];
    const DonVi = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

    if (number === 0) return "Không đồng";

    const blocks = [];
    while (number > 0) {
      blocks.push(number % 1000);
      number = Math.floor(number / 1000);
    }

    const result = [];
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      const isFirstBlock = i === blocks.length - 1; // khối bên trái nhất

      if (block === 0) continue;

      let str = "";
      const hundreds = Math.floor(block / 100);
      const tens = Math.floor((block % 100) / 10);
      const units = block % 10;

      if (hundreds > 0) {
        str += ChuSo[hundreds] + " trăm ";
      } else if (!isFirstBlock && (tens > 0 || units > 0)) {
        str += "không trăm ";
      }

      if (tens > 1) {
        str += ChuSo[tens] + " mươi ";
        if (units === 1) str += "mốt ";
        else if (units === 5) str += "lăm ";
        else if (units > 0) str += ChuSo[units] + " ";
      } else if (tens === 1) {
        str += "mười ";
        if (units === 5) str += "lăm ";
        else if (units > 0) str += ChuSo[units] + " ";
      } else if (units > 0) {
        if (tens === 0 && hundreds !== 0) str += "lẻ ";
        str += ChuSo[units] + " ";
      }

      str += DonVi[i] + " ";
      result.push(str.trim());
    }

    const finalStr = result.join(" ").replace(/\s+/g, " ").trim() + " đồng";
    return finalStr.charAt(0).toUpperCase() + finalStr.slice(1);
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
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);

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
  }, [formData.startDate, formData.endDate]);

  const navigate = useNavigate();

  const handleAccept = async () => {
    try {
      const payload = {
        type: 1,
        apply_date: formData.apply_date,
        status: "đã gửi",
        ...formData,
      };

      const response = await axios.post(
        "http://localhost:8000/api/contract/create",
        payload
      );
      console.log(response);

      if (response.data.success) {
        alert("Tạo hợp đồng thành công");
        navigate("/danhsachdondky");
      } else {
        alert("Tạo hợp đồng thất bại: " + response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gửi API:", error);
      alert("error");
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="admin" username="Hoàng Dũng" />
      <div className="main-content">
        <div className="form-container">
          <h2>Thêm mới đăng ký</h2>

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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Giới tính</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Dân tộc</label>
                  <input
                    type="text"
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
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
                  />
                </div>
                <div className="form-group">
                  <label>Quê quán</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngành</label>
                  <select
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="Công nghệ thông tin">
                      Công nghệ thông tin
                    </option>
                    <option value="Điện tử viễn thông">
                      Điện tử viễn thông
                    </option>
                    <option value="Công nghệ đa phương tiện">
                      Công nghệ đa phương tiện
                    </option>
                    <option value="TT">Truyền thông đa phương tiện</option>
                    <option value="KTruyền thông đa phương tiệnT">
                      Kế toán
                    </option>
                    <option value="Báo chí">Báo chí</option>
                    <option value="Công nghệ tài chính">
                      Công nghệ tài chính
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Hệ đào tạo</label>
                  <input
                    type="text"
                    name="education_type"
                    value={formData.education_type}
                    onChange={handleChange}
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
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại bố</label>
                  <input
                    type="text"
                    name="father_phone"
                    value={formData.father_phone}
                    onChange={handleChange}
                    required
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại mẹ</label>
                  <input
                    type="text"
                    name="mother_phone"
                    value={formData.mother_phone}
                    onChange={handleChange}
                    required
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
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ người thân</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Thông tin đăng ký</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Khu ký túc xá</label>
                  <select
                    name="area"
                    value={formData.area}
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
                  <label>Ngày bắt đầu</label>
                  <input
                    type="date"
                    name="apply_date"
                    value={formData.apply_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày kết thúc</label>
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
                  <select
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    <option value="1800000">1.800.000 VND</option>
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
              <button type="button" className="reset-btn">
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
        </div>
      </div>
    </div>
  );
}

export default AddContract;
