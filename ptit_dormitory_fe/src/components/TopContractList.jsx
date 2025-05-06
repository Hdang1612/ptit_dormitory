import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const TopConTractList = () => {
  const [entries, setEntries] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleEntriesChange = (e) => setEntries(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleAddNew = () => navigate("/themdangky");

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
      backgroundColor: "white",
    },
    searchInput: {
      padding: "5px 10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      marginLeft: "10px",
      width: "250px",
      backgroundColor: "#fff",
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
    </div>
  );
};

export default TopConTractList;
