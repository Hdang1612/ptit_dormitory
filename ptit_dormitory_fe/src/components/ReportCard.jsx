import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './ui/card';
import { User } from 'lucide-react';

const ReportCard = ({ room, onClick }) => {
  const maxPeople = 8;
  const remainingSlots = maxPeople - room.occupants.length;
  const isFull = remainingSlots === 0;

  return (
    <Card 
      className="bg-white rounded-xl overflow-hidden shadow-sm p-6 cursor-pointer hover:shadow-md transition-all duration-500 ease-in-out hover:scale-102 transform will-change-transform"
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-600">{room.area}</p>
            <h3 className="text-xl font-medium">Phòng {room.number}</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            room.needsMaintenance ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {room.needsMaintenance ? 'Cần được bảo trì' : 'Cần được bảo trì'}
          </span>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: maxPeople }).map((_, index) => {
            const occupant = room.occupants[index];
            return (
              <User
                key={index}
                className={`w-6 h-6 ${
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
          {isFull ? 'Đủ người' : 'Còn trống'}
        </span>
      </div>
    </Card>
  );
};

ReportCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.number,
    area: PropTypes.string,
    number: PropTypes.string,
    needsMaintenance: PropTypes.bool,
    occupants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      gender: PropTypes.oneOf(['male', 'female'])
    }))
  }).isRequired,
  onClick: PropTypes.func
};

export default ReportCard;