import { useNavigate } from "react-router-dom";
import "../style/Login.css";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">ĐĂNG NHẬP</h1>
        <p className="login-subtitle">Xin chào! Vui lòng đăng nhập</p>
        <div className="login-inputs">
          <input type="text" placeholder="Nhập tài khoản" />
          <input type="password" placeholder="Nhập mật khẩu" />
          <button
            className="login-button"
            onClick={() => navigate("/user-card")}
          >
            ĐĂNG NHẬP
          </button>
        </div>

        <div className="login-options">
          <label>
            <input type="checkbox" /> Ghi nhớ
          </label>
          <span
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Quên mật khẩu?
          </span>
        </div>
      </div>
    </div>
  );
}
