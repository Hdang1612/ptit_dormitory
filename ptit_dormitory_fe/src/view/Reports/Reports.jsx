import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Building3DView from "../../components/Building3DView";
import RoomInfoPanel from "../../components/RoomInfoPanel";
import NavigationInstructions from "../../components/NavigationInstructions";
import { mockRooms } from "../../data/mockRoomData";
import Sidebar from "../../components/Sidebar";

export const Reports = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar role="admin" username="Hoàng Dũng" />

      <div className="flex-1 p-8 pl-[240px]">
        <h1 className="text-[#a40000] text-3xl font-semibold mb-8">
          BÁO CÁO & THỐNG KÊ
        </h1>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] gap-4">
          <div className="flex-1 bg-white rounded-xl shadow-sm">
            <Building3DView
              rooms={mockRooms}
              onRoomSelect={setSelectedRoom}
            />
          </div>

          <div className="w-full lg:w-[400px] bg-white rounded-xl shadow-sm overflow-y-auto">
            <RoomInfoPanel room={selectedRoom} />
          </div>
        </div>

        <NavigationInstructions />
      </div>
    </div>
  );
};