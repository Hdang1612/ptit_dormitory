import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Download, Bell } from 'lucide-react';

const BigPowerUsageCard = ({ room, onClose }) => {
  const isWarningLevel = room.power > 3000;
  const warningPercentage = isWarningLevel 
    ? ((room.power - 3000) / 3000 * 100).toFixed(1)
    : ((3000 - room.power) / 3000 * 100).toFixed(1);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) {
      return;
    }
    onClose();
  };

  return (
    <Card 
      className="absolute top-0 left-0 w-full bg-white rounded-xl overflow-hidden shadow-2xl p-8 cursor-pointer z-50"
      onClick={handleCardClick}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-medium">{room.name}</h3>
            <div className="mt-4">
              <p className="text-4xl font-bold">{room.power}W</p>
              <p className="text-lg mt-1">{room.amount.toLocaleString()} VND</p>
              <div className="flex items-center gap-2 mt-2">
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
          <Button
            variant="ghost"
            className="text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </Button>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Tính năng</h4>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="w-5 h-5" />
              Tải thống kê theo tháng
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <Bell className="w-5 h-5" />
              Cảnh báo
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

BigPowerUsageCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    power: PropTypes.number,
    amount: PropTypes.number,
    percentChange: PropTypes.number
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default BigPowerUsageCard;