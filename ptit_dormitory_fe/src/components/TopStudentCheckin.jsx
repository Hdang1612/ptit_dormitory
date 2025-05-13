import React, { useState } from "react";

const TopStudentCheckin = () => {
  const [dormitory, setDormitory] = useState("A");

  const handleDormitoryChange = (e) => setDormitory(e.target.value);

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px",
      padding: "10px 0px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      width: "100%",
    },
    selectWrapper: {
      display: "flex",
      alignItems: "center",
      color: "black",
      marginLeft:"20px",
    },
    select: {
      marginLeft: "10px",
      padding: "5px 10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "#BC2626",
      color: "white",
    },
    viewBtn: {
      backgroundColor: "white",
      color: "black",
      border: "2px solid black",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight:"20px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Bộ lọc phòng */}
      <div style={styles.selectWrapper}>
        <span>Chọn phòng</span>
        <select value={dormitory} onChange={handleDormitoryChange} style={styles.select}>
          <option value="101">101</option>
          <option value="102">102</option>
          <option value="103">103</option>
          <option value="104">104</option>
        </select>
      </div>

      {/* Nút Viết ghi chú */}
      <button style={styles.viewBtn}>Viết ghi chú</button>
    </div>
  );
};

export default TopStudentCheckin;
