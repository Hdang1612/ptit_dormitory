import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import TopShiftSchedule from "../components/TopShiftSchedule";
import { useNavigate } from "react-router-dom";
import { getListSchedule } from "../service/scheduleService.js";
import ShiftReports from "./ShiftReports";

const ShiftManagement = () => {
  const navigate = useNavigate();
  const handleArrange = () => navigate('/shiftschedule');

  // Filter and pagination state
  const [shiftDate, setShiftDate] = useState('');
  const [floor, setFloor] = useState('');
  const [shifts, setShifts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 5,
    totalPages: 0,
    totalRecords: 0,
  });

  // Fetch data when filters or page change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListSchedule(shiftDate, floor, pagination.currentPage, pagination.limit);
        if (res && Array.isArray(res.data)) {
          setShifts(res.data);
          setPagination(prev => ({
            ...prev,
            totalPages: res.pagination.totalPages,
            totalRecords: res.pagination.total,
          }));
        } else {
          setShifts([]);
          setPagination(prev => ({ ...prev, totalPages: 0, totalRecords: 0 }));
        }
      } catch (err) {
        console.error('Lỗi khi lấy lịch trực:', err);
      }
    };
    fetchData();
  }, [shiftDate, floor, pagination.currentPage, pagination.limit]);

  const changePage = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const goReport = (shift) => {
    navigate("/shift-reports", {
      state: {
        shiftId: shift.id,
        placeId: shift.place.id,
        userName: `${shift.user.first_name} ${shift.user.last_name}`,
        shiftDate: shift.shift_date,
        shiftStart: shift.shift_start,
        shiftEnd: shift.shift_end,
      },
    });
  };


  return (
    <div style={styles.container}>
      <Sidebar/>
      <div style={styles.content}>
        <h2 style={styles.title}>Quản lý ca trực</h2>
        <TopShiftSchedule
          shiftDate={shiftDate}
          onDateChange={setShiftDate}
          floor={floor}
          onFloorChange={setFloor}
        />

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Họ và Tên</th>
                <th style={styles.th}>Ngày</th>
                <th style={styles.th}>Ca trực</th>
                <th style={styles.th}>Tầng</th>
                <th style={styles.th}>Báo cáo</th>
                <th style={styles.th}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map(shift => (
                <tr key={shift.id} style={styles.tr}>
                  <td style={styles.td}>{shift.id}</td>
                  <td style={styles.td}>{shift.user.first_name} {shift.user.last_name}</td>
                  <td style={styles.td}>{new Date(shift.shift_date).toLocaleDateString('vi-VN')}</td>
                  <td style={styles.td}>{shift.shift_start} - {shift.shift_end}</td>
                  <td style={styles.td}>{shift.place.area_name}</td>
                  <td style={styles.td}>
                    {shift.status
                      ? <span style={{ ...styles.status, backgroundColor:'#EBF9F1', color:'#1F9254' }}>Đã báo cáo</span>
                      : <span style={{ ...styles.status, backgroundColor:'#F9D2D3', color:'#A30D11' }}>Chưa báo cáo</span>
                    }
                  </td>
                  
                  <td style={styles.td}>
                    <button style={styles.viewBtn} onClick={() => goReport(shift)}>Xem</button>
                  </td>
                </tr>
              ))}
              {shifts.length === 0 && (
                <tr><td colSpan={6} style={styles.td}>Không có dữ liệu</td></tr>
              )}
            </tbody>
          </table>

          <div style={styles.pagination}>
            <button style={styles.pageBtn} onClick={() => changePage(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}>Trước</button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                style={{
                  ...styles.pageBtn,
                  ...(pagination.currentPage === page ? styles.pageBtnActive : {})
                }}
                onClick={() => changePage(page)}
              >{page}</button>
            ))}
            <button style={styles.pageBtn} onClick={() => changePage(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.totalPages}>Sau</button>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button style={styles.scheduleButton} onClick={handleArrange}>Sắp xếp lịch trực</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display:'flex', height:'100vh' },
  content: { flex:1, padding:20, background:'#f0f0f0', marginLeft:220, width:'calc(100% - 220px)' },
  title: { textAlign:'center', marginBottom:20, fontWeight:'bold', fontSize:24 },
  tableContainer: { background:'white', padding:20, borderRadius:10, boxShadow:'0px 2px 10px rgba(0,0,0,0.1)' },
  table: { width:'100%', borderCollapse:'collapse', backgroundColor:'#F7F6FE' },
  th: { padding:10, textAlign:'center', background:'#fff', border:'1px solid #ccc' },
  tr: { borderBottom:'1px solid #ddd' },
  td: { padding:10, textAlign:'center', border:'1px solid #ccc', wordWrap:'break-word' },
  status: { padding:'5px 10px', borderRadius:5, fontWeight:'bold' },
  viewBtn: { backgroundColor:'white', border:'2px solid black', padding:'5px 10px', borderRadius:5, cursor:'pointer' },
  pagination: { display:'flex', justifyContent:'center', marginTop:20 },
  pageBtn: { background:'#fff', color:'#9E9E9E', border:'none', padding:'8px 16px', margin:'0 5px', cursor:'pointer', borderRadius:5 },
  pageBtnActive: { background:'#BC2626', color:'white' },
  buttonContainer:{ display:'flex', justifyContent:'flex-end', marginTop:20 },
  scheduleButton:{ padding:'10px 20px', backgroundColor:'#BC2626', color:'white', border:'none', borderRadius:5, cursor:'pointer' }
};

export default ShiftManagement;
