import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { FileText, Download, Bell } from 'lucide-react';

const BigRoomMoney = ({ room, onClose }) => {
  const handleCardClick = (e) => {
    if (e.target.closest('button')) {
      return;
    }
    onClose();
  };

  return (
    <Card className="absolute top-0 left-0 w-full bg-white rounded-xl overflow-hidden shadow-2xl p-8 cursor-pointer z-[9999]" onClick={handleCardClick}>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-medium">{room.name}</h3>
            <div className="mt-4">
              <p className="text-4xl font-bold">{room.amount.toLocaleString()} VND</p>
              <p className="text-gray-500 mt-1">Thay đổi</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-700 transition-transform duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </Button>
        </div>

        <div>
          <span className={`px-4 py-2 rounded-full text-sm ${
            room.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {room.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </span>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Tính năng</h4>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText className="w-5 h-5" />
              Xuất hoá đơn
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-5 h-5" />
              Lưu ảnh xác nhận chuyển khoản
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Bell className="w-5 h-5" />
              Nhắc nhở chuyển tiền
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

BigRoomMoney.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    isPaid: PropTypes.bool
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default BigRoomMoney;
