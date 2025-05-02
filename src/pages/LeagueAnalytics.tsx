
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart4, PieChart, LineChart, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import { LeagueStatistics } from "@/components/LeagueStatistics";

// Mock data for league analytics
const mockLeagues = [
  { id: "1", name: "Premier League", season: "2024-2025" },
  { id: "2", name: "La Liga", season: "2024-2025" },
  { id: "3", name: "Bundesliga", season: "2024-2025" },
  { id: "4", name: "Serie A", season: "2024-2025" },
  { id: "5", name: "Ligue 1", season: "2024-2025" },
];

// Mock match data
const mockMatches = [
  {
    date: "2025-04-03",
    home_team: "Liverpool",
    away_team: "Manchester Kék",
    ht_home_score: 1,
    ht_away_score: 1,
    home_score: 2,
    away_score: 2,
    round: "Round 30"
  },
  {
    date: "2025-04-03",
    home_team: "London Ágyúk",
    away_team: "Chelsea",
    ht_home_score: 2,
    ht_away_score: 0,
    home_score: 3,
    away_score: 1,
    round: "Round 30"
  },
  {
    date: "2025-04-04",
    home_team: "Tottenham",
    away_team: "Vörös Ördögök",
    ht_home_score: 0,
    ht_away_score: 1,
    home_score: 1,
    away_score: 2,
    round: "Round 30"
  },
  {
    date: "2025-04-04",
    home_team: "Newcastle",
    away_team: "Aston Oroszlán",
    ht_home_score: 1,
    ht_away_score: 1,
    home_score: 2,
    away_score: 1,
    round: "Round 30"
  },
  {
    date: "2025-04-05",
    home_team: "Wolverhampton",
    away_team: "Everton",
    ht_home_score: 0,
    ht_away_score: 0,
    home_score: 1,
    away_score: 0,
    round: "Round 30"
  },
  {
    date: "2025-04-05",
    home_team: "Brighton",
    away_team: "Brentford",
    ht_home_score: 2,
    ht_away_score: 0,
    home_score: 2,
    away_score: 1,
    round: "Round 30"
  },
];

// Mock top scorers data
const mockTopScorers = [
  { playerId: 1, playerName: "Erling Haaland", teamId: 1, teamName: "Manchester Kék", goals: 24, appearances: 28, minutesPlayed: 2430, minutesPerGoal: 101 },
  { playerId: 2, playerName: "Mohamed Salah", teamId: 2, teamName: "Liverpool", goals: 19, appearances: 30, minutesPlayed: 2690, minutesPerGoal: 141 },
  { playerId: 3, playerName: "Harry Kane", teamId: 3, teamName: "Bayern Munich", goals: 17, appearances: 29, minutesPlayed: 2610, minutesPerGoal: 153 },
  { playerId: 4, playerName: "Son Heung-min", teamId: 4, teamName: "Tottenham", goals: 14, appearances: 27, minutesPlayed: 2430, minutesPerGoal: 173 },
  { playerId: 5, playerName: "Phil Foden", teamId: 1, teamName: "Manchester Kék", goals: 13, appearances: 29, minutesPlayed: 2320, minutesPerGoal: 178 },
];

// Mock match results data for filtering
const mockResultsData = [
  { type: "Home Wins", count: 158, percentage: 45.1 },
  { type: "Away Wins", count: 103, percentage: 29.4 },
  { type: "Draws", count: 89, percentage: 25.5 },
];

const mockScorePatterns = [
  { score: "2-1", count: 37, percentage: 10.6 },
  { score: "1-0", count: 34, percentage: 9.7 },
  { score: "1-1", count: 32, percentage: 9.1 },
  { score: "2-0", count: 31, percentage: 8.9 },
  { score: "0-0", count: 23, percentage: 6.6 },
  { score: "3-1", count: 22, percentage: 6.3 },
  { score: "2-2", count: 17, percentage: 4.9 },
  { score: "3-0", count: 15, percentage: 4.3 },
  { score: "3-2", count: 12, percentage: 3.4 },
  { score: "4-0", count: 9, percentage: 2.6 },
];

const LeagueAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState("1");
  const [analysisType, setAnalysisType] = useState("general");
  const [isLoading, setIsLoading] = useState(false);

  const handleLeagueChange = (value: string) => {
    setIsLoading(true);
    setSelectedLeague(value);
    
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-gray-800/60 border-white/10"
            onClick={() => navigate('/league-management')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to League Management</span>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">League Analytics</h1>
            <p className="text-gray-400">Comprehensive statistics and insights for your leagues</p>
          </div>
          
          <div className="w-full md:w-64">
            <Select value={selectedLeague} onValueChange={handleLeagueChange}>
              <SelectTrigger className="bg-gray-800/60 border-white/10 text-white">
                <SelectValue placeholder="Select league" />
              </SelectTrigger>
              <SelectContent>
                {mockLeagues.map(league => (
                  <SelectItem key={league.id} value={league.id}>
                    {league.name} ({league.season})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={analysisType} onValueChange={setAnalysisType} className="w-full">
          <TabsList className="grid grid-cols-3 bg-gray-800/60 mb-6">
            <TabsTrigger value="general" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <BarChart4 className="h-4 w-4 mr-2" />
              General Stats
            </TabsTrigger>
            <TabsTrigger value="scorers" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <LineChart className="h-4 w-4 mr-2" />
              Top Scorers
            </TabsTrigger>
            <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <PieChart className="h-4 w-4 mr-2" />
              Match Patterns
            </TabsTrigger>
          </TabsList>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 text-blue-400 animate-spin mb-4" />
              <p className="text-gray-400">Loading league data...</p>
            </div>
          ) : (
            <>
              <TabsContent value="general" className="space-y-6">
                <LeagueStatistics matches={mockMatches} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800/60 border border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Match Results Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockResultsData.map((result, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">{result.type}</span>
                              <span className="text-white">{result.count} ({result.percentage}%)</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${result.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/60 border border-white/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">Most Common Scorelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockScorePatterns.slice(0, 5).map((score, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">{score.score}</span>
                              <span className="text-white">{score.count} ({score.percentage}%)</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${(score.count / mockScorePatterns[0].count) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="scorers">
                <Card className="bg-gray-800/60 border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Top Goal Scorers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader className="bg-gray-700/30">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-gray-300">Rank</TableHead>
                          <TableHead className="text-gray-300">Player</TableHead>
                          <TableHead className="text-gray-300">Team</TableHead>
                          <TableHead className="text-gray-300 text-center">Goals</TableHead>
                          <TableHead className="text-gray-300 text-center">Appearances</TableHead>
                          <TableHead className="text-gray-300 text-center">Mins/Goal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTopScorers.map((scorer, index) => (
                          <TableRow key={index} className="hover:bg-gray-700/20">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <a 
                                href={`/players/${scorer.playerId}`}
                                className="text-blue-400 hover:text-blue-300 hover:underline"
                              >
                                {scorer.playerName}
                              </a>
                            </TableCell>
                            <TableCell>
                              <a 
                                href={`/teams/${scorer.teamId}`}
                                className="text-gray-300 hover:text-white"
                              >
                                {scorer.teamName}
                              </a>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-white">{scorer.goals}</TableCell>
                            <TableCell className="text-center">{scorer.appearances}</TableCell>
                            <TableCell className="text-center">{scorer.minutesPerGoal}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="patterns">
                <Card className="bg-gray-800/60 border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Scoreline Patterns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-gray-700/30">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="text-gray-300">Scoreline</TableHead>
                            <TableHead className="text-gray-300 text-center">Count</TableHead>
                            <TableHead className="text-gray-300 text-center">Percentage</TableHead>
                            <TableHead className="text-gray-300">Distribution</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockScorePatterns.map((score, index) => (
                            <TableRow key={index} className="hover:bg-gray-700/20">
                              <TableCell className="font-medium text-white">{score.score}</TableCell>
                              <TableCell className="text-center">{score.count}</TableCell>
                              <TableCell className="text-center">{score.percentage}%</TableCell>
                              <TableCell className="w-1/3">
                                <div className="w-full h-4 bg-gray-700/50 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      index % 3 === 0 ? 'bg-blue-500' : 
                                      index % 3 === 1 ? 'bg-purple-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${score.percentage * 2}%` }}
                                  ></div>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default LeagueAnalytics;
