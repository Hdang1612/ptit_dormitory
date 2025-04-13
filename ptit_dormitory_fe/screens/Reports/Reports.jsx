import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/avatar";
import Building3DView from "../../components/Building3DView";
import RoomInfoPanel from "../../components/RoomInfoPanel";
import { mockRooms } from "../../data/mockRoomData";

export const Reports = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Navigation menu items data
  const menuItems = [
    {
      id: 1,
      title: "Thanh toán & Hoá đơn",
      path: "/",
      active: false,
    },
    {
      id: 2,
      title: "Giám sát tiêu thụ điện",
      path: "/power-monitoring",
      active: false,
    },
    {
      id: 3,
      title: "Báo cáo & Thống kê",
      path: "/reports",
      active: true,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <div className="w-[400px] bg-[#1e1e1e] p-8 text-white">
        {/* User Profile */}
        <div className="flex items-center gap-4 mb-12">
          <Avatar className="w-16 h-16 bg-[#a40000] text-white">
            <span className="text-2xl">LA</span>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold">Lê Hoàng Anh</h2>
            <span className="px-3 py-1 bg-[#E0E7FF] text-[#1e1e1e] text-sm rounded-full">Admin</span>
          </div>
        </div>

        {/* System Name */}
        <div className="mb-12">
          <h1 className="text-[#a40000] text-2xl font-semibold mb-2">PHÒNG TRỌ PTIT</h1>
          <div className="h-0.5 bg-[#a40000] w-full"></div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-6 py-4 rounded-xl text-lg font-medium ${
                item.active
                  ? "bg-[#a40000] text-white"
                  : "text-white hover:bg-[#2d2d2d]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-[#a40000] text-3xl font-semibold mb-8">
          BÁO CÁO & THỐNG KÊ
        </h1>

        <div className="flex h-[calc(100vh-160px)]">
          {/* 3D View */}
          <div className="flex-1 bg-white rounded-xl shadow-sm mr-4">
            <Building3DView
              rooms={mockRooms}
              onRoomSelect={setSelectedRoom}
            />
          </div>

          {/* Room Info Panel */}
          <div className="w-[400px] bg-white rounded-xl shadow-sm overflow-y-auto">
            <RoomInfoPanel room={selectedRoom} />
          </div>
        </div>
      </div>
    </div>
  );
};