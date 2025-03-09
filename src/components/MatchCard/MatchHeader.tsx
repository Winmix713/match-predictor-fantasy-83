
import React from 'react';
import { Timer, Clock } from 'lucide-react';
import { League } from '../../types/match';

interface MatchHeaderProps {
  id: number;
  time: string;
  league?: League;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({
  id,
  time,
  league
}) => {
  const getTimeStatus = () => {
    const now = new Date();
    const matchTime = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    matchTime.setHours(hours, minutes);

    const diffMs = matchTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins > 60) {
      return {
        label: `Kezdés ${Math.floor(diffMins / 60)}ó ${diffMins % 60}p múlva`,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20'
      };
    } else if (diffMins > 0) {
      return {
        label: `Kezdés ${diffMins}p múlva`,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20'
      };
    } else if (diffMins > -90) {
      return {
        label: 'Élő',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20'
      };
    } else {
      return {
        label: 'Befejezett',
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/20'
      };
    }
  };

  const timeStatus = getTimeStatus();

  return (
    <div className="flex flex-col space-y-2">
      {/* Liga információ */}
      {league && (
        <div className="flex items-center gap-2 bg-gray-800/50 p-1.5 rounded-lg">
          <img 
            src={league.logo} 
            alt={league.name} 
            className="w-5 h-5 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white">{league.name}</span>
            <span className="text-[10px] text-gray-400">{league.country}</span>
          </div>
        </div>
      )}
    
      {/* Mérkőzés header */}
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
            Mérkőzés {id}
          </span>
          <div className={`px-2 py-0.5 rounded text-xs font-medium ${timeStatus.bgColor} ${timeStatus.color}`}>
            <span className="flex items-center gap-1.5">
              <Timer className="w-3 h-3" />
              {timeStatus.label}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium text-blue-300">{time} CET</span>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
