import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../service/authService";
import "../style/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = async () => {
    try {
      const res = await authService.login(usernameInput, passwordInput);

      if (res.success) {
        const role = res.data.user.role_id;

        // Điều hướng theo role
        switch (role) {
          case "1":
            navigate("/reports"); // Admin redirects to reports page
            break;
          case "4":
            navigate("/thedinhdanh"); // Student redirects to ID card page
            break;
          case "3":
            navigate("/shiftmanage"); // Staff redirects to shift management
            break;
          default:
            alert("Không xác định được vai trò người dùng.");
            navigate("/dangnhap");
        }
      } else {
        alert("Đăng nhập thất bại: " + res.message);
      }
    } catch (err) {
      alert(
        "Lỗi khi đăng nhập: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">ĐĂNG NHẬP</h1>
        <p className="login-subtitle">Xin chào! Vui lòng đăng nhập</p>
        <div className="login-inputs">
          <input
            type="text"
            placeholder="Nhập email"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
          />

          <button className="login-button" onClick={handleLogin}>
            ĐĂNG NHẬP
          </button>
        </div>

        <div className="login-options">
          <label>
            <input type="checkbox" /> Ghi nhớ
          </label>
          <span
            className="forgot-password"
            onClick={() => navigate("/quenmatkhau")}
          >
            Quên mật khẩu?
          </span>
        </div>
      </div>
    </div>
  );
}