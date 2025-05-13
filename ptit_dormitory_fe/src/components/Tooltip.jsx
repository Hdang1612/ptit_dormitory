import React from 'react';
import PropTypes from 'prop-types';
import { getStatusLabel } from '../data/mockRoomData';
import { User as Mars, User as Venus } from 'lucide-react';

const Tooltip = ({ room }) => {
  if (!room) return null;

  return (
    <div className="absolute z-50 bg-white p-4 rounded-lg shadow-lg min-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">Phòng {room.id}</h3>
        {room.gender && (
          room.gender === 'male' ? 
            <Mars className="w-5 h-5 text-blue-500" /> :
            <Venus className="w-5 h-5 text-pink-500" />
        )}
      </div>
      <div className="space-y-1 text-sm">
        <p>Trạng thái: {getStatusLabel(room)}</p>
        <p>Số người: {room.occupants.length}</p>
        <p>
          Trưởng phòng: {room.occupants.find(o => o.isLeader)?.name || 'Không có'}
        </p>
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['male', 'female', null]),
    occupants: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      isLeader: PropTypes.bool.isRequired
    })).isRequired
  })
};

export default Tooltip;