
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Team, PredictionType, MatchProps } from '../../types/match';
import { generateHeadToHead, teams as teamData } from '../../data/teams';
import MatchHeader from './MatchHeader';
import TeamDisplay from './TeamDisplay';
import TeamSelector from './TeamSelector';
import PredictionButtons from './PredictionButtons';
import MatchStatistics from './MatchStatistics';

const MatchCard: React.FC<MatchProps> = ({ 
  id, 
  time, 
  homeTeam: initialHomeTeam, 
  awayTeam: initialAwayTeam,
  league,
  isSelectable = false 
}) => {
  const [homeTeam, setHomeTeam] = useState<Team | null>(initialHomeTeam);
  const [awayTeam, setAwayTeam] = useState<Team | null>(initialAwayTeam);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isAwayDropdownOpen, setIsAwayDropdownOpen] = useState(false);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);
  const [headToHead, setHeadToHead] = useState<ReturnType<typeof generateHeadToHead>>([]);

  // Amikor a csapatok változnak, frissítjük az egymás elleni mérkőzéseket
  useEffect(() => {
    if (homeTeam && awayTeam) {
      setHeadToHead(generateHeadToHead(homeTeam.id, awayTeam.id));
    } else {
      setHeadToHead([]);
    }
  }, [homeTeam, awayTeam]);

  const handlePredictMatch = async () => {
    if (!homeTeam || !awayTeam || !selectedPrediction) return;
    
    setIsSubmitting(true);
    
    try {
      // API hívás szimulálása
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let resultMessage = '';
      switch (selectedPrediction) {
        case 'home':
          resultMessage = `Tipp elküldve: ${homeTeam.name} győzelem`;
          break;
        case 'draw':
          resultMessage = `Tipp elküldve: Döntetlen (${homeTeam.name} - ${awayTeam.name})`;
          break;
        case 'away':
          resultMessage = `Tipp elküldve: ${awayTeam.name} győzelem`;
          break;
      }
      
      toast.success(resultMessage, {
        duration: 3000,
        className: 'bg-green-500/90'
      });
    } catch (error) {
      toast.error('Hiba történt a tipp elküldésekor. Kérjük, próbáld újra.', {
        duration: 4000,
        className: 'bg-red-500/90'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 border border-white/5 hover:border-white/10 animate-fade-in">
      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Match Header */}
      <div className="mb-5">
        <MatchHeader id={id} time={time} league={league} />
      </div>

      <div className="space-y-5">
        {/* Teams Container */}
        <div className="grid grid-cols-5 gap-2 items-center">
          {/* Home Team */}
          <div className="col-span-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
              <span className="text-amber-400">●</span>
              Hazai csapat
            </label>
            <TeamDisplay 
              team={homeTeam} 
              type="home" 
              label="Hazai csapat" 
            />
          </div>
          
          {/* VS */}
          <div className="col-span-1 flex flex-col items-center justify-center py-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center border border-white/10 mb-2">
              <span className="text-white/70 font-bold text-sm">VS</span>
            </div>
            
            {/* Prediction Pills */}
            {homeTeam && awayTeam && (
              <div className="flex gap-1.5 mt-1">
                <button 
                  onClick={() => setSelectedPrediction('home')}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedPrediction === 'home' ? 'bg-blue-400 w-4' : 'bg-white/20 hover:bg-white/30'}`}
                  aria-label="Tipp: hazai győzelem"
                />
                <button 
                  onClick={() => setSelectedPrediction('draw')}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedPrediction === 'draw' ? 'bg-blue-400 w-4' : 'bg-white/20 hover:bg-white/30'}`}
                  aria-label="Tipp: döntetlen"
                />
                <button 
                  onClick={() => setSelectedPrediction('away')}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedPrediction === 'away' ? 'bg-blue-400 w-4' : 'bg-white/20 hover:bg-white/30'}`}
                  aria-label="Tipp: vendég győzelem"
                />
              </div>
            )}
          </div>
          
          {/* Away Team */}
          <div className="col-span-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
              <span className="text-amber-400">●</span>
              Vendég csapat
            </label>
            <TeamDisplay 
              team={awayTeam} 
              type="away" 
              label="Vendég csapat" 
            />
          </div>
        </div>

        {/* Team Selectors */}
        <div className="grid grid-cols-5 gap-4">
          {/* Home Team Selector */}
          <div className="col-span-2">
            <TeamSelector
              team={homeTeam}
              isDropdownOpen={isHomeDropdownOpen}
              setIsDropdownOpen={setIsHomeDropdownOpen}
              onSelectTeam={setHomeTeam}
              teams={teamData}
              type="home"
              closeOtherDropdown={() => setIsAwayDropdownOpen(false)}
            />
          </div>
          
          {/* Middle Spacer */}
          <div className="col-span-1"></div>
          
          {/* Away Team Selector */}
          <div className="col-span-2">
            <TeamSelector
              team={awayTeam}
              isDropdownOpen={isAwayDropdownOpen}
              setIsDropdownOpen={setIsAwayDropdownOpen}
              onSelectTeam={setAwayTeam}
              teams={teamData}
              type="away"
              closeOtherDropdown={() => setIsHomeDropdownOpen(false)}
            />
          </div>
        </div>

        {/* Prediction Options */}
        <PredictionButtons
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          selectedPrediction={selectedPrediction}
          setSelectedPrediction={setSelectedPrediction}
        />

        {/* Match Statistics (csak akkor mutatjuk, ha mindkét csapat ki van választva) */}
        {homeTeam && awayTeam && (
          <MatchStatistics
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            headToHead={headToHead}
            isExpanded={isStatsExpanded}
            toggleExpanded={() => setIsStatsExpanded(!isStatsExpanded)}
          />
        )}
      </div>

      {/* Predict Button */}
      <div className="pt-6">
        <button 
          className={`
            inline-flex items-center justify-center gap-2 w-full px-4 py-3 
            rounded-lg font-medium text-sm transition-all duration-300
            ${homeTeam && awayTeam && selectedPrediction && !isSubmitting
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
              : 'bg-gray-800 text-gray-400 cursor-not-allowed'
            }
            relative overflow-hidden
          `}
          disabled={!homeTeam || !awayTeam || !selectedPrediction || isSubmitting}
          onClick={handlePredictMatch}
        >
          {/* Button Shine Effect */}
          <span className="absolute inset-0 overflow-hidden rounded-lg">
            <span className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full animate-[shine_2.5s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </span>
          
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Küldés...
            </span>
          ) : (
            <>
              Tipp elküldése
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
export { teamData as teams };
