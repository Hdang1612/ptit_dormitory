import React, { useState } from "react";

const TopTable = () => {
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEntriesChange = (e) => setEntries(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleAddNew = () => alert("");

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    selectWrapper: {
      display: "flex",
      alignItems: "center",
    },
    select: {
      marginLeft: "8px",
      padding: "5px 0px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer",
    },
    searchInput: {
      padding: "5px 10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginLeft: "10px",
      width: "250px",
    },
    addButton: {
      backgroundColor: "#BC2626",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      marginLeft: "700px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Phân độ lớn bảng */}
      <div style={styles.selectWrapper}>
        <span>Show</span>
        <select
          value={entries}
          onChange={handleEntriesChange}
          style={styles.select}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
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

      {/* Nút thêm mới */}
      <button onClick={handleAddNew} style={styles.addButton}>
        + Thêm mới
      </button>
    </div>
  );
};

export default TopTable;
