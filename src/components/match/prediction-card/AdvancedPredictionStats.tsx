
import React from 'react';
import { BarChart3, PieChart } from 'lucide-react';
import { PredictionResult, TeamAnalysis } from '../../../types/prediction';
import { Team } from '../../../types/match';

interface AdvancedPredictionStatsProps {
  prediction: PredictionResult;
  teamAnalysis?: TeamAnalysis;
  homeTeam: Team;
  awayTeam: Team;
}

const AdvancedPredictionStats: React.FC<AdvancedPredictionStatsProps> = ({
  prediction,
  teamAnalysis,
  homeTeam,
  awayTeam
}) => {
  const formatPercentage = (value: number) => `${Math.round(value)}%`;

  return (
    <div className="space-y-6">
      {/* Win Probability Distribution */}
      <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <PieChart className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-semibold text-white">Győzelmi esélyek</h3>
        </div>
        
        <div className="space-y-3">
          {/* Home Win */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white">{homeTeam.name} győzelem</span>
              <span className="text-blue-400">{formatPercentage(prediction.modelPredictions.elo.homeWinProb * 100)}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${prediction.modelPredictions.elo.homeWinProb * 100}%` }}
              />
            </div>
          </div>
          
          {/* Draw */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white">Döntetlen</span>
              <span className="text-blue-400">{formatPercentage(prediction.modelPredictions.elo.drawProb * 100)}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${prediction.modelPredictions.elo.drawProb * 100}%` }}
              />
            </div>
          </div>
          
          {/* Away Win */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-white">{awayTeam.name} győzelem</span>
              <span className="text-blue-400">{formatPercentage(prediction.modelPredictions.elo.awayWinProb * 100)}</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${prediction.modelPredictions.elo.awayWinProb * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Goals Distribution */}
      <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-semibold text-white">Várható gólok</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-1/3 text-xs text-right pr-2">{homeTeam.name}</div>
            <div className="w-2/3 flex items-center gap-2">
              <div className="flex-1 h-4 bg-gray-800 rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-lg"
                  style={{ width: `${Math.min(100, prediction.homeExpectedGoals * 20)}%` }}
                />
              </div>
              <span className="text-blue-400 text-xs font-medium w-8 text-center">
                {prediction.homeExpectedGoals.toFixed(1)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-1/3 text-xs text-right pr-2">{awayTeam.name}</div>
            <div className="w-2/3 flex items-center gap-2">
              <div className="flex-1 h-4 bg-gray-800 rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-lg"
                  style={{ width: `${Math.min(100, prediction.awayExpectedGoals * 20)}%` }}
                />
              </div>
              <span className="text-red-400 text-xs font-medium w-8 text-center">
                {prediction.awayExpectedGoals.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white">Mindkét csapat gólt szerez</span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
              {formatPercentage(prediction.bothTeamsToScoreProb)}
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-white">Várható végeredmény</span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
              {prediction.modelPredictions.poisson.homeGoals} - {prediction.modelPredictions.poisson.awayGoals}
            </span>
          </div>
        </div>
      </div>
      
      {/* Model Predictions */}
      <div className="mt-4 p-4 bg-gray-900/50 rounded-xl border border-white/5">
        <h3 className="text-sm font-semibold text-white mb-3">Modell előrejelzések</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-900/50 p-2 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Random Forest</div>
            <div className="text-xs font-medium text-blue-400">
              {prediction.modelPredictions.randomForest === 'home_win' && `${homeTeam.name} győzelem`}
              {prediction.modelPredictions.randomForest === 'draw_win' && 'Döntetlen'}
              {prediction.modelPredictions.randomForest === 'away_win' && `${awayTeam.name} győzelem`}
              {prediction.modelPredictions.randomForest === 'insufficient_data' && 'Nincs elég adat'}
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-2 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">Poisson</div>
            <div className="text-xs font-medium text-blue-400">
              {prediction.modelPredictions.poisson.homeGoals} - {prediction.modelPredictions.poisson.awayGoals}
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-2 rounded-lg">
            <div className="text-xs text-gray-400 mb-1">ELO</div>
            <div className="text-xs font-medium text-blue-400">
              {prediction.modelPredictions.elo.homeWinProb > prediction.modelPredictions.elo.awayWinProb && 
                prediction.modelPredictions.elo.homeWinProb > prediction.modelPredictions.elo.drawProb && 
                `${homeTeam.name} (${formatPercentage(prediction.modelPredictions.elo.homeWinProb * 100)})`}
              {prediction.modelPredictions.elo.awayWinProb > prediction.modelPredictions.elo.homeWinProb && 
                prediction.modelPredictions.elo.awayWinProb > prediction.modelPredictions.elo.drawProb && 
                `${awayTeam.name} (${formatPercentage(prediction.modelPredictions.elo.awayWinProb * 100)})`}
              {prediction.modelPredictions.elo.drawProb >= prediction.modelPredictions.elo.homeWinProb && 
                prediction.modelPredictions.elo.drawProb >= prediction.modelPredictions.elo.awayWinProb && 
                `Döntetlen (${formatPercentage(prediction.modelPredictions.elo.drawProb * 100)})`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPredictionStats;
