
import React from 'react';
import { Star } from 'lucide-react';
import { Team } from '../../data/premier-league-teams';

interface PredictionResultCardProps {
  match: { home: Team | null; away: Team | null };
}

const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ match }) => {
  if (!match.home || !match.away) return null;
  
  // Generate some random stats for the teams
  const totalMatches = Math.floor(Math.random() * 50) + 20;
  const homeWins = Math.floor(Math.random() * totalMatches * 0.6);
  const awayWins = Math.floor(Math.random() * totalMatches * 0.4);
  const draws = totalMatches - homeWins - awayWins;
  
  const homeWinPercent = Math.round((homeWins / totalMatches) * 100);
  const drawPercent = Math.round((draws / totalMatches) * 100);
  const awayWinPercent = Math.round((awayWins / totalMatches) * 100);
  
  const homeGoals = (Math.random() * 2 + 0.5).toFixed(2);
  const awayGoals = (Math.random() * 2 + 0.3).toFixed(2);
  const avgGoals = (Number(homeGoals) + Number(awayGoals) / 2).toFixed(2);
  
  const bothTeamsScored = Math.round(Math.random() * 100);
  
  const homeFormIndex = Math.round(Math.random() * 100);
  const awayFormIndex = Math.round(Math.random() * 100);
  
  const predictionScore = (Math.random() * 10).toFixed(2);

  return (
    <div className="max-w-[500px] mx-auto my-6">
      <div className="w-full rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <div className="h-full w-full p-8 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h3 className="text-white font-bold">Premier League Head-to-Head</h3>
              <Star className="ml-2 w-5 h-5 text-white" />
            </div>
          </div>
          
          {/* Teams */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col items-center">
              <img 
                src={match.home.logoUrl} 
                alt={match.home.name} 
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm text-white mt-2">{match.home.name}</span>
            </div>
            
            <div className="text-center">
              <div className="text-green-400 font-bold text-xl">{totalMatches}</div>
              <div className="text-xs text-gray-400">Matches</div>
            </div>
            
            <div className="flex flex-col items-center">
              <img 
                src={match.away.logoUrl} 
                alt={match.away.name} 
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm text-white mt-2">{match.away.name}</span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="text-center">
              <div className="text-white font-bold">{homeWins}</div>
              <div className="text-xs text-gray-400">Home Wins</div>
              <div className="text-xs text-blue-400">{homeWinPercent}%</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">{draws}</div>
              <div className="text-xs text-gray-400">Draws</div>
              <div className="text-xs text-blue-400">{drawPercent}%</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">{awayWins}</div>
              <div className="text-xs text-gray-400">Away Wins</div>
              <div className="text-xs text-blue-400">{awayWinPercent}%</div>
            </div>
          </div>
          
          {/* Goals */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="text-center">
              <div className="text-white font-bold">Home</div>
              <div className="text-xs text-blue-400">{homeGoals}</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">Avg. Goals</div>
              <div className="text-xs text-green-400">{avgGoals}</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold">Away</div>
              <div className="text-xs text-blue-400">{awayGoals}</div>
            </div>
          </div>
          
          {/* Both Teams Scored */}
          <div className="mb-6">
            <div className="text-xs text-white mb-1">Both Teams Scored</div>
            <div className="flex gap-1 items-center">
              <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{width: `${bothTeamsScored}%`}}></div>
              </div>
              <span className="text-xs text-green-400 min-w-[35px] text-right">{bothTeamsScored}%</span>
            </div>
          </div>
          
          {/* Form Index */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-xs text-white mb-1">Home Form Index</div>
              <div className="flex items-center justify-center">
                <span className="text-green-400 font-bold">{homeFormIndex}%</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-white mb-1 text-right">Away Form Index</div>
              <div className="flex items-center justify-center">
                <span className="text-green-400 font-bold">{awayFormIndex}%</span>
              </div>
            </div>
          </div>
          
          {/* Prediction Score */}
          <div className="text-center mt-4">
            <div className="text-xs text-gray-400 mb-1">Prediction Score:</div>
            <div className="text-green-400 font-bold text-xl">{predictionScore}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultCard;
