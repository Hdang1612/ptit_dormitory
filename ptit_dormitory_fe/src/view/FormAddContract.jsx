import { useEffect } from "react";
import React, { useState } from "react";
import "../style/AddContract.css";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function FormAddContract() {
  const { id } = useParams(); // Get the contract ID from URL
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPrintView, setShowPrintView] = useState(false);

  // Fetch contract data when component mounts
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
            dob: formatDate(studentData?.dob),
            student_code: studentData?.student_code || "",
            gender: studentData?.gender || "",
            class_code: studentData?.class_code || "",
            ethnicity: studentData?.ethnicity || "",
            school_year: studentData?.school_year || "",
            major: studentData?.major || "",
            nationality: studentData?.nationality || "",
            education_type: studentData?.education_type || "",
            identification_code: studentData?.identification_code || "",
            birth_place: studentData?.birth_place || "",
            phone_number: studentData?.phone_number || "",
            email: studentData?.email || "",
            religion: studentData?.religion || "",
            area: studentData?.area || "",
            room: studentData?.room || "",
            floor: studentData?.floor || "",
            apply_date: formatDate(studentData?.apply_date),
            expired_date: formatDate(studentData?.expired_date),
            renewalDuration: studentData?.renewalDuration || "",
            price: studentData?.price || "",
            studentNote: studentData?.studentNote || "",
            relativesName: studentData?.relativesName || "",
            address: studentData?.address || "",
            father_name: studentData?.father_name || "",
            father_phone: studentData?.father_phone || "",
            mother_name: studentData?.mother_name || "",
            mother_phone: studentData?.mother_phone || "",
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

  // Calculate contract duration when dates change
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
          renewalDuration: months.toString(),
        }));
      }
    }
  }, [formData.apply_date, formData.expired_date]);

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

  const navigate = useNavigate();
  const handleReturnToList = () => {
    navigate("/danhsachdondky");
  };

  const handleCancel = () => {
    navigate("");
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
            <button onClick={handleReturnToList}>Quay lại danh sách</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar role="admin" username="Hoàng Dũng" />
      <div className="main-content">
        <div className="form-container">
          <h2>Thông tin đăng ký</h2>
          <h3 className="contract-id">Mã hợp đồng: {id}</h3>

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
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Tôn giáo</label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
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
                      formData.price ? `${formatVND(formData.price)} VND` : ""
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
                onClick={handleReturnToList}
              >
                Quay lại
              </button>
              <button
                type="button"
                className="submit-btn"
                onClick={handleCancel}
              >
                Duyệt
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormAddContract;
