import "../style/ForgotPassword.css";

export default function ForgotPassword() {
  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h1 className="forgot-title">QUÊN MẬT KHẨU</h1>
        <p className="forgot-subtitle">
          Nhập email hoặc số điện thoại để lấy lại mật khẩu
        </p>
        <div className="forgot-inputs">
          <input type="email" placeholder="Nhập email" />
          <input type="text" placeholder="Nhập số điện thoại" />
          <input type="password" placeholder="Nhập mật khẩu mới" />
          <input type="password" placeholder="Xác nhận mật khẩu mới" />
          <button className="forgot-button">THAY ĐỔI MẬT KHẨU</button>
        </div>
      </div>
    </div>
  );
}
