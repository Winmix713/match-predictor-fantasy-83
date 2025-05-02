
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Trophy, Calendar, MapPin, Users, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import LoadingOrRefreshIcon from "@/components/ui/LoadingOrRefreshIcon";

// Import placeholder data (will be replaced with API calls)
import { PREMIER_LEAGUE_TEAMS } from '../data/premier-league-teams';

// Placeholder team data (would come from API)
const mockTeam = {
  id: 10,
  name: "Manchester Kék",
  shortName: "MCI",
  logo: "https://placehold.co/100x100",
  country: "England",
  founded: 1880,
  venueId: 123,
  venueName: "Etihad Stadium",
  venueCapacity: 55097,
  leagueId: 39,
  leagueName: "Premier League",
  coach: "Pep Guardiola",
  formation: "4-3-3",
};

// Placeholder stats data
const mockTeamStats = {
  season: "2024/2025",
  matches: 34,
  wins: 24,
  draws: 6,
  losses: 4,
  goalsFor: 78,
  goalsAgainst: 24,
  goalDifference: 54,
  cleanSheets: 16,
  yellowCards: 42,
  redCards: 2,
  avgPossession: 65.4,
  avgShotsTotal: 16.8,
  avgShotsOnTarget: 7.2,
  avgPassesTotal: 642,
  avgPassAccuracy: 91.2,
};

// Placeholder squad data
const mockSquad = [
  { id: 1, number: 31, name: "Ederson", position: "Goalkeeper", nationality: "Brazil", age: 30 },
  { id: 2, number: 2, name: "Kyle Walker", position: "Defender", nationality: "England", age: 33 },
  { id: 3, number: 3, name: "Ruben Dias", position: "Defender", nationality: "Portugal", age: 27 },
  { id: 4, number: 14, name: "Aymeric Laporte", position: "Defender", nationality: "Spain", age: 30 },
  { id: 5, number: 27, name: "Joao Cancelo", position: "Defender", nationality: "Portugal", age: 30 },
  { id: 6, number: 16, name: "Rodri", position: "Midfielder", nationality: "Spain", age: 28 },
  { id: 7, number: 8, name: "Ilkay Gundogan", position: "Midfielder", nationality: "Germany", age: 33 },
  { id: 8, number: 17, name: "Kevin De Bruyne", position: "Midfielder", nationality: "Belgium", age: 33 },
  { id: 9, number: 47, name: "Phil Foden", position: "Midfielder", nationality: "England", age: 24 },
  { id: 10, number: 9, name: "Erling Haaland", position: "Forward", nationality: "Norway", age: 24 },
  { id: 11, number: 10, name: "Jack Grealish", position: "Forward", nationality: "England", age: 29 },
];

// Placeholder recent matches data
const mockRecentMatches = [
  { id: 101, opponent: "Liverpool", date: "2025-04-20", isHome: true, result: "W", score: "3-1" },
  { id: 102, opponent: "London Ágyúk", date: "2025-04-13", isHome: false, result: "W", score: "2-1" },
  { id: 103, opponent: "Vörös Ördögök", date: "2025-04-06", isHome: true, result: "D", score: "1-1" },
  { id: 104, opponent: "Chelsea", date: "2025-03-30", isHome: false, result: "W", score: "2-0" },
  { id: 105, opponent: "Tottenham", date: "2025-03-23", isHome: false, result: "L", score: "0-1" },
];

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const team = mockTeam; // In reality, this would come from an API call using the id parameter
  const teamStats = mockTeamStats;
  const squad = mockSquad;
  const recentMatches = mockRecentMatches;
  
  // Find team logo from our existing data
  const premierLeagueTeam = PREMIER_LEAGUE_TEAMS.find(t => t.name === team.name);
  const teamLogo = premierLeagueTeam?.logo || team.logo;

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-green-500/20 text-green-400';
      case 'D': return 'bg-amber-500/20 text-amber-400';
      case 'L': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
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

        {/* Team Header Card */}
        <Card className="bg-gray-800/60 border border-white/10 shadow-lg mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="bg-gradient-to-br from-gray-700/50 to-gray-900/50 p-6 md:w-1/3 flex flex-col items-center justify-center">
              <div className="w-32 h-32 bg-gray-700 rounded-full overflow-hidden mb-4 flex items-center justify-center border-2 border-white/10">
                <img src={teamLogo} alt={team.name} className="w-3/4 h-3/4 object-contain" />
              </div>
              <h1 className="text-2xl font-bold text-white text-center">{team.name}</h1>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                  {team.shortName}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-300">{team.leagueName}</span>
              </div>
            </div>
            
            <div className="p-6 md:w-2/3">
              <h2 className="text-lg font-semibold text-white mb-4">Team Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Founded</p>
                    <p className="text-sm text-white">{team.founded}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Stadium</p>
                    <p className="text-sm text-white">{team.venueName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Capacity</p>
                    <p className="text-sm text-white">{team.venueCapacity?.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Country</p>
                    <p className="text-sm text-white">{team.country}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 text-gray-400 flex items-center justify-center">👨‍💼</span>
                  <div>
                    <p className="text-xs text-gray-400">Coach</p>
                    <p className="text-sm text-white">{team.coach}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 text-gray-400 flex items-center justify-center">⚽</span>
                  <div>
                    <p className="text-xs text-gray-400">Formation</p>
                    <p className="text-sm text-white">{team.formation}</p>
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
            <TabsTrigger value="squad" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Squad
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Matches
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Statistics
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
                      <p className="text-3xl font-bold text-white">{teamStats.matches}</p>
                      <p className="text-xs text-gray-400">Matches</p>
                    </div>
                    <div className="bg-gray-700/40 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-white">{teamStats.wins}</p>
                      <p className="text-xs text-gray-400">Wins</p>
                    </div>
                    <div className="bg-gray-700/40 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-white">{teamStats.draws}</p>
                      <p className="text-xs text-gray-400">Draws</p>
                    </div>
                    <div className="bg-gray-700/40 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-white">{teamStats.losses}</p>
                      <p className="text-xs text-gray-400">Losses</p>
                    </div>
                    <div className="bg-gray-700/40 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-white">{teamStats.goalsFor}</p>
                      <p className="text-xs text-gray-400">Goals For</p>
                    </div>
                    <div className="bg-gray-700/40 p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-white">{teamStats.goalsAgainst}</p>
                      <p className="text-xs text-gray-400">Goals Against</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm text-white font-medium mb-3">Possession Average</h4>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${teamStats.avgPossession}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-400">Average: {teamStats.avgPossession}%</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm text-white font-medium mb-3">Pass Accuracy</h4>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${teamStats.avgPassAccuracy}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-400">Accuracy: {teamStats.avgPassAccuracy}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 border border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Form</h3>
                  
                  <div className="space-y-4">
                    {recentMatches.slice(0, 3).map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <p className="text-sm text-white">
                            {match.isHome ? `vs ${match.opponent}` : `@ ${match.opponent}`}
                          </p>
                          <p className="text-xs text-gray-400">{match.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-center">
                            <p className="text-xs text-gray-400">Result</p>
                            <p className="text-sm text-white">{match.score}</p>
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
                    onClick={() => setActiveTab("matches")}
                  >
                    View All Matches
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Squad Tab */}
          <TabsContent value="squad">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Team Squad</h3>
                
                <div className="rounded-md overflow-hidden border border-white/10">
                  <Table>
                    <TableHeader className="bg-gray-700/40">
                      <TableRow>
                        <TableHead className="w-16 text-gray-300">#</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Position</TableHead>
                        <TableHead className="text-gray-300">Nationality</TableHead>
                        <TableHead className="text-gray-300">Age</TableHead>
                        <TableHead className="text-right text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {squad.map((player) => (
                        <TableRow key={player.id} className="hover:bg-gray-700/20">
                          <TableCell className="font-medium">{player.number}</TableCell>
                          <TableCell className="font-medium text-white">{player.name}</TableCell>
                          <TableCell>{player.position}</TableCell>
                          <TableCell>{player.nationality}</TableCell>
                          <TableCell>{player.age}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-blue-400 hover:text-white hover:bg-blue-500/20"
                              onClick={() => window.location.href = `/players/${player.id}`}
                            >
                              <span>View</span>
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Matches</h3>
                
                <div className="space-y-3">
                  {recentMatches.map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                      <div>
                        <p className="text-sm text-white">
                          {match.isHome ? `vs ${match.opponent}` : `@ ${match.opponent}`}
                        </p>
                        <p className="text-xs text-gray-400">{match.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Result</p>
                          <p className="text-sm text-white">{match.score}</p>
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

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Advanced Statistics</h3>
                <p className="text-gray-400">Advanced team statistics will appear here.</p>
                {/* We'll implement advanced statistics in the next phase */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamDetails;
