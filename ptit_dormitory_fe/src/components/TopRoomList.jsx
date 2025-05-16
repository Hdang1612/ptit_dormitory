import React, { useState } from "react";
import { getFloors } from "../service/placeService";

const TopRoomList = ({
  setParentId,
  area,
  setArea,
  floor,
  setFloor,
  gender,
  setGender,
  status,
  setStatus,
  search,
  setSearch,
  pagination,
  setPagination,
  handlePaginationChange
}) => {
  const [dataFloor, setDataFloor] = useState([]);
  const handleFloorClick = async () => {
    const data = await getFloors(area);
    setDataFloor(data);
    console.log("floor data", data);
    
  }

  // Hàm xử lý sự thay đổi khu vực
  const handleAreaChange = (e) => {
    setFloor("");
    setArea(e.target.value);
    setParentId(e.target.value);
    
  };

  // Hàm xử lý sự thay đổi tầng
  const handleFloorChange = (e) => {
    const val = e.target.value;
    if (!val) {
      // Nếu chọn 'Tất cả'
      setFloor("");
      setParentId(area);
    } else {
      setFloor(val);
      setParentId(val);
    }
    // Reset trang về 1 mỗi khi thay đổi tầng
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Hàm xử lý sự thay đổi giới tính
  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Hàm xử lý sự thay đổi trạng thái
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Hàm xử lý sự thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Hàm xử lý sự thay đổi số lượng phòng mỗi trang
  const handleLimitChange = (e) => {
    const limitChange = parseInt(e.target.value);
    setPagination((prev) => ({
      ...prev,
      limit: limitChange,
      currentPage: 1,
    }));
  };
  

  return (
    <div style={styles.container}>
      {/* Chọn khu ký túc */}
      <div style={styles.selectWrapper}>
        <span>Khu ký túc</span>
        <select value={area} onChange={handleAreaChange} style={styles.selectRed}>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="B5">B5</option>
        </select>
      </div>

      {/* Chọn giới tính */}
      <div style={styles.selectWrapper}>
        <span>Giới tính</span>
        <select value={gender} onChange={handleGenderChange} style={styles.selectRed}>
          <option value="">Tất cả</option>
          <option value="X">Nam</option>
          <option value="Y">Nữ</option>
        </select>
      </div>

      {/* Chọn trạng thái */}   
      
      <div style={styles.selectWrapper}>
        <span>Trạng thái</span>
        <select value={status} onChange={handleStatusChange} style={styles.selectRed}>
          <option value="">Tất cả</option>
          <option value="notfull">Còn chỗ</option>
          <option value="full">Hết chỗ</option>
          <option value="available">Trống</option>
        </select>
      </div>

      {/* Chọn tầng */}
      <div style={styles.selectWrapper}>
        <span>Tầng</span>
        <select value={floor} onClick={handleFloorClick} onChange={handleFloorChange} style={styles.selectRed}>
          <option value="">Tất cả</option>
          {/* <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option> */}
          {dataFloor.map((item) => (
            <option key={item.id} value={item.id}>
              {item.area_name}
            </option>
          ))}
        </select>
      </div>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />

      <div style={styles.selectWrapper}>
        <span>Show</span>
        <select value={pagination.limit} onChange={handleLimitChange} style={styles.select}>
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={16}>16</option>
        </select>
      </div>

    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  searchInput: {
    padding: "5px 10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "300px",
    backgroundColor: "white",
    color: "black",
    marginLeft: "180px",
  },
  selectWrapper: {
    display: "flex",
    alignItems: "center",
    color: "black",
  },
  select: {
    marginLeft: "8px",
    padding: "5px 0px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "white",
    color: "black",
  },
  selectRed: {
    marginLeft: "8px",
    padding: "5px 0px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#BC2626",
    color: "white",
  },
};

export default TopRoomList;
