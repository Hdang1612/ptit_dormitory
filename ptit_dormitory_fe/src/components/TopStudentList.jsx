import React, { useState } from "react";

const TopStudentList = () => {
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [dormitory, setDormitory] = useState("A");
  const [room, setRoom] = useState("Tất cả");

  const handleEntriesChange = (e) => setEntries(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleDormitoryChange = (e) => setDormitory(e.target.value);
  const handleRoomChange = (e) => setRoom(e.target.value);

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
      marginLeft: "450px",
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
      
      {/* Chọn phòng */}
      <div style={styles.selectWrapper}>
        <span>Chọn phòng</span>
        <select value={room} onChange={handleRoomChange} style={styles.selectRed}>
          <option value="Tất cả">Tất cả</option>
          <option value="101">101</option>
          <option value="102">102</option>
          <option value="103">103</option>
          <option value="104">104</option>
          <option value="105">105</option>
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

      {/* Phân độ lớn bảng */}
      <div style={styles.selectWrapper}>
        <span>Show</span>
        <select value={entries} onChange={handleEntriesChange} style={styles.select}>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};

export default TopStudentList;