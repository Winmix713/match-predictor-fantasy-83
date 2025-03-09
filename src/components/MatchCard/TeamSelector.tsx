
import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Team } from '../../types/match';

interface TeamSelectorProps {
  team: Team | null;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  onSelectTeam: (team: Team) => void;
  teams: Team[];
  type: 'home' | 'away';
  closeOtherDropdown?: () => void;
}

const TeamSelector: React.FC<TeamSelectorProps> = ({
  team,
  isDropdownOpen,
  setIsDropdownOpen,
  onSelectTeam,
  teams,
  type,
  closeOtherDropdown
}) => {
  const handleToggleDropdown = () => {
    if (closeOtherDropdown) {
      closeOtherDropdown();
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button 
        onClick={handleToggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border border-blue-500/20 rounded-lg text-white transition-all duration-300"
      >
        {team ? (
          <div className="flex items-center gap-2">
            <img src={team.logo} alt={team.name} className="w-5 h-5 object-contain" />
            {team.name}
          </div>
        ) : (
          type === 'home' ? 'Válassz hazai csapatot' : 'Válassz vendég csapatot'
        )}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          {teams.map(teamOption => (
            <button
              key={teamOption.id}
              onClick={() => {
                onSelectTeam(teamOption);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-white hover:bg-blue-500/10 transition-colors duration-200 border-b border-gray-800/50 last:border-0"
            >
              <img src={teamOption.logo} alt={teamOption.name} className="w-5 h-5 object-contain" />
              <div className="flex-1 text-left">
                <div className="font-medium">{teamOption.name}</div>
                <div className="text-xs text-gray-400">Helyezés: #{teamOption.position}</div>
              </div>
              {team?.id === teamOption.id && (
                <Check className="w-4 h-4 text-blue-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSelector;
