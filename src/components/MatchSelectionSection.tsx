
import React, { useState } from 'react';
import { Calendar, ChevronDown, ArrowRight, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { teams } from '../data/teams';

const MatchSelectionSection = () => {
  // State for selected teams in each match card
  const [selectedTeams, setSelectedTeams] = useState([
    { home: teams[12], away: teams[8] }, // Default to London Ágyúk vs Manchester Kék for first card
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
    { home: null, away: null },
  ]);
  
  // State for selected filter in prediction results section
  const [resultFilter, setResultFilter] = useState("all");
  
  // Update team selection
  const handleTeamSelect = (matchIndex: number, side: 'home' | 'away', teamId: string) => {
    const team = teams.find(t => t.id.toString() === teamId) || null;
    
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
                  value={match.home?.id?.toString() || ""} 
                  onValueChange={(value) => handleTeamSelect(index, 'home', value)}
                >
                  <SelectTrigger className="w-full bg-black/60 border-white/10 text-white">
                    <SelectValue placeholder="Válassz hazai csapatot" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white border-white/10 max-h-[300px]">
                    {teams.map(team => (
                      <SelectItem key={team.id.toString()} value={team.id.toString()}>
                        <div className="flex items-center gap-2">
                          {team.logo && (
                            <img 
                              src={team.logo} 
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
                  value={match.away?.id?.toString() || ""} 
                  onValueChange={(value) => handleTeamSelect(index, 'away', value)}
                >
                  <SelectTrigger className="w-full bg-black/60 border-white/10 text-white">
                    <SelectValue placeholder="Válassz vendég csapatot" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white border-white/10 max-h-[300px]">
                    {teams.map(team => (
                      <SelectItem key={team.id.toString()} value={team.id.toString()}>
                        <div className="flex items-center gap-2">
                          {team.logo && (
                            <img 
                              src={team.logo} 
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
                      src={match.home.logo} 
                      alt={`${match.home.name} logo`} 
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-xs text-gray-300 mt-1 text-center">{match.home.name}</span>
                  </div>
                  <span className="text-gray-400 font-bold">VS</span>
                  <div className="flex flex-col items-center">
                    <img 
                      src={match.away.logo} 
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
        
        {/* Prediction Button */}
        <div className="flex justify-center my-8 animate-fade-in" style={{animationDelay: "0.5s"}}>
          <Button 
            onClick={handleSubmitPredictions}
            className="w-full max-w-xl py-6 text-lg font-medium bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-lg flex items-center justify-center gap-2"
          >
            Predikciók futtatása
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Predictions Results Section */}
        {selectedTeams.some(match => match.home && match.away) && (
          <div className="mt-16 animate-fade-in" style={{animationDelay: "0.7s"}}>
            <h3 className="text-2xl font-bold text-white mb-6">Predikciók eredménye</h3>
            
            {/* Filter */}
            <div className="mb-6 flex items-center gap-3">
              <span className="text-gray-400 text-sm">Rendezés:</span>
              <Select value={resultFilter} onValueChange={setResultFilter}>
                <SelectTrigger className="w-64 bg-black/60 border-white/10 text-white">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white border-white/10">
                  <SelectItem value="all">Mindkét csapat gólját</SelectItem>
                  <SelectItem value="home">Hazai csapat góljai</SelectItem>
                  <SelectItem value="away">Vendég csapat góljai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Results Card for the first match */}
            {selectedTeams[0].home && selectedTeams[0].away && (
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-white">
                      {selectedTeams[0].home.name} - {selectedTeams[0].away.name}
                    </span>
                    <Button variant="ghost" size="sm" className="p-1 h-auto text-yellow-400">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-400">Premier League Head-to-Head</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Team Logos */}
                  <div className="flex justify-between items-center col-span-1 lg:col-span-3 mb-2">
                    <div className="flex flex-col items-center">
                      <img 
                        src={selectedTeams[0].home.logo} 
                        alt={selectedTeams[0].home.name}
                        className="w-16 h-16 object-contain" 
                      />
                      <span className="mt-2 text-sm text-gray-300">{selectedTeams[0].home.name}</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">42</div>
                      <div className="text-sm text-gray-400">Matches</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <img 
                        src={selectedTeams[0].away.logo} 
                        alt={selectedTeams[0].away.name}
                        className="w-16 h-16 object-contain" 
                      />
                      <span className="mt-2 text-sm text-gray-300">{selectedTeams[0].away.name}</span>
                    </div>
                  </div>
                  
                  {/* Stats Grid */}
                  <div className="bg-black/60 rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white">18</div>
                    <div className="text-xs text-gray-400">Home Wins</div>
                    <div className="text-sm font-bold text-yellow-400">42.9%</div>
                  </div>
                  
                  <div className="bg-black/60 rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-gray-400">Draws</div>
                    <div className="text-sm font-bold text-yellow-400">28.6%</div>
                  </div>
                  
                  <div className="bg-black/60 rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-gray-400">Away Wins</div>
                    <div className="text-sm font-bold text-yellow-400">28.6%</div>
                  </div>
                  
                  {/* More Stats */}
                  <div className="bg-black/60 rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="text-xs text-gray-400">Home</div>
                    <div className="text-lg font-bold text-white">1.74</div>
                  </div>
                  
                  <div className="bg-black/60 rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="text-xs text-gray-400">Avg. Goals</div>
                    <div className="text-lg font-bold text-yellow-400">3.12</div>
                  </div>
                  
                  <div className="bg-black/60 rounded-lg p-4 flex flex-col items-center justify-center">
                    <div className="text-xs text-gray-400">Away</div>
                    <div className="text-lg font-bold text-white">1.38</div>
                  </div>
                  
                  {/* Progress Bar for Both Teams Scored */}
                  <div className="col-span-1 lg:col-span-3 mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Both Teams Scored</span>
                      <span className="text-xs text-yellow-400">57.14%</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full" style={{ width: "57%" }}></div>
                    </div>
                  </div>
                  
                  {/* Form Indexes */}
                  <div className="col-span-1 lg:col-span-3 grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Home Form Index</div>
                      <div className="text-lg font-bold text-yellow-400">40%</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Away Form Index</div>
                      <div className="text-lg font-bold text-yellow-400">40%</div>
                    </div>
                  </div>
                  
                  {/* Prediction Score */}
                  <div className="col-span-1 lg:col-span-3 text-center mt-4">
                    <div className="text-sm text-gray-400 mb-1">Prediction Score:</div>
                    <div className="text-2xl font-bold text-yellow-400">6.00</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchSelectionSection;
