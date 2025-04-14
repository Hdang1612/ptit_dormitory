import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';

const RoomElectrical = ({ room, onClick }) => {
  return (
    <Card 
      className="bg-white rounded-xl overflow-hidden shadow-sm p-6 cursor-pointer hover:shadow-md transition-all duration-500 ease-in-out hover:scale-102 transform will-change-transform"
      onClick={onClick}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{room.name}</h3>
        <div className="space-y-2">
          <p className="text-3xl font-bold">{room.amount.toLocaleString()} VND</p>
          <div className={`flex items-center gap-2 ${
            room.percentChange > 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            <span className="text-sm">
              {room.percentChange > 0 ? '+' : ''}{room.percentChange}%
            </span>
            <span className="text-sm">so với tháng trước</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

RoomElectrical.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.number,
    percentChange: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func
};

export default RoomElectrical;