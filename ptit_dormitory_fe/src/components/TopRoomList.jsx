import React, { useState } from "react";

const TopRoomList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dormitory, setDormitory] = useState("A");
  const [gender, setGender] = useState("Nam");
  const [status, setStatus] = useState("Tất cả");
  const [floor, setFloor] = useState("Tất cả");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleDormitoryChange = (e) => setDormitory(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleFloorChange = (e) => setFloor(e.target.value);

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
      marginLeft: "270px",
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

  return (
    <div style={styles.container}>
      {/* Chọn khu ký túc */}
      <div style={styles.selectWrapper}>
        <span>Chọn khu ký túc</span>
        <select value={dormitory} onChange={handleDormitoryChange} style={styles.selectRed}>
          <option value="A">Khu A</option>
          <option value="B">Khu B</option>
          <option value="C">Khu C</option>
          <option value="D">Khu D</option>
        </select>
      </div>

      {/* Chọn giới tính */}
      <div style={styles.selectWrapper}>
        <span>Giới tính</span>
        <select value={gender} onChange={handleGenderChange} style={styles.selectRed}>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>

      {/* Chọn trạng thái */}
      <div style={styles.selectWrapper}>
        <span>Trạng thái</span>
        <select value={status} onChange={handleStatusChange} style={styles.selectRed}>
          <option value="Tất cả">Tất cả</option>
          <option value="Còn chỗ">Còn chỗ</option>
          <option value="Hết chỗ">Hết chỗ</option>
          <option value="Tạm khóa">Tạm khóa</option>
          <option value="Đang bảo trì">Đang bảo trì</option>
        </select>
      </div>

      {/* Chọn tầng */}
      <div style={styles.selectWrapper}>
        <span>Chọn tầng</span>
        <select value={floor} onChange={handleFloorChange} style={styles.selectRed}>
          <option value="Tất cả">Tất cả</option>
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
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchInput}
      />
    </div>
  );
};

export default TopRoomList;
