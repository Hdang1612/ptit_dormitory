import React, { useState } from "react";

const TopShiftSchedule = () => {
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [dormitory, setDormitory] = useState("A");
  const [room, setRoom] = useState("Tất cả");
  const [selectedDate, setSelectedDate] = useState("");

  const handleEntriesChange = (e) => setEntries(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleDormitoryChange = (e) => setDormitory(e.target.value);
  const handleRoomChange = (e) => setRoom(e.target.value);
  const handleDateChange = (e) => setSelectedDate(e.target.value);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "nowrap", // Không cho xuống dòng
      gap: "20px",
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    leftFilters: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexShrink: 0,
    },
    centerSearch: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
    },
    rightEntries: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      flexShrink: 0,
      color:"black",
    },
    selectWrapper: {
      display: "flex",
      alignItems: "center",
      color: "black",
      gap: "5px",
    },
    select: {
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "white",
      color: "black",
    },
    selectRed: {
      padding: "5px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "#BC2626",
      color: "white",
    },
    dateInput: {
      padding: "5px 10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      backgroundColor: "white",
      color: "black",
    },
    searchInput: {
      padding: "5px 10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
      maxWidth: "300px",
      backgroundColor: "white",
      color: "black",
      marginLeft: "350px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Bộ lọc bên trái */}
      <div style={styles.leftFilters}>
        <div style={styles.selectWrapper}>
          <span>Chọn khu ký túc</span>
          <select value={dormitory} onChange={handleDormitoryChange} style={styles.selectRed}>
            <option value="A">Khu A</option>
            <option value="B">Khu B</option>
            <option value="C">Khu C</option>
            <option value="D">Khu D</option>
          </select>
        </div>

        <div style={styles.selectWrapper}>
          <span>Chọn ngày</span>
          <input type="date" value={selectedDate} onChange={handleDateChange} style={styles.dateInput} />
        </div>

        <div style={styles.selectWrapper}>
          <span>Chọn tầng</span>
          <select value={room} onChange={handleRoomChange} style={styles.selectRed}>
            <option value="Tất cả">Tất cả</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>

      {/* Thanh tìm kiếm ở giữa */}
      <div style={styles.centerSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>

      {/* Dropdown số dòng hiển thị bên phải */}
      <div style={styles.rightEntries}>
        <span>Hiển thị</span>
        <select value={entries} onChange={handleEntriesChange} style={styles.select}>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
};

export default TopShiftSchedule;
