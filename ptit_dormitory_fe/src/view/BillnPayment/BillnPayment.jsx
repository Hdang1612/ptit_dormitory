import React, { useState, useMemo } from "react";
import { SearchIcon, Download, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import RoomMoney from "../../components/RoomMoney";
import RoomElectrical from "../../components/RoomElectrical";
import BigRoomMoney from "../../components/BigRoomMoney";
import BigRoomElectrical from "../../components/BigRoomElectrical";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { mockRooms } from "../../data/mockRoomData";
import { filterRooms, transformRoomMoneyData, transformRoomElectricalData } from "../../utils/searchUtils";
import Sidebar from "../../components/Sidebar";

export const BillnPayment = () => {
  const navigate = useNavigate();
  const [expandedMoney, setExpandedMoney] = useState(false);
  const [expandedElectrical, setExpandedElectrical] = useState(false);
  const [selectedMoneyRoom, setSelectedMoneyRoom] = useState(null);
  const [selectedElectricalRoom, setSelectedElectricalRoom] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Khu");
  const [selectedFloor, setSelectedFloor] = useState("Tầng");
  const [searchQuery, setSearchQuery] = useState("");

  const areas = ["B1", "B2", "B5"];

  const floors = useMemo(() => {
    if (selectedArea === "Khu B1") {
      return Array.from({ length: 4 }, (_, i) => `Tầng ${i + 1}`);
    } else if (selectedArea === "Khu B2" || selectedArea === "Khu B5") {
      return Array.from({ length: 5 }, (_, i) => `Tầng ${i + 1}`);
    }
    return [];
  }, [selectedArea]);

  const roomMoneyData = useMemo(() => {
    const transformedData = transformRoomMoneyData(Object.values(mockRooms));
    return filterRooms(transformedData, searchQuery, selectedArea, selectedFloor);
  }, [searchQuery, selectedArea, selectedFloor]);

  const roomElectricalData = useMemo(() => {
    const transformedData = transformRoomElectricalData(Object.values(mockRooms));
    return filterRooms(transformedData, searchQuery, selectedArea, selectedFloor);
  }, [searchQuery, selectedArea, selectedFloor]);

  const displayedMoneyRooms = expandedMoney ? roomMoneyData : roomMoneyData.slice(0, 3);
  const displayedElectricalRooms = expandedElectrical ? roomElectricalData : roomElectricalData.slice(0, 3);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      <Sidebar role="admin" username="Hoàng Dũng" />

      <div className="flex-1 p-8 pl-[240px]">
        <h1 className="text-[#a40000] text-3xl font-semibold mb-8">
          THANH TOÁN & HOÁ ĐƠN
        </h1>

        <div className="flex gap-4 mb-12">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              className="pl-12 py-3 bg-white rounded-xl border-none"
              placeholder="Tìm kiếm phòng"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <Button
            variant="outline"
            className="px-6 py-3 bg-[#a40000] text-white border-none rounded-xl hover:bg-[#8a0000] flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Xuất file danh sách
          </Button>
        </div>

        <div className="space-y-12">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
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