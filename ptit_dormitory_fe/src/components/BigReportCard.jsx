import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { User } from 'lucide-react';

const BigReportCard = ({ room, onClose }) => {
  const maxPeople = 8;
  const remainingSlots = maxPeople - room.occupants.length;
  const isFull = remainingSlots === 0;

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
            <p className="text-sm text-gray-600">{room.area}</p>
            <h3 className="text-xl font-medium">Phòng {room.number}</h3>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              room.needsMaintenance ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {room.needsMaintenance ? 'Cần được bảo trì' : 'Cần được bảo trì'}
            </span>
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
        </div>

        <div className="flex gap-1">
          {Array.from({ length: maxPeople }).map((_, index) => {
            const occupant = room.occupants[index];
            return (
              <User
                key={index}
                className={`w-8 h-8 ${
                  occupant
                    ? occupant.gender === 'male'
                      ? 'fill-green-500 text-green-500'
                      : 'fill-pink-500 text-pink-500'
                    : 'text-gray-300'
                }`}
              />
            );
          })}
        </div>

        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
          isFull ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {isFull ? 'Đủ người' : `Còn trống ${remainingSlots} chỗ`}
        </span>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Thành viên phòng</h4>
          <div className="space-y-2">
            {room.occupants.map((occupant) => (
              <div
                key={occupant.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  occupant.gender === 'male' ? 'bg-green-50' : 'bg-pink-50'
                }`}
              >
                <User className={`w-5 h-5 ${
                  occupant.gender === 'male' ? 'text-green-500' : 'text-pink-500'
                }`} />
                <span className="text-gray-800">{occupant.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

BigReportCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    area: PropTypes.string,
    number: PropTypes.string,
    needsMaintenance: PropTypes.bool,
    occupants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      gender: PropTypes.oneOf(['male', 'female'])
    }))
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default BigReportCard;