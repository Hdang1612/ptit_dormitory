import React, { useState, useMemo } from "react";
import { SearchIcon, Download, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import PowerUsageCard from "../../components/PowerUsageCard";
import BigPowerUsageCard from "../../components/BigPowerUsageCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { mockRooms } from "../../data/mockRoomData";
import { filterRooms, transformRoomElectricalData } from "../../utils/searchUtils";
import Sidebar from "../../components/Sidebar";

export const PowerMonitoring = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("Tháng 2");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Khu");
  const [selectedFloor, setSelectedFloor] = useState("Tầng");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 9;

  const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
    "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
    "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  const areas = ["B1", "B2", "B5"];

  const floors = useMemo(() => {
    if (selectedArea === "Khu B1") {
      return Array.from({ length: 4 }, (_, i) => `Tầng ${i + 1}`);
    } else if (selectedArea === "Khu B2" || selectedArea === "Khu B5") {
      return Array.from({ length: 5 }, (_, i) => `Tầng ${i + 1}`);
    }
    return [];
  }, [selectedArea]);

  const powerUsageData = useMemo(() => {
    const transformedData = transformRoomElectricalData(Object.values(mockRooms));
    return filterRooms(transformedData, searchQuery, selectedArea, selectedFloor);
  }, [searchQuery, selectedArea, selectedFloor]);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = powerUsageData.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(powerUsageData.length / roomsPerPage);

  const renderPaginationButtons = (currentPage, totalPages, onPageChange) => {
    const buttons = [];
    
    // Previous button
    buttons.push(
      <Button
        key="prev"
        variant="outline"
        className="bg-white text-gray-600 hover:bg-gray-100"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Trước
      </Button>
    );

    // First page
    if (currentPage > 2) {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          className={`bg-white text-gray-600 hover:bg-gray-100`}
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      );
      if (currentPage > 3) {
        buttons.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }

    // Current page and adjacent pages
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      buttons.push(
        <Button
          key={i}
          variant="outline"
          className={`${
            currentPage === i
              ? "bg-[#a40000] text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        buttons.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      buttons.push(
        <Button
          key={totalPages}
          variant="outline"
          className={`bg-white text-gray-600 hover:bg-gray-100`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        className="bg-white text-gray-600 hover:bg-gray-100"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Sau
      </Button>
    );

    return buttons;
  };

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar role="admin" username="Hoàng Dũng" />

      <div className="flex-1 p-8 pl-[240px]">
        <h1 className="text-[#a40000] text-3xl font-semibold mb-8">
          GIÁM SÁT TIÊU THỤ ĐIỆN
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              className="pl-12 py-3 bg-white rounded-xl border-none w-full"
              placeholder="Tìm kiếm phòng"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
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
                    onClick={() => {
                      setSelectedArea(`Khu ${area}`);
                      setSelectedFloor("Tầng");
                    }}
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
                  disabled={selectedArea === "Khu"}
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
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="px-6 py-3 bg-[#a40000] text-white border-none rounded-xl text-lg font-medium flex items-center gap-2 hover:bg-[#8a0000] w-full sm:w-auto"
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
            className="px-6 py-3 bg-[#a40000] text-white border-none rounded-xl hover:bg-[#8a0000] flex items-center gap-2 w-full sm:w-auto"
          >
            <Download className="w-5 h-5" />
            Xuất file danh sách
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {currentRooms.map((room) => (
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

        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          {renderPaginationButtons(currentPage, totalPages, setCurrentPage)}
        </div>
      </div>
    </div>
  );
};