
import React from 'react';
import { Star, Trophy, Shield } from 'lucide-react';
import { Team } from '../../types/match';

interface TeamDisplayProps {
  team: Team | null;
  label: string;
  position: 'home' | 'away';
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team, label, position }) => {
  const renderTeamForm = (form: string) => {
    return (
      <div className="flex gap-0.5 mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {form.split('').map((result, index) => (
          <span
            key={index}
            className={`text-[10px] font-medium px-1 rounded transition-all hover:scale-110 ${
              result === 'W' ? 'bg-green-500/20 text-green-400' :
              result === 'D' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}
          >
            {result}
          </span>
        ))}
      </div>
    );
  };

  const renderTeamPosition = (position: number) => {
    return (
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
        <Shield className="w-3 h-3 text-blue-400" />
        <span className="text-[10px] font-medium text-blue-300">#{position}</span>
      </div>
    );
  };

  return (
    <>
      <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
        <Trophy className="w-3.5 h-3.5 text-amber-400 animate-float" />
        {label}
      </label>
      <div className={`relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-500 ${team ? 'border border-blue-500/20 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/20 hover:border-blue-500/30' : 'border border-white/5'}`}>
        {team ? (
          <div className="text-center transform transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 mx-auto relative mb-2 animate-scale-up">
              <img 
                alt={team.name}
                src={team.logo}
                className="object-contain w-full h-full filter drop-shadow-lg transition-transform duration-300 hover:scale-110"
              />
            </div>
            <span className="text-white text-sm font-medium">{team.name}</span>
            {renderTeamForm(team.form)}
            {renderTeamPosition(team.position)}
          </div>
        ) : (
          <div className="text-gray-400 flex flex-col items-center gap-2 animate-pulse-subtle">
            <Star className="w-8 h-8 opacity-40" />
            <span className="text-xs">Select {position} team</span>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamDisplay;
