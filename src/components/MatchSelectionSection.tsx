
import React, { useState } from 'react';
import { Calendar, ChevronDown, ArrowRight, Star, Trophy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { PREMIER_LEAGUE_TEAMS } from '../data/premier-league-teams';

const MatchSelectionSection = () => {
  // State for selected teams in each match card
  const [selectedTeams, setSelectedTeams] = useState([
    { home: PREMIER_LEAGUE_TEAMS.find(t => t.id === "arsenal"), away: PREMIER_LEAGUE_TEAMS.find(t => t.id === "chelsea") }, // Default to London Ágyúk vs Chelsea for first card
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
  ]);
  
  // State for selected filter in prediction results section
  const [resultFilter, setResultFilter] = useState("all");
  
  // State to track if prediction has been run
  const [predictionRun, setPredictionRun] = useState(false);
  
  // Update team selection
  const handleTeamSelect = (matchIndex: number, side: 'home' | 'away', teamId: string) => {
    const team = PREMIER_LEAGUE_TEAMS.find(t => t.id === teamId) || null;
    
    setSelectedTeams(prev => {
      const updated = [...prev];
      updated[matchIndex] = {
        ...updated[matchIndex],
        [side]: team
      };
      return updated;
    });
  };
  
  // Handle prediction submission
  const handleSubmitPredictions = () => {
    // Count how many complete matches we have
    const completeMatches = selectedTeams.filter(match => match.home && match.away).length;
    
    if (completeMatches === 0) {
      toast.error("Legalább egy mérkőzést ki kell választanod");
      return;
    }
    
    toast.success(`${completeMatches} mérkőzés predikciója elindítva`, {
      description: "Az eredmények hamarosan elérhetőek lesznek"
    });
    
    setPredictionRun(true);
  };

  return (
    <div className="py-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_60%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2.5 mb-3 bg-gradient-to-r from-blue-500/10 to-transparent px-4 py-2 rounded-full">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Mérkőzések kiválasztása
              </h2>
            </div>
          </div>
        </div>
        
        {/* Match Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {selectedTeams.map((match, index) => (
            <div key={index} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-5 animate-fade-in" style={{animationDelay: `${0.1 * index}s`}}>
              {/* Home Team Select */}
              <div className="mb-3">
                <Select 
                  value={match.home?.id || ""} 
                  onValueChange={(value) => handleTeamSelect(index, 'home', value)}
                >
                  <SelectTrigger className="w-full bg-black/60 border-white/10 text-white">
                    <SelectValue placeholder="Válassz hazai csapatot" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white border-white/10 max-h-[300px]">
                    {PREMIER_LEAGUE_TEAMS.map(team => (
                      <SelectItem key={team.id} value={team.id}>
                        <div className="flex items-center gap-2">
                          {team.logoUrl && (
                            <img 
                              src={team.logoUrl} 
                              alt={`${team.name} logo`} 
                              className="w-6 h-6 object-contain"
                            />
                          )}
                          <span>{team.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Away Team Select */}
              <div className="mb-3">
                <Select 
                  value={match.away?.id || ""} 
                  onValueChange={(value) => handleTeamSelect(index, 'away', value)}
                >
                  <SelectTrigger className="w-full bg-black/60 border-white/10 text-white">
                    <SelectValue placeholder="Válassz vendég csapatot" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white border-white/10 max-h-[300px]">
                    {PREMIER_LEAGUE_TEAMS.map(team => (
                      <SelectItem key={team.id} value={team.id}>
                        <div className="flex items-center gap-2">
                          {team.logoUrl && (
                            <img 
                              src={team.logoUrl} 
                              alt={`${team.name} logo`} 
                              className="w-6 h-6 object-contain"
                            />
                          )}
                          <span>{team.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Team logos preview */}
              {match.home && match.away && (
                <div className="flex items-center justify-center gap-4 mt-4 mb-2">
                  <div className="flex flex-col items-center">
                    <img 
                      src={match.home.logoUrl} 
                      alt={`${match.home.name} logo`} 
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-xs text-gray-300 mt-1 text-center">{match.home.name}</span>
                  </div>
                  <span className="text-gray-400 font-bold">VS</span>
                  <div className="flex flex-col items-center">
                    <img 
                      src={match.away.logoUrl} 
                      alt={`${match.away.name} logo`} 
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-xs text-gray-300 mt-1 text-center">{match.away.name}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Prediction Button - Using the same styling as the "Kezdj el tippelni most" button in Hero */}
        <div className="flex justify-center my-8 animate-fade-in" style={{animationDelay: "0.5s"}}>
          <Button 
            onClick={handleSubmitPredictions}
            className="w-full max-w-xl py-6 text-lg font-medium bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 overflow-hidden relative group"
          >
            <span className="z-10 relative">Predikciók futtatása</span>
            <ArrowRight className="w-5 h-5 z-10 relative group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
          </Button>
        </div>
        
        {/* Predictions Results Section - Styled like the Hero card */}
        {predictionRun && selectedTeams[0].home && selectedTeams[0].away && (
          <div className="mt-16 animate-fade-in" style={{animationDelay: "0.7s"}}>
            <h3 className="text-2xl font-bold text-white mb-6">Predikciók eredménye</h3>
            
            {/* Updated Match Card to match provided design */}
            <div className="max-w-[500px] mx-auto">
              <div className="w-full rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                <div className="h-full w-full p-8 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-blue-500/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-blue-400/20">
                      <span className="text-xs font-medium text-blue-300">Élő mérkőzés</span>
                    </div>
                    <div className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-blue-400/10">21:00</div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col items-center">
                      <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <img 
                          src={selectedTeams[0].home.logoUrl} 
                          alt={selectedTeams[0].home.name} 
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{selectedTeams[0].home.name}</span>
                      <span className="text-xs text-blue-400 mt-1">Otthon</span>
                    </div>
                    
                    <div className="flex flex-col items-center mx-4">
                      <div className="text-lg font-bold mb-1 text-gray-400">VS</div>
                      <div className="text-xs text-blue-400 py-1 px-3 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-400/10 animate-pulse-subtle">Élő</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                        <img 
                          src={selectedTeams[0].away.logoUrl} 
                          alt={selectedTeams[0].away.name} 
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{selectedTeams[0].away.name}</span>
                      <span className="text-xs text-blue-400 mt-1">Vendég</span>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <div className="text-sm text-white mb-2">Tipp esélyek</div>
                    <div className="flex gap-1 items-center mt-2">
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: '42%'}}></div>
                      </div>
                      <span className="text-xs text-blue-400 min-w-[30px] text-right">42%</span>
                    </div>
                    <div className="flex gap-1 items-center mt-1.5">
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-500 rounded-full" style={{width: '28%'}}></div>
                      </div>
                      <span className="text-xs text-gray-400 min-w-[30px] text-right">28%</span>
                    </div>
                    <div className="flex gap-1 items-center mt-1.5">
                      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: '30%'}}></div>
                      </div>
                      <span className="text-xs text-blue-400 min-w-[30px] text-right">30%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-6">
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
        )}
      </div>
    </div>
  );
};

export default MatchSelectionSection;
