// menuConfig.js
export const menuConfig = {
  admin: [
    { label: "Báo cáo & Thống kê", path: "/reports" },
    { label: "Danh sách đăng ký", path: "/danhsachdondky" },
    { label: "Danh sách hợp đồng", path: "/danhsachhopdong" },
    { label: "Danh sách phòng", path: "/dsphong" },
    { label: "Danh sách sinh viên", path: "/student-list" },
    { label: "Thanh toán & Hoá đơn", path: "/invoice" },
    { label: "Giám sát tiêu thụ điện", path: "/power-monitoring" },
  ],
  sinhvien: [
    { label: "Thông báo chung", path: "" },
    { label: "Thẻ lưu trú", path: "/thedinhdanh" },
    { label: "Thông tin cá nhân", path: "" },
  ],
  nguoitruc: [
    { label: "Phân ca", path: "/shiftmanage" },
    { label: "Điểm danh", path: "/staffduty" },
  ],
};