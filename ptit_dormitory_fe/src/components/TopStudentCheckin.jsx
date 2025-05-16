import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TopStudentCheckin = () => {

  const [noteModalIsOpen, setNoteModalIsOpen] = useState(false);
      const [noteData, setNoteData] = useState(null);
  
      const openNoteModal = (room, date, shift, staff) => {
      setNoteData({ room, date, shift, staff });
      setNoteModalIsOpen(true);
      };
  
      const closeNoteModal = () => {
      setNoteModalIsOpen(false);
      setNoteData(null);
      };

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

    modalHeader: {
      marginBottom: "20px",
      textAlign: "center",
    },
    
    modalRoomName: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "0",
    },
    
    modalGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
    },
    
    modalCloseButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      bottom: "10px",
      background: "transparent",
      border: "none",
      fontSize: "30px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "#BC2626",
      padding: "10px",
      width: "40px",
      height: "40px",
      display: "flex",       // canh giữa
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "1",      // tránh vùng click quá cao
    },

    saveButton: {
      padding: "10px 20px",
      backgroundColor: "#BC2626",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft: "10px",
    },
  };

  return (
    <>
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
        <button
          style={styles.viewBtn}
          onClick={() => openNoteModal("101", "dd/mm/yyyy", "hh:00 - hh:00", "Nguyễn Văn A")}
        >
          Viết ghi chú
        </button>
      </div>
  
      {/* ✅ Modal Ghi chú */}
      <Modal
        isOpen={noteModalIsOpen}
        onRequestClose={closeNoteModal}
        contentLabel="Ghi chú trực"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "12px",
            position: "relative",
            width: "60%",
            height:"80%",
            border: "2px solid black",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {noteData && (
          <div>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalRoomName}>Ghi chú trực</h2>
            </div>
            <button onClick={closeNoteModal} style={styles.modalCloseButton}>×</button>
  
            <div>
              <p><strong>Phòng:</strong> {noteData.room}</p>
              <p><strong>Ngày:</strong> {noteData.date}</p>
              <p><strong>Ca trực:</strong> {noteData.shift}</p>
              <p><strong>Người trực:</strong> {noteData.staff}</p>
            </div>
  
            <div style={{ flex: 1, textAlign: "left", marginTop: "20px", height:"80%", }}>
              <textarea
                rows="4"
                placeholder="Nhập ghi chú..."
                style={{ marginLeft: "5%", marginRight: "5%", padding: "5px", borderRadius: "5px", backgroundColor: "white", border: "2px solid black", width: "90%", height: "100%", }}
              ></textarea>
            </div>
  
            <div style={{ marginTop: "20px" }}>
              <button style={styles.saveButton}>
                Lưu
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
  
};

export default TopStudentCheckin;
