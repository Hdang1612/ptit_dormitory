import React, { useState } from "react";
import { SearchIcon, Download, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import PowerUsageCard from "../../components/PowerUsageCard";
import BigPowerUsageCard from "../../components/BigPowerUsageCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

export const PowerMonitoring = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("Tháng 2");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Khu");
  const [selectedFloor, setSelectedFloor] = useState("Tầng");

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
      active: true,
    },
    {
      id: 3,
      title: "Báo cáo & Thống kê",
      path: "/reports",
      active: false,
    },
  ];

  // Months data
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12"
  ];

  // Areas data
  const areas = ["A", "B1", "B2", "B5"];

  // Floors data
  const floors = ["Tầng 1", "Tầng 2", "Tầng 3", "Tầng 4", "Tầng 5"];

  // Power usage data
  const powerUsageData = [
    { id: 1, name: "Khu A - P.203", power: 1000, amount: 356000, percentChange: 0.5 },
    { id: 2, name: "Khu A - P.204", power: 4000, amount: 527000, percentChange: -12.0 },
    { id: 3, name: "Khu A - P.205", power: 1200, amount: 527000, percentChange: -12.0 },
    { id: 4, name: "Khu A - P.206", power: 3000, amount: 356000, percentChange: 0.5 },
    { id: 5, name: "Khu A - P.207", power: 5600, amount: 527000, percentChange: -12.0 },
    { id: 6, name: "Khu A - P.208", power: 1200, amount: 527000, percentChange: -12.0 },
    { id: 7, name: "Khu A - P.209", power: 1000, amount: 356000, percentChange: 0.5 },
    { id: 8, name: "Khu A - P.210", power: 1200, amount: 527000, percentChange: -12.0 },
    { id: 9, name: "Khu A - P.211", power: 1200, amount: 527000, percentChange: -12.0 },
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
          GIÁM SÁT TIÊU THỤ ĐIỆN
        </h1>

        {/* Search Bar */}
        <div className="flex gap-4 mb-8">
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
        </div>

        {/* Month Selection and Export */}
        <div className="flex justify-between items-center mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="px-6 py-3 bg-[#a40000] text-white border-none rounded-xl text-lg font-medium flex items-center gap-2 hover:bg-[#8a0000]"
              >
                {selectedMonth}
                <ChevronDown className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              {months.map((month) => (
                <DropdownMenuItem
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                >
                  {month}
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

        {/* Power Usage Cards Grid */}
        <div className="grid grid-cols-3 gap-6 relative">
          {powerUsageData.map((room) => (
            <div key={room.id} className="relative">
              <PowerUsageCard
                room={room}
                onClick={() => setSelectedRoom(room)}
              />
              {selectedRoom?.id === room.id && (
                <div className="absolute top-0 left-0 w-full z-10">
                  <BigPowerUsageCard
                    room={room}
                    onClose={() => setSelectedRoom(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};