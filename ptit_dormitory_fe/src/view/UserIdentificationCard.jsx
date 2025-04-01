import React from "react";
import Sidebar from "../components/Sidebar";

const UserIdentificationCard = () => {
  return (
    <div style={{ display: "flex", height: "95vh" }}>
      {/* Sidebar */}
      <Sidebar />

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
      </div>
    </div>
  );
};

export default UserIdentificationCard;
