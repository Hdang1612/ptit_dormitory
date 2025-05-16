import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';

const PowerUsageCard = ({ room, onClick }) => {
  const isWarningLevel = room.power > 3000;
  const warningPercentage = isWarningLevel 
    ? ((room.power - 3000) / 3000 * 100).toFixed(1)
    : ((3000 - room.power) / 3000 * 100).toFixed(1);

  return (
    <Card 
      className="bg-white rounded-xl overflow-hidden shadow-sm p-6 cursor-pointer hover:shadow-md transition-all duration-500 ease-in-out hover:scale-102 transform will-change-transform"
      onClick={onClick}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{room.name}</h3>
        <div className="space-y-2">
          <p className="text-3xl font-bold">{room.power}W</p>
          <p className="text-lg">{room.amount.toLocaleString()} VND</p>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              isWarningLevel ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {isWarningLevel 
                ? `Mức cảnh báo (+${warningPercentage}%)`
                : `Mức an toàn (-${warningPercentage}%)`
              }
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              room.percentChange > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {room.percentChange > 0 ? '+' : ''}{room.percentChange}%
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

PowerUsageCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    power: PropTypes.number,
    amount: PropTypes.number,
    percentChange: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func
};

export default PowerUsageCard;