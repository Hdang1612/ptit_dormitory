import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';

const RoomMoney = ({ room, onClick }) => {
  return (
    <Card 
      className="bg-white rounded-xl overflow-hidden shadow-sm p-6 cursor-pointer hover:shadow-md transition-all duration-500 ease-in-out hover:scale-102 transform will-change-transform"
      onClick={onClick}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{room.name}</h3>
        <div className="space-y-2">
          <p className="text-3xl font-bold">{room.amount.toLocaleString()} VND</p>
          <span className={`px-3 py-1 rounded-full text-sm ${
            room.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {room.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </span>
        </div>
      </div>
    </Card>
  );
};

RoomMoney.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    isPaid: PropTypes.bool
  }).isRequired,
  onClick: PropTypes.func
};

export default RoomMoney;