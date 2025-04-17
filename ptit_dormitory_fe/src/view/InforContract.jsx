// ContractRenewalApp.js
import { useEffect } from "react";
import React, { useState } from "react";
import "../style/AddContract.css";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function InforContract() {
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
  const handleRenewal = () => {
    navigate("/giahanhopdong");
  };
  const handleCancel = () => {
    navigate("/huyhopdong");
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
              <h2>ĐƠN ĐĂNG KÝ CHỖ Ở NỘI TRÚ KTX </h2>
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

            <div className="student-info">
              <table>
                <tbody>
                  <tr>
                    <td width="50%">- Tên sinh viên: {formData.studentName}</td>
                    <td width="50%">Nam/Nữ: {formData.gender}</td>
                  </tr>
                  <tr>
                    <td>
                      - Sinh ngày:{" "}
                      {new Date(formData.birthDate).toLocaleDateString("vi-VN")}
                    </td>
                    <td>Dân tộc: {formData.faculty}</td>
                  </tr>
                  <tr>
                    <td>- Nơi sinh [tỉnh/thành]: {formData.nationality}</td>
                    <td>Lớp: {formData.class}</td>
                  </tr>
                  <tr>
                    <td>- Khóa: {formData.khoa}</td>
                    <td>Mã SV: {formData.studentId}</td>
                  </tr>
                  <tr>
                    <td>- Ngành: {formData.nganh}</td>
                    <td>Hệ đào tạo: {formData.residentialAddress}</td>
                  </tr>
                  <tr>
                    <td>- Điện thoại: {formData.hometown}</td>
                    <td>Email: {formData.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong style={{ marginLeft: "50px" }}>
                - Khi cần báo tin cho gia đình/ người thân:
              </strong>{" "}
            </p>
            <div className="relative-infor">
              <table>
                <tbody>
                  <tr>
                    <td width="50%">- Họ tên bố: {formData.fatherName}</td>
                    <td width="50%">Số điện thoại: {formData.fatherNumber}</td>
                  </tr>
                  <tr>
                    <td width="50%">- Họ tên mẹ: {formData.motherName}</td>
                    <td width="50%">Số điện thoại: {formData.motherNumber}</td>
                  </tr>
                  <tr>
                    <td width="50%">
                      - hoặc người thân [Ưu tiên tại Hà Nội nếu có]: {""}
                      {formData.relativesName}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6">
                      + Địa chỉ liên hệ [người thân]:{" "}
                      {formData.relativesAddress}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="content">
              <p style={{ marginLeft: "50px" }}>
                <strong>1. Nội dung:</strong> Sinh viên đăng ký chỗ ở nội trú
                tại KTX sinh viên của Học viện (Km10, đường Nguyễn Trãi, Q.Hà
                Đông, TP.Hà Nội). Cụ thể:
              </p>

              <table>
                <tbody>
                  <tr align="center">
                    <td width="34%">KTX (Nhà): {formData.dormitoryArea}....</td>
                    <td width="33%">Tầng: {formData.floor}....</td>
                    <td width="33%">- Phòng ở: {formData.room}....</td>
                  </tr>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        - phòng có nhà tắm và vệ sinh khép kín, được trang bị
                        các tiện nghi cơ bản : giường, đệm, chiếu, quạt, điều
                        hòa, bình nóng lạnh và ở chung : 04 sinh viên/phòng
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      - Thời gian: từ ngày{" "}
                      {new Date(formData.startDate).toLocaleDateString("vi-VN")}{" "}
                      đến ngày{" "}
                      {new Date(formData.endDate).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        - Sinh viên được sử dụng các trang thiết bị, tiện nghi
                        trong phòng ở KTX theo quy định và theo biên bản giao
                        nhận phòng ở giữa Tổ quản lý KTX và đại diện phòng ở.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        - Mức thu lưu trú hàng tháng theo quy định, thu đủ theo
                        tháng ở nội trú(30 hoặc 31 ngày/tháng).
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        - Trường hợp sinh viên xin ra khỏi KTX ở giữa kỳ đã đóng
                        tiền, sinh viên không được hoàn lại tiền lệ phí KTX đã
                        đóng.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={{ marginLeft: "50px" }}>
                <strong>2. Trách nhiệm của Học viện (TTDV- KTX):</strong>
              </p>
              <table>
                <tbody>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        2.1. Cung cấp thông tin, thông báo về các quy chế, quy
                        định, nội quy KTX, các mức thu, khoản thu hoặc thông báo
                        có liên quan cho sinh viên biết để thực hiện.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        2.2. Bố trí phòng ở cho sinh viên theo đúng các nội dung
                        đã ghi ở (phần 1).
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        2.3. Thực hiện đúng trách nhiệm quản lý KTX theo các quy
                        chế, quy định hiện hành của Bộ GD&ĐT và của Học viện.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p style={{ marginLeft: "50px" }}>
                <strong>3. Trách nhiệm của Sinh viên (ở Nội trú KTX):</strong>
              </p>
              <table>
                <tbody>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        3.1. Tuân thủ và thực hiện đúng nội quy KTX của Học
                        viện.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        3.2. Nộp lệ phí KTX, tiền điện phụ trội và các khoản thu
                        khác (nếu có) theo đúng hạn, đúng thông báo của Học
                        viện.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        3.3. Phải trả phòng ở và rời khỏi KTX theo thông báo của
                        Học viện hoặc chậm nhất vào ngày hết hiệu lực đơn đăng
                        ký nội trú.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6" style={{ paddingLeft: "60px" }}>
                      <p>
                        3.4. Nếu tiếp tục ở lại KTX phải làm đơn đăng ký chỗ ở
                        nội trú KTX lại trước khi đơn đăng ký hết hiệu lực 15
                        ngày (có biểu mẫu kèm theo)
                      </p>
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
                  {formatVND(reason)} đồng/tháng x {duration} tháng ={" "}
                  {formatVND(total)} VNĐ
                </strong>
                <br />
                <em>(Bằng chữ: {numberToVietnamese(total)})</em>
              </p>

              <p style={{ marginLeft: "70px", color: "red" }}>
                2.2. Hình thức thanh toán:
              </p>
              <p style={{ marginLeft: "130px", marginRight: "50px" }}>
                + Nộp tiền ngay tại bộ phận Kế toán của Học viện sau khi được
                chấp thuận đơn vào ở nội trú KTX.
              </p>
              <p align="center">
                + Hình thức thanh toán: Chuyển khoản hoặc tiền mặt (bằng tiền
                VNĐ).
              </p>
            </div>

            <div className="commitment">
              <p>
                Sau khi nghiên cứu: Nội quy Ký túc xá của Học viện và Bản cam
                kết, em làm đơn này kính gửi Học viện xem xét cho em được đăng
                ký chỗ ở tại KTX của Học viện.
              </p>
              <p style={{ marginTop: "5px" }}>
                Tôi cam kết thực hiện đúng và chấp hành nghiêm túc các quy định
                về Nội trú của Học viện.
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
                      <p>{formData.studentName}</p>
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
          <h2>Thông tin hợp đồng</h2>

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
                  <label>Ngày sinh</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
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
                    name="studentId"
                    value={formData.studentId}
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
                  <label>Dân tộc</label>
                  <input
                    type="text"
                    name="faculty"
                    value={formData.faculty}
                    onChange={handleChange}
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
                    name="nganh"
                    value={formData.nganh}
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
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    name="hometown"
                    value={formData.hometown}
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
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại bố</label>
                  <input
                    type="text"
                    name="fatherNumber"
                    value={formData.fatherNumber}
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
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại mẹ</label>
                  <input
                    type="text"
                    name="motherNumber"
                    value={formData.motherNumber}
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
                    name="relativesAddress"
                    value={formData.relativesAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Thông tin hợp đồng</h3>

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
                  <label>Ngày bắt đầu</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ngày kết thúc</label>
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
                    name="renewalReason"
                    value={formData.renewalReason}
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
                    name="studentCommitment"
                    value={formData.studentCommitment}
                    onChange={handleChange}
                    rows="4"
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
                Gia hạn
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
