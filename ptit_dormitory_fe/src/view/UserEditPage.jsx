import React from "react";
import Sidebar from "../components/Sidebar";

const UserEditPage = () => {
  const role = localStorage.getItem("role") || "guest";
  const username = localStorage.getItem("username") || "Người dùng";
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar role={role} username={username} />

      <div
        style={{
          margin: "0 auto",
          flex: 1,
          padding: "20px",
          background: "#f0f0f0",
        }}
      >
        <h2 style={{ textAlign: "center", margin: "20px 200px 20px 400px" }}>
          Cập nhật thông tin
        </h2>
        <div
          style={{
            maxWidth: "900px",
            margin: "0px 200px 0px 400px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <form>
            <div style={{ display: "flex", gap: "40px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Họ</label>
                <input type="text" placeholder="Nhập họ" style={inputStyle} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Tên</label>
                <input type="text" placeholder="Nhập tên" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Số điện thoại</label>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  style={inputStyle}
                />
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>Quê quán</label>
              <input
                type="text"
                placeholder="Nhập quê quán"
                style={inputStyle}
              />
            </div>

            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Xác nhận mật khẩu</label>
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Nút Lưu và Hủy */}
            <div style={{ display: "flex", gap: "20px" }}>
              <button
                type="button"
                style={{
                  ...buttonStyle,
                  background: "white",
                  color: "#a40000",
                  border: "1px solid #a40000",
                }}
              >
                Hủy
              </button>
              <button
                type="submit"
                style={{
                  ...buttonStyle,
                  background: "#a40000",
                  color: "white",
                }}
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
const inputStyle = {
  width: "95%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginTop: "5px",
  fontWeight: "light",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const labelStyle = {
  fontWeight: "bold",
};

export default UserEditPage;
