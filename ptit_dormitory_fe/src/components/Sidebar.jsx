import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { menuConfig } from "../config/menuConfig";

export default function Sidebar({ role = "admin", username = "User" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = menuConfig[role] || [];

  return (
    <div className="sidebar-container">
      <div className="user-info">
        <div className="avatar"></div>
        <div className="user-details" onClick={() => navigate("/suathongtin")}>
          <div className="username">{username}</div>
          <div className="role-badge">{role.toUpperCase()}</div>
        </div>
      </div>

      <h3 className="sidebar-title">KÝ TÚC XÁ PTIT</h3>
      <hr className="divider" />

      <div className="menu">
        {menuItems.map((item, index) => (
          <div
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            key={index}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}