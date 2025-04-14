import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <div className="user-info">
        <div className="avatar"></div>
        <div className="user-details" onClick={() => navigate("/suathongtin")}>
          <div className="username">Hoàng Dũng</div>
          <div className="role-badge">Admin</div>
        </div>
      </div>

      <h3 className="sidebar-title">KÝ TÚC XÁ PTIT</h3>
      <hr className="divider" />

      <div className="menu">
        <div className="menu-item active"></div>
        <div className="menu-item"></div>
        <div className="menu-item"></div>
      </div>
    </div>
  );
}
