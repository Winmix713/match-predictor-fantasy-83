
import React from 'react';
import { Clock, Timer } from 'lucide-react';

interface MatchHeaderProps {
  id: number;
  time: string;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ id, time }) => {
  const getTimeStatus = () => {
    const now = new Date();
    const matchTime = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    matchTime.setHours(hours, minutes);

    const diffMs = matchTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins > 60) {
      return {
        label: `Starts in ${Math.floor(diffMins / 60)}h ${diffMins % 60}m`,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20'
      };
    } else if (diffMins > 0) {
      return {
        label: `Starts in ${diffMins}m`,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20'
      };
    } else if (diffMins > -90) {
      return {
        label: 'Live',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20'
      };
    } else {
      return {
        label: 'Finished',
        color: 'text-gray-400',
        bgColor: 'bg-gray-500/20'
      };
    }
  };

  const timeStatus = getTimeStatus();

  return (
    <div className="flex items-center justify-between mb-5 relative animate-slide-in-bottom" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full animate-pulse-subtle">
          Match {id}
        </span>
        <div className={`px-2 py-0.5 rounded text-xs font-medium ${timeStatus.bgColor} ${timeStatus.color} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
          <span className="flex items-center gap-1.5">
            <Timer className="w-3 h-3 animate-pulse-subtle" />
            {timeStatus.label}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Clock className="w-4 h-4 text-blue-400" />
        <span className="text-xs font-medium text-blue-300">{time} GMT</span>
      </div>
    </div>
  );
};

export default MatchHeader;
