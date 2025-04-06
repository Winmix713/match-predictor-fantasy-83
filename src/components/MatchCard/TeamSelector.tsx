
import React from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { Team } from '../../types/match';
import { teams } from '../../data/teams';
import { useMatchContext } from './MatchContext';

interface TeamSelectorProps {
  position: 'home' | 'away';
}

const TeamSelector: React.FC<TeamSelectorProps> = ({ position }) => {
  const { 
    homeTeam,
    awayTeam,
    isHomeDropdownOpen,
    isAwayDropdownOpen,
    toggleHomeDropdown,
    toggleAwayDropdown,
    setHomeTeam,
    setAwayTeam
  } = useMatchContext();

  const team = position === 'home' ? homeTeam : awayTeam;
  const isDropdownOpen = position === 'home' ? isHomeDropdownOpen : isAwayDropdownOpen;
  const toggleDropdown = position === 'home' ? toggleHomeDropdown : toggleAwayDropdown;
  const setTeam = position === 'home' ? setHomeTeam : setAwayTeam;

  return (
    <>
      <button
        onClick={toggleDropdown}
        className={`w-full py-2.5 px-3 text-sm font-medium rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border transition-all duration-300 ${
          isDropdownOpen
            ? 'border-blue-500/30 shadow-[0_4px_15px_rgba(59,130,246,0.15)]'
            : 'border-white/10 hover:border-white/20'
        }`}
        aria-expanded={isDropdownOpen}
        aria-haspopup="listbox"
      >
        <span className="text-gray-300">
          {team ? team.name : `Válassz ${position === 'home' ? 'hazai' : 'vendég'} csapatot`}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
            isDropdownOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      {isDropdownOpen && (
        <div className="absolute left-0 right-0 mt-2 max-h-48 overflow-y-auto rounded-xl border border-white/10 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] z-10 animate-slide-in-bottom scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-900">
          <ul className="py-1" role="listbox">
            {teams.map((teamOption) => (
              <li
                key={teamOption.id}
                role="option"
                aria-selected={team?.id === teamOption.id}
                onClick={() => {
                  setTeam(teamOption);
                  toggleDropdown();
                }}
                className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors duration-200 ${
                  team?.id === teamOption.id
                    ? 'bg-blue-500/20 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-800 border border-white/5 flex items-center justify-center overflow-hidden">
                  {teamOption.logo ? (
                    <img src={teamOption.logo} alt={teamOption.name} className="w-6 h-6 object-contain" />
                  ) : (
                    <Star className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <span className="flex-1 truncate">{teamOption.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TeamSelector;
