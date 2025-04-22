import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = () => {
    let role = "";

    if (usernameInput === "admin" && passwordInput === "admin123") {
      role = "admin";
    } else if (usernameInput === "sinhvien" && passwordInput === "sv123") {
      role = "sinhvien";
    } else if (usernameInput === "nguoitruc" && passwordInput === "nt123") {
      role = "nguoitruc";
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
      return;
    }

    // Lưu vào localStorage
    localStorage.setItem("role", role);
    localStorage.setItem("username", usernameInput);

    // Chuyển trang theo role
    switch (role) {
      case "admin":
        navigate("/danhsachdondky");
        break;
      case "sinhvien":
        navigate("/thedinhdanh");
        break;
      case "nguoitruc":
        navigate("/shiftmanage");
        break;
      default:
        navigate("/dangnhap");
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
            placeholder="Nhập tài khoản"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
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
