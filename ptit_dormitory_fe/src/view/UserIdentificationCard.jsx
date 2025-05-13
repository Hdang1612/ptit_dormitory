import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const UserIdentificationCard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "120vh" }}>
      {/* Sidebar */}
      <Sidebar role="sinhvien" username="Trần Văn A" />

      {/* Content */}
      <div
        style={{
          margin: "0 auto",
          flex: 1,
          padding: "20px",
          background: "#f0f0f0",
        }}
      >
        <h2 style={{ textAlign: "center", margin: "20px 200px 20px 400px" }}>
          Thẻ định danh người dùng
        </h2>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "900px",
            margin: "0px 200px 0px 400px",
            height: "300px",
          }}
        >
          <h3 style={{ color: "#a40000", textAlign: "center" }}>
            THẺ ĐỊNH DANH
          </h3>
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            {/* User Image */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  background: "#d9d9d9",
                  borderRadius: "10px",
                  marginRight: "20px",
                }}
              >
                <i
                  style={{
                    fontSize: "100px",
                    lineHeight: "150px",
                    color: "#555",
                  }}
                >
                  &#128100;
                </i>
              </div>
              <p style={{ paddingTop: "10px" }}>Có giá trị đến: 30/4/2025</p>
              <button 
                onClick={() => navigate('/giahanhopdong/1')} 
                style={{
                  backgroundColor: "#a40000",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                  width: "100%"
                }}
              >
                Gia hạn hợp đồng
              </button>
            </div>

            {/* User Info */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div>
                <b>Số No:</b> 0123456789
              </div>
              <div>
                <b>Mã sinh viên:</b> B21DCPT000
              </div>
              <div>
                <b>Giới tính:</b> Nam
              </div>
              <div>
                <b>Điện thoại:</b> 0123456789
              </div>
              <div>
                <b>Quê quán:</b> Hà Nội
              </div>
              <div>
                <b>Khu ký túc:</b> B
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div>
                <b>Họ và tên:</b> Nguyễn Văn A
              </div>
              <div>
                <b>Lớp:</b> D21PTDPT
              </div>
              <div>
                <b>Ngày sinh:</b> 23/06/2002
              </div>
              <div>
                <b>Email:</b>{" "}
                <a href="mailto:NguyenVanA@ptit.edu.vn">
                  NguyenVanA@ptit.edu.vn
                </a>
              </div>
              <div>
                <b>Trạng thái:</b>{" "}
                <span style={{ color: "green" }}>Đang lưu trú</span>
              </div>
              <div>
                <b>Phòng:</b> <b>B-205</b>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "900px",
            margin: "10px 200px 0px 400px",
            height: "400px",
          }}
        >
          <p>
            (1) Bảo quản và sử dụng thẻ đúng mục đích. Khi thẻ bị mất, hỏng vì
            lý do chính đáng, cần báo ngay cho Trung tâm dịch vụ để tiến hành
            đổi thẻ. Khi hết hạn sử dụng cần thực hiện gia hạn theo quy định của
            học viện.
          </p>
          <p>
            (2) Sinh viên mang theo thẻ khi ra, vào Học viện và xuất trình với
            bảo vệ, đơn vị sinh viên nội trú khi cần thiết.
          </p>
          <p>(3) Không được mượn hoặc cho người khác mượn thẻ.</p>
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <div
              style={{
                flex: 2,
                flexDirection: "column",
                display: "flex",
                marginLeft: "50px",
              }}
            >
              <div>Cấp lần 1</div>
              <div>Gia hạn lần: </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "Center",
                flexDirection: "column",
              }}
            >
              <div>Hà Nội, Ngày..., tháng..., năm...</div>
              <div>
                <b>TL. GIÁM ĐỐC</b>
              </div>
              <div>KT. GIÁM ĐỐC</div>
              <div>PHÓ GIÁM ĐỐC</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserIdentificationCard;