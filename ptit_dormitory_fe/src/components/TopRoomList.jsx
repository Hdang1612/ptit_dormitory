import React, { useState } from "react";

const TopRoomList = ({
  area,
  floor,
  gender,
  status,
  search,
  limit,
  fetchData
}) => {
const handleClickArea = ()=>{
  fetchData(null,)
}

  // Hàm xử lý sự thay đổi khu vực
  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  // Hàm xử lý sự thay đổi tầng
  const handleFloorChange = (e) => {
    setFloor(e.target.value);
  };

  // Hàm xử lý sự thay đổi giới tính
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // Hàm xử lý sự thay đổi trạng thái
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Hàm xử lý sự thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Hàm xử lý sự thay đổi số lượng phòng mỗi trang
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
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
          <option value="Còn chỗ">Còn chỗ</option>
          <option value="Hết chỗ">Hết chỗ</option>
          <option value="Tạm khóa">Tạm khóa</option>
        </select>
      </div>

      {/* Chọn tầng */}
      <div style={styles.selectWrapper}>
        <span>Tầng</span>
        <select value={floor} onChange={handleFloorChange} style={styles.selectRed}>
          <option value="">Tất cả</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
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
        <select value={limit} onChange={handleLimitChange} style={styles.select}>
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
