
import React from 'react';
import { useMatchContext } from './MatchContext';
import MatchHeader from './MatchHeader';
import TeamDisplay from './TeamDisplay';
import TeamSelector from './TeamSelector';
import PredictionControls from './PredictionControls';
import MatchActionButtons from './MatchActionButtons';
import MatchStatistics from './MatchStatistics';

interface MatchCardContentProps {
  id: number;
  time: string;
  league?: any;
  isSelectable?: boolean;
}

const MatchCardContent: React.FC<MatchCardContentProps> = ({ 
  id, 
  time,
  league,
  isSelectable = false 
}) => {
  const { 
    homeTeam,
    awayTeam,
    selectedPrediction,
    isStatsExpanded,
    toggleStatsExpanded,
    headToHead,
    setSelectedPrediction,
    isSubmitting,
    handlePredictMatch
  } = useMatchContext();

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black backdrop-blur-sm p-6 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 border border-white/5 hover:border-white/10 animate-fade-in card-hover card-active"
      aria-label="Match prediction card"
    >
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
              <PredictionControls 
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
            <TeamSelector position="home" />
          </div>
          
          {/* Middle Spacer */}
          <div className="col-span-1"></div>
          
          {/* Away Team Selector */}
          <div className="col-span-2 relative">
            <TeamSelector position="away" />
          </div>
        </div>

        {/* Prediction Options */}
        {homeTeam && awayTeam && (
          <PredictionControls 
            selectedPrediction={selectedPrediction}
            setSelectedPrediction={setSelectedPrediction}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            minimal={false}
          />
        )}

        {/* Match Statistics */}
        {homeTeam && awayTeam && (
          <MatchStatistics
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            headToHead={headToHead}
            isExpanded={isStatsExpanded}
            toggleExpanded={toggleStatsExpanded}
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

export default MatchCardContent;
