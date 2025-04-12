import { SearchIcon, Download, ChevronDown, Bell } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import RoomMoney from "../../components/RoomMoney";
import RoomElectrical from "../../components/RoomElectrical";
import BigRoomMoney from "../../components/BigRoomMoney";
import BigRoomElectrical from "../../components/BigRoomElectrical";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import PropTypes from "prop-types";

export const Frame = () => {
  const navigate = useNavigate();
  const [expandedMoney, setExpandedMoney] = useState(false);
  const [expandedElectrical, setExpandedElectrical] = useState(false);
  const [selectedMoneyRoom, setSelectedMoneyRoom] = useState(null);
  const [selectedElectricalRoom, setSelectedElectricalRoom] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Khu");
  const [selectedFloor, setSelectedFloor] = useState("Tầng");

  // Navigation menu items data
  const menuItems = [
    {
      id: 1,
      title: "Thanh toán & Hoá đơn",
      path: "/",
      active: true,
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
      active: false,
    },
  ];

  // Areas data
  const areas = ["A", "B1", "B2", "B5"];

  // Floors data
  const floors = ["Tầng 1", "Tầng 2", "Tầng 3", "Tầng 4", "Tầng 5"];

  // Room money data - Extended with more rooms
  const roomMoneyData = [
    { id: 1, name: "Khu A - P.203", amount: 2000000, isPaid: true },
    { id: 2, name: "Khu A - P.204", amount: 1600000, isPaid: false },
    { id: 3, name: "Khu A - P.205", amount: 2000000, isPaid: true },
    { id: 4, name: "Khu A - P.206", amount: 2000000, isPaid: true },
    { id: 5, name: "Khu A - P.207", amount: 1600000, isPaid: false },
    { id: 6, name: "Khu A - P.208", amount: 1600000, isPaid: false },
    { id: 7, name: "Khu A - P.209", amount: 2000000, isPaid: true },
    { id: 8, name: "Khu A - P.210", amount: 1600000, isPaid: false },
    { id: 9, name: "Khu A - P.211", amount: 1600000, isPaid: false },
  ];

  // Room electrical data - Extended with more rooms
  const roomElectricalData = [
    { id: 1, name: "Khu A - P.203", amount: 356000, percentChange: 0.5 },
    { id: 2, name: "Khu A - P.204", amount: 527000, percentChange: -12.0 },
    { id: 3, name: "Khu A - P.205", amount: 113000, percentChange: 0.2 },
    { id: 4, name: "Khu A - P.206", amount: 425000, percentChange: 1.5 },
    { id: 5, name: "Khu A - P.207", amount: 287000, percentChange: -8.0 },
    { id: 6, name: "Khu A - P.208", amount: 342000, percentChange: 2.3 },
    { id: 7, name: "Khu A - P.209", amount: 198000, percentChange: -5.1 },
    { id: 8, name: "Khu A - P.210", amount: 445000, percentChange: 3.7 },
    { id: 9, name: "Khu A - P.211", amount: 276000, percentChange: -1.8 },
  ];

  const displayedMoneyRooms = expandedMoney ? roomMoneyData : roomMoneyData.slice(0, 3);
  const displayedElectricalRooms = expandedElectrical ? roomElectricalData : roomElectricalData.slice(0, 3);

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
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-[#a40000] text-3xl font-semibold mb-8">
          THANH TOÁN & HOÁ ĐƠN
        </h1>

        {/* Search Bar */}
        <div className="flex gap-4 mb-12">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              className="pl-12 py-3 bg-white rounded-xl border-none"
              placeholder="Tìm kiếm phòng"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="px-6 py-3 bg-[#a40000] text-white border-none rounded-xl flex items-center gap-2 hover:bg-[#8a0000]"
              >
                {selectedArea}
                <ChevronDown className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {areas.map((area) => (
                <DropdownMenuItem
                  key={area}
                  onClick={() => setSelectedArea(`Khu ${area}`)}
                >
                  Khu {area}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="px-6 py-3 bg-[#a40000] text-white border-none rounded-xl flex items-center gap-2 hover:bg-[#8a0000]"
              >
                {selectedFloor}
                <ChevronDown className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {floors.map((floor) => (
                <DropdownMenuItem
                  key={floor}
                  onClick={() => setSelectedFloor(floor)}
                >
                  {floor}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            className="px-6 py-3 bg-[#a40000] text-white border-none rounded-xl hover:bg-[#8a0000] flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Xuất file danh sách
          </Button>
        </div>

        {/* Room Sections */}
        <div className="space-y-12">
          {/* Tiền Phòng Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <Button className="bg-[#a40000] text-white px-8 py-3 rounded-xl hover:bg-[#8a0000]">
                TIỀN PHÒNG
              </Button>
              <Button
                variant="outline"
                className="bg-[#a40000] text-white border-none rounded-xl hover:bg-[#8a0000]"
                onClick={() => setExpandedMoney(!expandedMoney)}
              >
                {expandedMoney ? 'Thu gọn' : 'Xem thêm'}
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 relative">
              {displayedMoneyRooms.map((room) => (
                <div key={room.id} className="relative">
                  <RoomMoney
                    room={room}
                    onClick={() => setSelectedMoneyRoom(room)}
                  />
                  {selectedMoneyRoom?.id === room.id && (
                    <div className="absolute top-0 left-0 w-full z-10">
                      <BigRoomMoney
                        room={room}
                        onClose={() => setSelectedMoneyRoom(null)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tiền Điện Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <Button className="bg-[#a40000] text-white px-8 py-3 rounded-xl hover:bg-[#8a0000]">
                TIỀN ĐIỆN
              </Button>
              <Button
                variant="outline"
                className="bg-[#a40000] text-white border-none rounded-xl hover:bg-[#8a0000]"
                onClick={() => setExpandedElectrical(!expandedElectrical)}
              >
                {expandedElectrical ? 'Thu gọn' : 'Xem thêm'}
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 relative">
              {displayedElectricalRooms.map((room) => (
                <div key={room.id} className="relative">
                  <RoomElectrical
                    room={room}
                    onClick={() => setSelectedElectricalRoom(room)}
                  />
                  {selectedElectricalRoom?.id === room.id && (
                    <div className="absolute top-0 left-0 w-full z-10">
                      <BigRoomElectrical
                        room={room}
                        onClose={() => setSelectedElectricalRoom(null)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

Frame.propTypes = {
  children: PropTypes.node
};