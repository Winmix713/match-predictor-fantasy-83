
import React, { useState } from 'react';
import { Team } from '../../data/premier-league-teams';
import { ChevronDown, ChevronUp, Percent } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface PredictionResultCardProps {
  match: { home: Team | null; away: Team | null };
}

const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ match }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!match.home || !match.away) return null;
  
  // Generate some random stats for the teams
  const homeWinPercent = Math.round(Math.random() * 50) + 20;
  const drawPercent = Math.round(Math.random() * 30);
  const awayWinPercent = 100 - homeWinPercent - drawPercent;
  
  // Additional stats for the expanded view
  const homeGoalChance = Math.round(Math.random() * 40) + 40;
  const awayGoalChance = Math.round(Math.random() * 40) + 30;
  const bothTeamsScoreChance = Math.round(Math.random() * 50) + 30;
  const overUnderLine = 2.5;
  const overChance = Math.round(Math.random() * 50) + 25;
  const underChance = 100 - overChance;
  
  const toggleExpanded = () => setExpanded(!expanded);
  
  return (
    <div className="max-w-[500px] mx-auto my-6">
      <div className="w-full rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
        <div className="h-full w-full p-8 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="bg-blue-500/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-blue-400/20">
              <span className="text-xs font-medium text-blue-300">Élő mérkőzés</span>
            </div>
            <Badge variant="outline" className="text-xs font-medium text-blue-400 bg-blue-500/10 border-blue-400/10">
              21:00
            </Badge>
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
              <span className="text-xs text-blue-400 mt-1">Hazai</span>
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
              <div className="mt-6 space-y-4 animate-fade-in" style={{animationDuration: '0.3s'}}>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h4 className="text-xs font-medium text-gray-400 mb-3 flex items-center gap-1">
                    <Percent className="h-3 w-3" />
                    <span>További statisztikák</span>
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">Mindkét csapat gólt szerez</span>
                        <span className="text-blue-400">{bothTeamsScoreChance}%</span>
                      </div>
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{width: `${bothTeamsScoreChance}%`}}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">{match.home.name} gólt szerez</span>
                          <span className="text-blue-400">{homeGoalChance}%</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: `${homeGoalChance}%`}}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">{match.away.name} gólt szerez</span>
                          <span className="text-blue-400">{awayGoalChance}%</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: `${awayGoalChance}%`}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">Több mint {overUnderLine} gól</span>
                          <span className="text-blue-400">{overChance}%</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{width: `${overChance}%`}}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">Kevesebb mint {overUnderLine} gól</span>
                          <span className="text-blue-400">{underChance}%</span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{width: `${underChance}%`}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Prediction Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)] flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Hazai</span>
              </button>
              <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)] flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                <span>Döntetlen</span>
              </button>
              <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)] flex items-center justify-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Vendég</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultCard;
