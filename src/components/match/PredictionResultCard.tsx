
import React, { useEffect, useState } from 'react';
import { Team } from '../../data/premier-league-teams';
import PredictionHeader from './PredictionHeader';
import TeamsDisplay from './prediction-card/TeamsDisplay';
import PredictionStats from './prediction-card/PredictionStats';
import PredictionButtons from './prediction-card/PredictionButtons';
import { usePrediction } from '../../hooks/usePrediction';

interface PredictionResultCardProps {
  match: { 
    home: Team | null; 
    away: Team | null;
    status?: 'upcoming' | 'live' | 'completed';
    time?: string;
  };
}

const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ match }) => {
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);
  
  if (!match.home || !match.away) return null;
  
  const isLive = match.status === 'live';
  
  const { prediction, teamAnalysis, isPredicting, generatePrediction } = usePrediction({
    homeTeam: match.home,
    awayTeam: match.away
  });

  // Automatically generate prediction when card mounts
  useEffect(() => {
    generatePrediction();
  }, []);
  
  return (
    <div className="max-w-[500px] mx-auto my-6">
      <div className="w-full rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <div className="h-full w-full p-8 flex flex-col">
          {/* Header */}
          <PredictionHeader isLive={isLive} matchTime={match.time || "21:00"} />
          
          {/* Teams */}
          <TeamsDisplay homeTeam={match.home} awayTeam={match.away} />
          
          {/* Loading indicator when prediction is being generated */}
          {isPredicting ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-sm text-gray-300">Predikció készítése...</span>
            </div>
          ) : (
            <>
              {/* Prediction Stats */}
              <PredictionStats match={{ home: match.home, away: match.away }} />
              
              {/* Prediction Buttons */}
              <PredictionButtons 
                onShowAdvancedStats={() => setShowAdvancedStats(prev => !prev)}
                showAdvancedStats={showAdvancedStats}
              />
            </>
          )}
          
          {/* Winner declaration if we have a prediction */}
          {prediction && !isPredicting && (
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <div className="text-xs text-gray-400 mb-2">Várható eredmény</div>
              <div className="text-lg font-bold">
                {prediction.predictedWinner === 'home' && (
                  <span className="text-blue-400">{match.home.name} győzelem</span>
                )}
                {prediction.predictedWinner === 'away' && (
                  <span className="text-red-400">{match.away.name} győzelem</span>
                )}
                {prediction.predictedWinner === 'draw' && (
                  <span className="text-amber-400">Döntetlen</span>
                )}
                {prediction.predictedWinner === 'unknown' && (
                  <span className="text-gray-400">Nem meghatározható</span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {prediction.modelPredictions.poisson.homeGoals} - {prediction.modelPredictions.poisson.awayGoals} (Poisson eloszlás szerint)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionResultCard;
