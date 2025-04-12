import React, { useState } from "react";

const TopStaffDuty = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "nowrap",
      gap: "20px",
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    dateWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: "black",
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
      width: "300px",
      backgroundColor: "white",
      color: "black",
      marginLeft:"750px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Bộ lọc ngày */}
      <div style={styles.dateWrapper}>
        <span>Chọn ngày</span>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={styles.dateInput}
        />
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

export default TopStaffDuty;
