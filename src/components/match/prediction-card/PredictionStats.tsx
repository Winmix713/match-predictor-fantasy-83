
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Team } from '../../../data/premier-league-teams';
import StatsSection from './StatsSection';
import AdvancedPredictionStats from './AdvancedPredictionStats';
import { usePrediction } from '../../../hooks/usePrediction';

interface PredictionStatsProps {
  match: { home: Team; away: Team };
}

const PredictionStats: React.FC<PredictionStatsProps> = ({ match }) => {
  const [expanded, setExpanded] = useState(false);

  const { prediction, teamAnalysis, isPredicting } = usePrediction({
    homeTeam: match.home,
    awayTeam: match.away
  });
  
  // If we have prediction data, use it, otherwise generate some random placeholder stats
  const homeWinPercent = prediction ? 
    Math.round(prediction.modelPredictions.elo.homeWinProb * 100) :
    Math.round(Math.random() * 50) + 20;
    
  const drawPercent = prediction ? 
    Math.round(prediction.modelPredictions.elo.drawProb * 100) :
    Math.round(Math.random() * 30);
    
  const awayWinPercent = prediction ? 
    Math.round(prediction.modelPredictions.elo.awayWinProb * 100) :
    100 - homeWinPercent - drawPercent;
  
  // Additional stats for the expanded view
  const homeGoalChance = prediction ? 
    Math.min(100, Math.round(prediction.homeExpectedGoals * 25)) :
    Math.round(Math.random() * 40) + 40;
    
  const awayGoalChance = prediction ? 
    Math.min(100, Math.round(prediction.awayExpectedGoals * 25)) :
    Math.round(Math.random() * 40) + 30;
    
  const bothTeamsScoreChance = prediction ? 
    Math.round(prediction.bothTeamsToScoreProb) :
    Math.round(Math.random() * 50) + 30;
    
  const overUnderLine = 2.5;
  const overChance = prediction ? 
    Math.round(((prediction.homeExpectedGoals + prediction.awayExpectedGoals) > overUnderLine ? 70 : 40) + (Math.random() * 20 - 10)) :
    Math.round(Math.random() * 50) + 25;
    
  const underChance = 100 - overChance;
  
  const toggleExpanded = () => setExpanded(!expanded);
  
  return (
    <div className="mt-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400 mb-2">Tipp esélyek</div>
          <button 
            onClick={toggleExpanded}
            className="text-xs text-gray-400 flex items-center gap-1 hover:text-blue-400 transition-colors"
          >
            {expanded ? (
              <>
                <span>Kevesebb</span>
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                <span>Részletek</span>
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
        
        <div className="flex gap-1 items-center">
          <span className="text-xs text-white min-w-[60px]">{match.home.name}</span>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{width: `${homeWinPercent}%`}}></div>
          </div>
          <span className="text-xs text-blue-400 min-w-[30px] text-right">{homeWinPercent}%</span>
        </div>
        
        <div className="flex gap-1 items-center mt-1.5">
          <span className="text-xs text-white min-w-[60px]">Döntetlen</span>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gray-500 rounded-full" style={{width: `${drawPercent}%`}}></div>
          </div>
          <span className="text-xs text-gray-400 min-w-[30px] text-right">{drawPercent}%</span>
        </div>
        
        <div className="flex gap-1 items-center mt-1.5">
          <span className="text-xs text-white min-w-[60px]">{match.away.name}</span>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{width: `${awayWinPercent}%`}}></div>
          </div>
          <span className="text-xs text-blue-400 min-w-[30px] text-right">{awayWinPercent}%</span>
        </div>
      </div>
      
      {/* Expanded Stats */}
      {expanded && (
        <>
          <StatsSection 
            homeTeam={match.home}
            awayTeam={match.away}
            bothTeamsScoreChance={bothTeamsScoreChance}
            homeGoalChance={homeGoalChance}
            awayGoalChance={awayGoalChance}
            overUnderLine={overUnderLine}
            overChance={overChance}
            underChance={underChance}
          />
          
          {prediction && (
            <div className="mt-4">
              <AdvancedPredictionStats
                prediction={prediction}
                teamAnalysis={teamAnalysis || undefined}
                homeTeam={match.home}
                awayTeam={match.away}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PredictionStats;
