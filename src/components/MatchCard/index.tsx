import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Team, MatchProps, PredictionType } from '../../types/match';
import MatchHeader from './MatchHeader';
import TeamDisplay from './TeamDisplay';
import TeamSelector from './TeamSelector';
import PredictionButtons from './PredictionButtons';
import MatchActionButtons from './MatchActionButtons';
import { teams } from '../../data/teams';
import MatchStatistics from './MatchStatistics';
import { generateHeadToHead } from '../../data/teams';

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

  const toggleHomeDropdown = () => {
    setIsHomeDropdownOpen(!isHomeDropdownOpen);
    if (isAwayDropdownOpen) setIsAwayDropdownOpen(false);
  };

  const toggleAwayDropdown = () => {
    setIsAwayDropdownOpen(!isAwayDropdownOpen);
    if (isHomeDropdownOpen) setIsHomeDropdownOpen(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black backdrop-blur-sm p-6 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 border border-white/5 hover:border-white/10 animate-fade-in card-hover card-active">
      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shine-effect"></div>
      
      {/* Match Header */}
      <MatchHeader id={id} time={time} />

      <div className="space-y-5 staggered-animate">
        {/* Teams Container */}
        <div className="grid grid-cols-5 gap-2 items-center md:gap-4">
          {/* Home Team */}
          <div className="col-span-2">
            <TeamDisplay 
              team={homeTeam} 
              label="Home Team" 
              position="home"
            />
          </div>
          
          {/* VS */}
          <div className="col-span-1 flex flex-col items-center justify-center py-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center border border-white/10 mb-2 transition-all duration-300 hover:scale-110 animate-float">
              <span className="text-white/70 font-bold text-sm">VS</span>
            </div>
            
            {/* Prediction Pills */}
            {homeTeam && awayTeam && (
              <PredictionButtons 
                selectedPrediction={selectedPrediction}
                setSelectedPrediction={setSelectedPrediction}
                minimal={true}
              />
            )}
          </div>
          
          {/* Away Team */}
          <div className="col-span-2">
            <TeamDisplay 
              team={awayTeam} 
              label="Away Team" 
              position="away"
            />
          </div>
        </div>

        {/* Team Selectors */}
        <div className="grid grid-cols-5 gap-4">
          {/* Home Team Selector */}
          <div className="col-span-2 relative">
            <TeamSelector 
              team={homeTeam}
              isDropdownOpen={isHomeDropdownOpen}
              toggleDropdown={toggleHomeDropdown}
              setTeam={setHomeTeam}
              position="home"
            />
          </div>
          
          {/* Middle Spacer */}
          <div className="col-span-1"></div>
          
          {/* Away Team Selector */}
          <div className="col-span-2 relative">
            <TeamSelector 
              team={awayTeam}
              isDropdownOpen={isAwayDropdownOpen}
              toggleDropdown={toggleAwayDropdown}
              setTeam={setAwayTeam}
              position="away"
            />
          </div>
        </div>

        {/* Prediction Options */}
        {homeTeam && awayTeam && (
          <PredictionButtons 
            selectedPrediction={selectedPrediction}
            setSelectedPrediction={setSelectedPrediction}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            minimal={false}
          />
        )}

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
      <MatchActionButtons 
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        selectedPrediction={selectedPrediction}
        isSubmitting={isSubmitting}
        handlePredictMatch={handlePredictMatch}
      />
    </div>
  );
};

export default MatchCard;
export { teams };
