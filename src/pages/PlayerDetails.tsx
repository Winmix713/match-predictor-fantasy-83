
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Flag, Ruler, Weight, Shirt, UserCircle2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import LoadingOrRefreshIcon from "@/components/ui/LoadingOrRefreshIcon";

// Import placeholder data (will be replaced with API calls)
import { PREMIER_LEAGUE_TEAMS } from '../data/premier-league-teams';

// Placeholder player data (would come from API)
const mockPlayer = {
  id: 1,
  name: "John Smith",
  position: "Forward",
  teamId: 10,
  teamName: "Manchester Kék",
  nationality: "England",
  age: 27,
  height: 185,
  weight: 78,
  jerseyNumber: 9,
  preferredFoot: "right" as const,
  image: "https://placehold.co/200x200",
};

// Placeholder stats data
const mockPlayerStats = {
  appearances: 32,
  minutesPlayed: 2678,
  goals: 18,
  assists: 7,
  yellowCards: 4,
  redCards: 0,
  shotsTotal: 86,
  shotsOnTarget: 42,
  passAccuracy: 78.5,
  tackles: 24,
  interceptions: 15,
};

// Placeholder form data
const mockFormData = [
  { matchId: 101, opponent: "Liverpool", date: "2025-04-20", rating: 8.2, goals: 2, assists: 1, result: "W" as const },
  { matchId: 102, opponent: "London Ágyúk", date: "2025-04-13", rating: 6.7, goals: 0, assists: 1, result: "D" as const },
  { matchId: 103, opponent: "Vörös Ördögök", date: "2025-04-06", rating: 7.5, goals: 1, assists: 0, result: "W" as const },
  { matchId: 104, opponent: "Chelsea", date: "2025-03-30", rating: 5.8, goals: 0, assists: 0, result: "L" as const },
  { matchId: 105, opponent: "Tottenham", date: "2025-03-23", rating: 7.9, goals: 1, assists: 2, result: "W" as const },
];

const PlayerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const player = mockPlayer; // In reality, this would come from an API call using the id parameter
  const playerStats = mockPlayerStats;
  const formData = mockFormData;
  
  // Find team logo from our existing data
  const team = PREMIER_LEAGUE_TEAMS.find(t => t.name === player.teamName) || { logo: "" };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const getResultColor = (result: 'W' | 'D' | 'L') => {
    switch (result) {
      case 'W': return 'bg-green-500/20 text-green-400';
      case 'D': return 'bg-amber-500/20 text-amber-400';
      case 'L': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8.0) return 'text-green-400';
    if (rating >= 7.0) return 'text-lime-400';
    if (rating >= 6.0) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-gray-800/60 border-white/10"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-gray-800/60 border-white/10"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <LoadingOrRefreshIcon isRefreshing={isLoading} />
            <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>

        {/* Player Header Card */}
        <Card className="bg-gray-800/60 border border-white/10 shadow-lg mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="bg-gradient-to-br from-gray-700/50 to-gray-900/50 p-6 md:w-1/3 flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden mb-4 border-2 border-white/10">
                {player.image ? (
                  <img src={player.image} alt={player.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserCircle2 className="w-16 h-16 text-gray-500" />
                  </div>
                )}
              </div>
              <h1 className="text-2xl font-bold text-white text-center">{player.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                  {player.position}
                </span>
                <span className="bg-gray-500/20 text-gray-300 text-xs px-2 py-1 rounded-full">
                  #{player.jerseyNumber}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src={team.logo} 
                  alt={player.teamName} 
                  className="w-5 h-5 object-contain"
                />
                <span className="text-gray-300">{player.teamName}</span>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3">
              <h2 className="text-lg font-semibold text-white mb-4">Player Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Age</p>
                    <p className="text-sm text-white">{player.age} years</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Flag className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Nationality</p>
                    <p className="text-sm text-white">{player.nationality}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Height</p>
                    <p className="text-sm text-white">{player.height} cm</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Weight className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Weight</p>
                    <p className="text-sm text-white">{player.weight} kg</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shirt className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Jersey Number</p>
                    <p className="text-sm text-white">#{player.jerseyNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 text-gray-400 flex items-center justify-center">👣</span>
                  <div>
                    <p className="text-xs text-gray-400">Preferred Foot</p>
                    <p className="text-sm text-white capitalize">{player.preferredFoot}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 bg-gray-800/60 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Overview
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="form" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Form
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800/60 border border-white/10 col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Season Performance</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-700/40 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-white">{playerStats.goals}</p>
                      <p className="text-xs text-gray-400">Goals</p>
                    </div>
                    <div className="bg-gray-700/40 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-white">{playerStats.assists}</p>
                      <p className="text-xs text-gray-400">Assists</p>
                    </div>
                    <div className="bg-gray-700/40 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-white">{playerStats.appearances}</p>
                      <p className="text-xs text-gray-400">Apps</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm text-white font-medium mb-3">Shooting Accuracy</h4>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(playerStats.shotsOnTarget / playerStats.shotsTotal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-400">On Target: {playerStats.shotsOnTarget}</p>
                      <p className="text-xs text-gray-400">Total: {playerStats.shotsTotal}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm text-white font-medium mb-3">Pass Accuracy</h4>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${playerStats.passAccuracy}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-400">Accuracy: {playerStats.passAccuracy}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Form</h3>
                  
                  <div className="space-y-4">
                    {formData.slice(0, 3).map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-sm text-white">vs {match.opponent}</p>
                          <p className="text-xs text-gray-400">{match.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Rating</p>
                            <p className={`text-sm font-semibold ${getRatingColor(match.rating)}`}>
                              {match.rating}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">G/A</p>
                            <p className="text-sm text-white">{match.goals}/{match.assists}</p>
                          </div>
                          <div className={`w-8 h-8 rounded-full ${getResultColor(match.result)} flex items-center justify-center`}>
                            {match.result}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-white/10 hover:bg-gray-700/50"
                    onClick={() => setActiveTab("form")}
                  >
                    View All Matches
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Detailed Statistics</h3>
                <p className="text-gray-400">Detailed player statistics will appear here.</p>
                {/* We'll implement detailed statistics in the next phase */}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Tab */}
          <TabsContent value="form">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Form</h3>
                
                <div className="space-y-3">
                  {formData.map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <div>
                        <p className="text-sm text-white">vs {match.opponent}</p>
                        <p className="text-xs text-gray-400">{match.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Rating</p>
                          <p className={`text-sm font-semibold ${getRatingColor(match.rating)}`}>
                            {match.rating}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Goals</p>
                          <p className="text-sm text-white">{match.goals}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Assists</p>
                          <p className="text-sm text-white">{match.assists}</p>
                        </div>
                        <div className={`w-8 h-8 rounded-full ${getResultColor(match.result)} flex items-center justify-center`}>
                          {match.result}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Career History</h3>
                <p className="text-gray-400">Player career history will appear here.</p>
                {/* We'll implement career history in the next phase */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayerDetails;
