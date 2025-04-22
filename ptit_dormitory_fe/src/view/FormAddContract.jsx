import { useEffect, useState } from "react";
import "../style/InforContract.css";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function FormAddContract() {
  const [formData, setFormData] = useState({
    studentName: "",
    birthDate: "",
    studentId: "",
    gender: "",
    class: "",
    ethnicity: "",
    khoa: "",
    nganh: "",
    nationality: "",
    studyProgram: "",
    phoneNumber: "",
    email: "",
    contractId: "",
    dormitoryArea: "",
    room: "",
    floor: "",
    startDate: "",
    endDate: "",
    renewalDuration: "",
    price: "",
    studentNote: "",
    relativesName: "",
    relativesAddress: "",
    fatherName: "",
    fatherNumber: "",
    motherName: "",
    motherNumber: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { contractId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractData = async () => {
      if (!contractId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8000/api/contract/fetch/${contractId}`
        );

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu hợp đồng");
        }

        const data = await response.json();

        setFormData({
          studentName: data.studentName || "",
          birthDate: data.birthDate || "",
          studentId: data.studentId || "",
          gender: data.gender || "",
          class: data.class || "",
          ethnicity: data.ethnicity || "",
          khoa: data.khoa || "",
          nganh: data.nganh || "",
          nationality: data.nationality || "",
          studyProgram: data.studyProgram || "",
          phoneNumber: data.phoneNumber || "",
          email: data.email || "",
          contractId: data.contractId || "",
          dormitoryArea: data.dormitoryArea || "",
          room: data.room || "",
          floor: data.floor || "",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          renewalDuration: data.renewalDuration || "",
          price: data.price || "",
          studentNote: data.studentNote || "",
          relativesName: data.relativesName || "",
          relativesAddress: data.relativesAddress || "",
          fatherName: data.fatherName || "",
          fatherNumber: data.fatherNumber || "",
          motherName: data.motherName || "",
          motherNumber: data.motherNumber || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError(err.message);
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
    // Có thể thêm logic in đơn ở đây
  };

  // Tính thời hạn hợp đồng dựa vào ngày bắt đầu và kết thúc
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
          renewalDuration: months.toString(),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          renewalDuration: "",
        }));
      }
    }
  }, [formData.startDate, formData.endDate]);

  const handleRenewal = () => {
    navigate("/danhsachhopdong");
  };

  const handleCancel = () => {
    navigate("/huyhopdong");
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
            <p>Có lỗi xảy ra: {error}</p>
            <button onClick={() => navigate("/danhsachhopdong")}>
              Quay lại danh sách
            </button>
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
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
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
                    name="studentId"
                    value={formData.studentId}
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
                    name="class"
                    value={formData.class}
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
                    name="khoa"
                    value={formData.khoa}
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
                    name="nganh"
                    value={formData.nganh}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Hệ đào tạo</label>
                  <input
                    type="text"
                    name="studyProgram"
                    value={formData.studyProgram}
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
                    name="phoneNumber"
                    value={formData.phoneNumber}
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
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại bố</label>
                  <input
                    type="text"
                    name="fatherNumber"
                    value={formData.fatherNumber}
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
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại mẹ</label>
                  <input
                    type="text"
                    name="motherNumber"
                    value={formData.motherNumber}
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
                    name="relativesAddress"
                    value={formData.relativesAddress}
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
                    name="dormitoryArea"
                    value={formData.dormitoryArea}
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
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Ngày kết thúc</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
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

export default FormAddContract;
