
import React, { useState } from 'react';
import { ChevronDown, ArrowRight, Trophy, Clock, Star, Check, Shield, Timer } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for teams with additional info
const teams = [
  { 
    id: 1, 
    name: 'Arsenal',
    logo: 'https://media.api-sports.io/football/teams/42.png',
    form: 'WWDLW',
    position: 1
  },
  { 
    id: 2, 
    name: 'Aston Villa',
    logo: 'https://media.api-sports.io/football/teams/66.png',
    form: 'WDWLW',
    position: 4
  },
  { 
    id: 3, 
    name: 'Brighton',
    logo: 'https://media.api-sports.io/football/teams/51.png',
    form: 'DLWWD',
    position: 7
  },
  { 
    id: 4, 
    name: 'Chelsea',
    logo: 'https://media.api-sports.io/football/teams/49.png',
    form: 'LWDWL',
    position: 11
  }
];

export interface Team {
  id: number;
  name: string;
  logo: string;
  form: string;
  position: number;
}

export interface MatchProps {
  id: number;
  time: string;
  homeTeam: Team | null;
  awayTeam: Team | null;
  isSelectable?: boolean;
}

const MatchCard: React.FC<MatchProps> = ({ 
  id, 
  time, 
  homeTeam: initialHomeTeam, 
  awayTeam: initialAwayTeam,
  isSelectable = false 
}) => {
  const [homeTeam, setHomeTeam] = useState<Team | null>(initialHomeTeam);
  const [awayTeam, setAwayTeam] = useState<Team | null>(initialAwayTeam);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isAwayDropdownOpen, setIsAwayDropdownOpen] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<'home' | 'draw' | 'away' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePredictMatch = async () => {
    if (!homeTeam || !awayTeam || !selectedPrediction) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let resultMessage = '';
      switch (selectedPrediction) {
        case 'home':
          resultMessage = `Prediction submitted: ${homeTeam.name} to win`;
          break;
        case 'draw':
          resultMessage = `Prediction submitted: Draw between ${homeTeam.name} and ${awayTeam.name}`;
          break;
        case 'away':
          resultMessage = `Prediction submitted: ${awayTeam.name} to win`;
          break;
      }
      
      toast.success(resultMessage, {
        duration: 3000,
        className: 'bg-green-500/90'
      });
    } catch (error) {
      toast.error('Failed to submit prediction. Please try again.', {
        duration: 4000,
        className: 'bg-red-500/90'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black backdrop-blur-sm p-6 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 border border-white/5 hover:border-white/10 animate-fade-in card-hover card-active">
      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shine-effect"></div>
      
      {/* Match Header */}
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

      <div className="space-y-5 staggered-animate">
        {/* Teams Container */}
        <div className="grid grid-cols-5 gap-2 items-center md:gap-4">
          {/* Home Team */}
          <div className="col-span-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
              <Trophy className="w-3.5 h-3.5 text-amber-400 animate-float" />
              Home Team
            </label>
            <div className={`relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-500 ${homeTeam ? 'border border-blue-500/20 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/20 hover:border-blue-500/30' : 'border border-white/5'}`}>
              {homeTeam ? (
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 mx-auto relative mb-2 animate-scale-up">
                    <img 
                      alt={homeTeam.name}
                      src={homeTeam.logo}
                      className="object-contain w-full h-full filter drop-shadow-lg transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <span className="text-white text-sm font-medium">{homeTeam.name}</span>
                  {renderTeamForm(homeTeam.form)}
                  {renderTeamPosition(homeTeam.position)}
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center gap-2 animate-pulse-subtle">
                  <Star className="w-8 h-8 opacity-40" />
                  <span className="text-xs">Select home team</span>
                </div>
              )}
            </div>
          </div>
          
          {/* VS */}
          <div className="col-span-1 flex flex-col items-center justify-center py-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center border border-white/10 mb-2 transition-all duration-300 hover:scale-110 animate-float">
              <span className="text-white/70 font-bold text-sm">VS</span>
            </div>
            
            {/* Prediction Pills */}
            {homeTeam && awayTeam && (
              <div className="flex gap-1.5 mt-1 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <button 
                  onClick={() => setSelectedPrediction('home')}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedPrediction === 'home' ? 'bg-blue-400 w-4 animate-pop' : 'bg-white/20 hover:bg-white/30'}`}
                  aria-label="Predict home win"
                />
                <button 
                  onClick={() => setSelectedPrediction('draw')}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedPrediction === 'draw' ? 'bg-blue-400 w-4 animate-pop' : 'bg-white/20 hover:bg-white/30'}`}
                  aria-label="Predict draw"
                />
                <button 
                  onClick={() => setSelectedPrediction('away')}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedPrediction === 'away' ? 'bg-blue-400 w-4 animate-pop' : 'bg-white/20 hover:bg-white/30'}`}
                  aria-label="Predict away win"
                />
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="col-span-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
              <Trophy className="w-3.5 h-3.5 text-amber-400 animate-float" />
              Away Team
            </label>
            <div className={`relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-500 ${awayTeam ? 'border border-blue-500/20 shadow-lg shadow-blue-500/5 hover:shadow-blue-500/20 hover:border-blue-500/30' : 'border border-white/5'}`}>
              {awayTeam ? (
                <div className="text-center transform transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 mx-auto relative mb-2 animate-scale-up">
                    <img 
                      alt={awayTeam.name}
                      src={awayTeam.logo}
                      className="object-contain w-full h-full filter drop-shadow-lg transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <span className="text-white text-sm font-medium">{awayTeam.name}</span>
                  {renderTeamForm(awayTeam.form)}
                  {renderTeamPosition(awayTeam.position)}
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center gap-2 animate-pulse-subtle">
                  <Star className="w-8 h-8 opacity-40" />
                  <span className="text-xs">Select away team</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team Selectors */}
        <div className="grid grid-cols-5 gap-4">
          {/* Home Team Selector */}
          <div className="col-span-2 relative">
            <button 
              onClick={() => {
                setIsHomeDropdownOpen(!isHomeDropdownOpen);
                if (isAwayDropdownOpen) setIsAwayDropdownOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border border-blue-500/20 rounded-lg text-white transition-all duration-300 touch-feedback active:scale-95"
            >
              {homeTeam ? (
                <div className="flex items-center gap-2">
                  <img src={homeTeam.logo} alt={homeTeam.name} className="w-5 h-5 object-contain" />
                  {homeTeam.name}
                </div>
              ) : (
                'Select home team'
              )}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHomeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isHomeDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl overflow-hidden animate-fade-in-scale">
                {teams.map((team, index) => (
                  <button
                    key={team.id}
                    onClick={() => {
                      setHomeTeam(team);
                      setIsHomeDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-white hover:bg-blue-500/10 transition-colors duration-200 border-b border-gray-800/50 last:border-0 touch-feedback"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <img src={team.logo} alt={team.name} className="w-5 h-5 object-contain" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{team.name}</div>
                      <div className="text-xs text-gray-400">Position: #{team.position}</div>
                    </div>
                    {homeTeam?.id === team.id && (
                      <Check className="w-4 h-4 text-blue-400 animate-pop" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Middle Spacer */}
          <div className="col-span-1"></div>
          
          {/* Away Team Selector */}
          <div className="col-span-2 relative">
            <button 
              onClick={() => {
                setIsAwayDropdownOpen(!isAwayDropdownOpen);
                if (isHomeDropdownOpen) setIsHomeDropdownOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border border-blue-500/20 rounded-lg text-white transition-all duration-300 touch-feedback active:scale-95"
            >
              {awayTeam ? (
                <div className="flex items-center gap-2">
                  <img src={awayTeam.logo} alt={awayTeam.name} className="w-5 h-5 object-contain" />
                  {awayTeam.name}
                </div>
              ) : (
                'Select away team'
              )}
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isAwayDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isAwayDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-lg shadow-xl overflow-hidden animate-fade-in-scale">
                {teams.map((team, index) => (
                  <button
                    key={team.id}
                    onClick={() => {
                      setAwayTeam(team);
                      setIsAwayDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-white hover:bg-blue-500/10 transition-colors duration-200 border-b border-gray-800/50 last:border-0 touch-feedback"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <img src={team.logo} alt={team.name} className="w-5 h-5 object-contain" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{team.name}</div>
                      <div className="text-xs text-gray-400">Position: #{team.position}</div>
                    </div>
                    {awayTeam?.id === team.id && (
                      <Check className="w-4 h-4 text-blue-400 animate-pop" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Prediction Options */}
        {homeTeam && awayTeam && (
          <div className="grid grid-cols-3 gap-2 mt-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setSelectedPrediction('home')}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 ${
                selectedPrediction === 'home'
                  ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20 animate-pop'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105 active:scale-95'
              } touch-feedback`}
            >
              {selectedPrediction === 'home' ? <Check className="w-3 h-3 animate-slide-in-right" /> : null}
              {homeTeam.name} Win
            </button>
            <button
              onClick={() => setSelectedPrediction('draw')}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 ${
                selectedPrediction === 'draw'
                  ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20 animate-pop'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105 active:scale-95'
              } touch-feedback`}
            >
              {selectedPrediction === 'draw' ? <Check className="w-3 h-3 animate-slide-in-right" /> : null}
              Draw
            </button>
            <button
              onClick={() => setSelectedPrediction('away')}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-300 ${
                selectedPrediction === 'away'
                  ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20 animate-pop'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:scale-105 active:scale-95'
              } touch-feedback`}
            >
              {selectedPrediction === 'away' ? <Check className="w-3 h-3 animate-slide-in-right" /> : null}
              {awayTeam.name} Win
            </button>
          </div>
        )}
      </div>

      {/* Predict Button */}
      <div className="pt-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <button 
          className={`
            btn-primary inline-flex items-center justify-center gap-2 w-full px-4 py-3 
            rounded-lg font-medium text-sm
            ${homeTeam && awayTeam && selectedPrediction && !isSubmitting
              ? 'btn-primary'
              : 'bg-gray-800 text-gray-400 cursor-not-allowed'
            }
            relative overflow-hidden
          `}
          disabled={!homeTeam || !awayTeam || !selectedPrediction || isSubmitting}
          onClick={handlePredictMatch}
        >
          {/* Button Shine Effect */}
          <span className="absolute inset-0 overflow-hidden rounded-lg">
            <span className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full hover:animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </span>
          
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </span>
          ) : (
            <>
              Predict Match
              <ArrowRight className="w-4 h-4 animate-slide-in-left" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
export { teams };
