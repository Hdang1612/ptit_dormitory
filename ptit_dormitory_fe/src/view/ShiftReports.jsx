import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Modal from "react-modal";
import { getAttendanceOfShift } from "../service/scheduleService.js";

Modal.setAppElement("#root");

const ShiftReports = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { shiftId, placeId, userName, shiftDate, shiftStart, shiftEnd } = state || {};

  // State dữ liệu
  const [attendanceData, setAttendanceData] = useState([]);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, trueAttendance: 0, falseAttendance: 0, nullAttendance: 0 });
  const [pagination, setPagination] = useState({ currentPage: 1, limit: 5, totalPages: 0, totalRecords: 0 });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch data khi thay đổi
  useEffect(() => {
    if (!shiftId || !placeId) return;
    const fetchDetail = async () => {
      try {
        const res = await getAttendanceOfShift(shiftId, placeId, pagination.currentPage, pagination.limit);
        setAttendanceData(res.data || []);
        setReports(res.reports || []);
        setStats(res.attendanceStatus || { total: 0, trueAttendance: 0, falseAttendance: 0, nullAttendance: 0 });
        setPagination(prev => ({
          ...prev,
          totalPages: (res.pagination && res.pagination.totalPages) || 0,
          totalRecords: (res.pagination && res.pagination.total) || 0
        }));
      } catch (err) {
        console.error("Lỗi khi lấy điểm danh:", err);
        setAttendanceData([]);
        setReports([]);
        setStats({ total: 0, trueAttendance: 0, falseAttendance: 0, nullAttendance: 0 });
        setPagination(prev => ({ ...prev, totalPages: 0, totalRecords: 0 }));
      }
    };
    fetchDetail();
  }, [shiftId, placeId, pagination.currentPage, pagination.limit]);

  // chuyển trang
  const changePage = page => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  // Modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.content}>
        {/* Header: quay lại + title */}
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>← Quay lại</button>
          <h2 style={styles.title}>Báo cáo điểm danh ca trực</h2>
          <div style={{ width: styles.backBtn.width }} />
        </div>

        {/* Thông tin & thống kê */}
        <div style={styles.infoWrapper}>
          <div style={styles.infoBox}>
            <div><strong>Người trực:</strong> {userName || '–'}</div>
            <div><strong>Ngày:</strong> {shiftDate ? new Date(shiftDate).toLocaleDateString('vi-VN') : '–'}</div>
            <div><strong>Ca trực:</strong> {shiftStart ? `${shiftStart} - ${shiftEnd}` : '–'}</div>
          </div>
          <div style={styles.statsBox}>
            <div><strong>Tổng SV:</strong> {stats.total}</div>
            <div><strong>Đúng:</strong> {stats.trueAttendance}</div>
            <div><strong>Sai:</strong> {stats.falseAttendance}</div>
            <div><strong>Chưa điểm danh:</strong> {stats.nullAttendance}</div>
          </div>
        </div>

        {/* Button Xem báo cáo */}
        <div style={styles.buttonContainer}>
          <button style={styles.viewReportButton} onClick={openModal}>Xem báo cáo</button>
        </div>

        {/* Modal chi tiết báo cáo */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Chi tiết báo cáo"
          style={{
            content: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              borderRadius: '12px',
              position: 'relative',
              width: '800px',
              maxHeight: '80vh',
              overflowY: 'auto',
              border: '2px solid black',
              background: '#fff',
              textAlign: 'center',
            },
            overlay: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
          }}
        >
          {/* Nút đóng */}
          <button onClick={closeModal} style={styles.modalCloseButton}>×</button>

          {/* Tiêu đề */}
          <h2 style={styles.modalRoomName}>Chi tiết báo cáo ca trực</h2>

          {/* Nội dung báo cáo */}
          {reports.length === 0
            ? <p>Hiện chưa có báo cáo nào.</p>
            : (
              <div style={styles.modalGrid}>
                {reports.map((r) => (
                  <div key={r.id} style={styles.reportCard}>
                    <p><strong>Thời gian:</strong> {new Date(r.date).toLocaleString('vi-VN')}</p>
                    <p><strong>Nội dung:</strong> {r.content.note}</p>
                    {r.checkin_photo && (
                      <div style={styles.checkinPhoto}>
                        <img src={r.checkin_photo} alt="Check-in Photo" style={{ maxWidth: '100%' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          }
        </Modal>

        {/* Bảng điểm danh sinh viên */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Mã sinh viên</th>
                <th style={styles.th}>Họ và tên</th>
                <th style={styles.th}>Phòng</th>
                <th style={styles.th}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length === 0
                ? <tr><td colSpan={4} style={styles.td}>Không có dữ liệu</td></tr>
                : attendanceData.map(s => (
                  <tr key={s.student_id} style={styles.tr}>
                    <td style={styles.td}>{s.student_code}</td>
                    <td style={styles.td}>{s.first_name} {s.last_name}</td>
                    <td style={styles.td}>{s.room_id}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.status,
                        backgroundColor: s.attendance_status === 1 ? '#EBF9F1' : s.attendance_status === 0 ? '#F9D2D3' : '#FEFFE2',
                        color: s.attendance_status === 1 ? '#1F9254' : s.attendance_status === 0 ? '#A30D11' : '#8D9720'
                      }}>
                        {s.attendance_status === 1 ? 'Đúng' : s.attendance_status === 0 ? 'Sai' : 'Chưa điểm danh'}
                      </span>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>

          {/* Phân trang */}
          <div style={styles.pagination}>
            <button style={styles.pageBtn} onClick={() => changePage(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}>Trước</button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} style={{ ...styles.pageBtn, ...(pagination.currentPage === page ? styles.pageBtnActive : {}) }} onClick={() => changePage(page)}>{page}</button>
            ))}
            <button style={styles.pageBtn} onClick={() => changePage(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages}>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { display: 'flex', height: '100vh' },
  content: { flex: 1, padding: 20, background: '#f0f0f0', marginLeft: 220, width: 'calc(100% - 220px)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16, width: 150, textAlign: 'left' },
  title: { margin: 0, fontWeight: 'bold', fontSize: 24, textAlign: 'center', flexGrow: 1 },
  infoWrapper: { display: 'flex', justifyContent: 'space-between', background: '#fff', padding: 15, borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.1)', marginBottom: 20 },
  infoBox: { display: 'flex', alignItems: 'center', gap: 20 },
  statsBox: { display: 'flex', alignItems: 'center', gap: 20 },
  buttonContainer: { marginBottom: 20 },
  viewReportButton: { padding: '8px 16px', marginLeft: '50px', backgroundColor: '#BC2626', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' },
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
  modalRoomName: { fontSize: 20, fontWeight:"bold",marginBottom: 16, textAlign: 'center' },
  modalGrid: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  reportCard: { background: '#F7F6FE', padding: 12, borderRadius: 6, width: '100%', maxWidth: 600, textAlign: 'center' },
  checkinPhoto: { marginTop: 12 },
  tableContainer: { background: '#fff', padding: 20, borderRadius: 10, boxShadow: '0px 2px 10px rgba(0,0,0,0.1)' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#F7F6FE' },
  th: { padding: 10, textAlign: 'center', background: '#fff', border: '1px solid #ccc' },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: 10, textAlign: 'center', border: '1px solid #ccc', wordWrap: 'break-word' },
  status: { padding: '4px 8px', borderRadius: 4, fontWeight: 'bold' },
  pagination: { display: 'flex', justifyContent: 'center', marginTop: 15 },
  pageBtn: { background: '#fff', color: '#555', border: 'none', padding: '6px 12px', margin: '0 4px', cursor: 'pointer', borderRadius: 4 },
  pageBtnActive: { background: '#BC2626', color: '#fff' }
};

export default ShiftReports;
