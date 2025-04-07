
import React from 'react';
import { Team } from '../../data/premier-league-teams';

interface PredictionResultCardProps {
  match: { home: Team | null; away: Team | null };
}

const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ match }) => {
  if (!match.home || !match.away) return null;
  
  // Generate some random stats for the teams
  const homeWinPercent = Math.round(Math.random() * 50) + 20;
  const drawPercent = Math.round(Math.random() * 30);
  const awayWinPercent = 100 - homeWinPercent - drawPercent;
  
  return (
    <div className="max-w-[500px] mx-auto my-6">
      <div className="w-full rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <div className="h-full w-full p-8 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="bg-blue-500/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-blue-400/20">
              <span className="text-xs font-medium text-blue-300">Élő mérkőzés</span>
            </div>
            <div className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-blue-400/10">21:00</div>
          </div>
          
          {/* Teams */}
          <div className="flex items-center justify-between mt-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <img 
                  src={match.home.logoUrl} 
                  alt={match.home.name} 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-sm font-medium text-white">{match.home.name}</span>
              <span className="text-xs text-blue-400 mt-1">Otthon</span>
            </div>
            
            <div className="flex flex-col items-center mx-4">
              <div className="text-lg font-bold mb-1 text-gray-400">VS</div>
              <div className="text-xs text-blue-400 py-1 px-3 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-400/10 animate-pulse-subtle">Élő</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <img 
                  src={match.away.logoUrl} 
                  alt={match.away.name} 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <span className="text-sm font-medium text-white">{match.away.name}</span>
              <span className="text-xs text-blue-400 mt-1">Vendég</span>
            </div>
          </div>
          
          {/* Prediction Stats */}
          <div className="mt-auto">
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2">Tipp esélyek</div>
              
              <div className="flex gap-1 items-center">
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{width: `${homeWinPercent}%`}}></div>
                </div>
                <span className="text-xs text-blue-400 min-w-[30px] text-right">{homeWinPercent}%</span>
              </div>
              
              <div className="flex gap-1 items-center mt-1.5">
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-500 rounded-full" style={{width: `${drawPercent}%`}}></div>
                </div>
                <span className="text-xs text-gray-400 min-w-[30px] text-right">{drawPercent}%</span>
              </div>
              
              <div className="flex gap-1 items-center mt-1.5">
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{width: `${awayWinPercent}%`}}></div>
                </div>
                <span className="text-xs text-blue-400 min-w-[30px] text-right">{awayWinPercent}%</span>
              </div>
            </div>
            
            {/* Prediction Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                Hazai
              </button>
              <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                Döntetlen
              </button>
              <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                Vendég
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultCard;
