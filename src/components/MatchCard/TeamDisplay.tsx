
import React from 'react';
import { Shield, Star } from 'lucide-react';
import { Team } from '../../types/match';
import { cn } from '../../lib/utils';

interface TeamDisplayProps {
  team: Team | null;
  type: 'home' | 'away';
  label: string;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team, type, label }) => {
  // Magyar forma megjelenítés (GY/D/V a W/D/L helyett)
  const renderTeamForm = (form: string) => {
    const formMapping: Record<string, { char: string, bgColor: string, textColor: string }> = {
      'W': { char: 'GY', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
      'G': { char: 'GY', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
      'Y': { char: 'GY', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
      'D': { char: 'D', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
      'L': { char: 'V', bgColor: 'bg-red-500/20', textColor: 'text-red-400' },
      'V': { char: 'V', bgColor: 'bg-red-500/20', textColor: 'text-red-400' }
    };

    return (
      <div className="flex gap-0.5 mt-2">
        {form.split('').map((result, index) => {
          const mappedResult = formMapping[result] || { char: result, bgColor: 'bg-gray-500/20', textColor: 'text-gray-400' };
          
          return (
            <span
              key={index}
              className={cn(`text-[10px] font-medium px-1 rounded ${mappedResult.bgColor} ${mappedResult.textColor}`)}
            >
              {mappedResult.char}
            </span>
          );
        })}
      </div>
    );
  };

  const renderTeamPosition = (position: number) => {
    return (
      <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded">
        <Shield className="w-3 h-3 text-blue-400" />
        <span className="text-[10px] font-medium text-blue-300">#{position}</span>
      </div>
    );
  };

  return (
    <div className={cn(`relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-300 ${team ? 'border border-blue-500/20 shadow-lg shadow-blue-500/5' : 'border border-white/5'}`)}>
      {team ? (
        <div className="text-center transform transition-all duration-300 hover:scale-105">
          <div className="w-16 h-16 mx-auto relative mb-2">
            <img 
              alt={team.name}
              src={team.logo}
              className="object-contain w-full h-full filter drop-shadow-lg"
            />
          </div>
          <span className="text-white text-sm font-medium">{team.name}</span>
          {team.form && renderTeamForm(team.form)}
          {team.position && renderTeamPosition(team.position)}
        </div>
      ) : (
        <div className="text-gray-400 flex flex-col items-center gap-2">
          <Star className="w-8 h-8 opacity-40" />
          <span className="text-xs">{type === 'home' ? 'Válassz hazai csapatot' : 'Válassz vendég csapatot'}</span>
        </div>
      )}
    </div>
  );
};

export default TeamDisplay;
