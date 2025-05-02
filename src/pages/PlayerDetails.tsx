
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart4, Activity, Calendar, Info, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { Player, PlayerStats, PlayerForm } from '@/types/player';
import { Team } from '@/types/team';

// Mock data for player
const mockPlayer: Player = {
  id: 1,
  name: "Cristiano Ronaldo",
  position: "Forward",
  teamId: 1,
  teamName: "Al-Nassr",
  nationality: "Portugal",
  age: 38,
  height: 187,
  weight: 85,
  jerseyNumber: 7,
  preferredFoot: "right",
  image: "https://media.api-sports.io/football/players/874.png"
};

// Mock data for player stats
const mockPlayerStats: PlayerStats = {
  playerId: 1,
  appearances: 28,
  minutesPlayed: 2430,
  goals: 24,
  assists: 9,
  yellowCards: 5,
  redCards: 0,
  shotsTotal: 112,
  shotsOnTarget: 58,
  passesTotal: 754,
  passesCompleted: 632,
  passAccuracy: 83.8,
  tackles: 14,
  interceptions: 8,
  duelsWon: 145,
  duelsTotal: 252,
  dribbleSuccess: 47,
  dribblesAttempted: 78,
  foulsDrawn: 42,
  foulsCommitted: 26,
  season: "2023-2024",
  competitionId: 1
};

// Mock data for player form
const mockPlayerForm: PlayerForm[] = [
  { 
    playerId: 1,
    matchId: 101,
    date: "2023-05-28",
    rating: 8.5,
    minutesPlayed: 90,
    goals: 2,
    assists: 1,
    teamScore: 3,
    opponentScore: 1,
    opponentId: 5,
    opponentName: "Al-Hilal",
    isHome: true,
    result: "W"
  },
  { 
    playerId: 1,
    matchId: 98,
    date: "2023-05-20",
    rating: 7.2,
    minutesPlayed: 90,
    goals: 1,
    assists: 0,
    teamScore: 2,
    opponentScore: 2,
    opponentId: 6,
    opponentName: "Al-Ittihad",
    isHome: false,
    result: "D"
  },
  { 
    playerId: 1,
    matchId: 94,
    date: "2023-05-13",
    rating: 8.7,
    minutesPlayed: 90,
    goals: 1,
    assists: 2,
    teamScore: 4,
    opponentScore: 0,
    opponentId: 7,
    opponentName: "Al-Adalah",
    isHome: true,
    result: "W"
  },
  { 
    playerId: 1,
    matchId: 90,
    date: "2023-05-06",
    rating: 6.5,
    minutesPlayed: 90,
    goals: 0,
    assists: 0,
    teamScore: 1,
    opponentScore: 2,
    opponentId: 8,
    opponentName: "Al-Ahli",
    isHome: false,
    result: "L"
  },
  { 
    playerId: 1,
    matchId: 86,
    date: "2023-04-29",
    rating: 9.2,
    minutesPlayed: 90,
    goals: 3,
    assists: 0,
    teamScore: 3,
    opponentScore: 0,
    opponentId: 9,
    opponentName: "Al-Fateh",
    isHome: true,
    result: "W"
  }
];

// Mock data for player's team
const mockTeam: Team & { logo: string } = {
  id: 1,
  name: "Al-Nassr",
  shortName: "ANR",
  logo: "https://media.api-sports.io/football/teams/750.png",
  country: "Saudi Arabia",
  founded: 1955,
  leagueId: 1,
  leagueName: "Saudi Pro League"
};

const PlayerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [playerForm, setPlayerForm] = useState<PlayerForm[]>([]);
  const [team, setTeam] = useState<Team & { logo: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call delay
      setTimeout(() => {
        setPlayer(mockPlayer);
        setPlayerStats(mockPlayerStats);
        setPlayerForm(mockPlayerForm);
        setTeam(mockTeam);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <Header />
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <Header />
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-16">
            <h1 className="text-2xl font-bold text-white mb-4">Player not found</h1>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <Header />
      <div className="container mx-auto px-4">
        {/* Player Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="flex items-center gap-6 bg-gray-800/40 p-6 rounded-lg border border-white/10 md:col-span-2">
            <div className="relative w-28 h-28 bg-gray-700/50 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/10">
              {player.image ? (
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{player.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <a 
                  href={`/teams/${player.teamId}`}
                  className="text-gray-400 hover:text-white flex items-center transition-colors"
                >
                  {team?.logo && (
                    <img 
                      src={team.logo} 
                      alt={player.teamName} 
                      className="w-5 h-5 mr-2 object-contain"
                    />
                  )}
                  {player.teamName}
                </a>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400">{player.position}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  #{player.jerseyNumber}
                </span>
                <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {player.nationality}
                </span>
                <span className="bg-green-500/20 text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {player.age} years
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 p-6 rounded-lg border border-white/10">
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-gray-400 text-sm mb-1">Season 2023-24</h3>
                <div className="flex items-center justify-center gap-6">
                  <div>
                    <div className="text-3xl font-bold text-white">{playerStats?.goals || 0}</div>
                    <div className="text-sm text-gray-400">Goals</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">{playerStats?.assists || 0}</div>
                    <div className="text-sm text-gray-400">Assists</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">{playerStats?.appearances || 0}</div>
                    <div className="text-sm text-gray-400">Matches</div>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-gray-400 text-sm mb-2">Average Rating</h3>
                <div className="text-4xl font-bold text-white">
                  {playerForm.length > 0 
                    ? (playerForm.reduce((sum, match) => sum + match.rating, 0) / playerForm.length).toFixed(1)
                    : 'N/A'
                  }
                </div>
                <div className="flex justify-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`w-3 h-3 mx-0.5 rounded-full ${
                        (playerForm.length > 0 && (playerForm.reduce((sum, match) => sum + match.rating, 0) / playerForm.length) > i * 2) 
                          ? 'bg-yellow-400' 
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Stats Tabs */}
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid grid-cols-4 bg-gray-800/60 mb-6">
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <BarChart4 className="h-4 w-4 mr-2" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="form" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <Activity className="h-4 w-4 mr-2" />
              Form
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <Calendar className="h-4 w-4 mr-2" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="info" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              <Info className="h-4 w-4 mr-2" />
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card className="bg-gray-800/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Attacking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Goals</span>
                      <span className="text-white font-medium">{playerStats?.goals}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-blue-500 h-full rounded-full" 
                        style={{ width: `${(playerStats?.goals || 0) * 4}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Assists</span>
                      <span className="text-white font-medium">{playerStats?.assists}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-green-500 h-full rounded-full" 
                        style={{ width: `${(playerStats?.assists || 0) * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Shot Accuracy</span>
                      <span className="text-white font-medium">
                        {playerStats ? ((playerStats.shotsOnTarget / playerStats.shotsTotal) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-purple-500 h-full rounded-full" 
                        style={{ width: `${playerStats ? ((playerStats.shotsOnTarget / playerStats.shotsTotal) * 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Conversion Rate</span>
                      <span className="text-white font-medium">
                        {playerStats ? ((playerStats.goals / playerStats.shotsOnTarget) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-amber-500 h-full rounded-full" 
                        style={{ width: `${playerStats ? ((playerStats.goals / playerStats.shotsOnTarget) * 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Passing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Pass Accuracy</span>
                      <span className="text-white font-medium">{playerStats?.passAccuracy}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-blue-500 h-full rounded-full" 
                        style={{ width: `${playerStats?.passAccuracy || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Key Passes</span>
                      <span className="text-white font-medium">42</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-green-500 h-full rounded-full" 
                        style={{ width: "84%" }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Passes per Game</span>
                      <span className="text-white font-medium">
                        {playerStats && playerStats.appearances > 0 ? 
                          Math.round(playerStats.passesTotal / playerStats.appearances) : 0}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-purple-500 h-full rounded-full" 
                        style={{ width: `${playerStats && playerStats.appearances > 0 ? 
                          Math.min((playerStats.passesTotal / playerStats.appearances) * 2, 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progressive Passes</span>
                      <span className="text-white font-medium">29</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-amber-500 h-full rounded-full" 
                        style={{ width: "58%" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Possession</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Dribble Success</span>
                      <span className="text-white font-medium">
                        {playerStats ? ((playerStats.dribbleSuccess / playerStats.dribblesAttempted) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-blue-500 h-full rounded-full" 
                        style={{ width: `${playerStats ? ((playerStats.dribbleSuccess / playerStats.dribblesAttempted) * 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Duels Won</span>
                      <span className="text-white font-medium">
                        {playerStats ? ((playerStats.duelsWon / playerStats.duelsTotal) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-green-500 h-full rounded-full" 
                        style={{ width: `${playerStats ? ((playerStats.duelsWon / playerStats.duelsTotal) * 100) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Fouls Drawn</span>
                      <span className="text-white font-medium">{playerStats?.foulsDrawn}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-purple-500 h-full rounded-full" 
                        style={{ width: `${(playerStats?.foulsDrawn || 0) * 2}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Fouls Committed</span>
                      <span className="text-white font-medium">{playerStats?.foulsCommitted}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div 
                        className="bg-amber-500 h-full rounded-full" 
                        style={{ width: `${(playerStats?.foulsCommitted || 0) * 2}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="form">
            <Card className="bg-gray-800/60 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Form</CardTitle>
                <CardDescription>Performance in the last 5 matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {playerForm.map((match, index) => (
                      <div 
                        key={index}
                        className={`px-3 py-1 rounded-full flex items-center ${
                          match.result === 'W' ? 'bg-green-500/20 text-green-300' :
                          match.result === 'D' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-red-500/20 text-red-300'
                        }`}
                      >
                        <span className="text-sm font-medium mr-1">{match.result}</span>
                        <span className="text-xs">({match.opponentName})</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {playerForm.map((match, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="text-xs text-gray-400">{match.date}</div>
                            <div className="text-white font-medium mt-1">
                              {match.isHome ? 
                                `${player.teamName} vs ${match.opponentName}` : 
                                `${match.opponentName} vs ${player.teamName}`}
                            </div>
                          </div>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            match.result === 'W' ? 'bg-green-500/20 text-green-300' :
                            match.result === 'D' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {match.teamScore} - {match.opponentScore}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-gray-400">Rating</div>
                          <div className="flex items-center">
                            <div className="text-lg font-bold text-white">{match.rating.toFixed(1)}</div>
                            <div className="flex ml-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div 
                                  key={i}
                                  className={`w-2 h-2 mx-0.5 rounded-full ${
                                    match.rating / 2 > i ? 'bg-yellow-400' : 'bg-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mt-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Goals</span>
                            <span className="text-white font-medium">{match.goals}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Assists</span>
                            <span className="text-white font-medium">{match.assists}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Minutes</span>
                            <span className="text-white font-medium">{match.minutesPlayed}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">G+A</span>
                            <span className="text-white font-medium">{match.goals + match.assists}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches">
            <Card className="bg-gray-800/60 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Match History</CardTitle>
                <CardDescription>Player performance in recent matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Competition</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Match</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Result</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Goals</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Assists</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {playerForm.map((match, index) => (
                          <tr key={index} className="hover:bg-gray-800/30">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                              {match.date}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                              Saudi Pro League
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-white">
                              {match.isHome ? 
                                `${player.teamName} vs ${match.opponentName}` : 
                                `${match.opponentName} vs ${player.teamName}`}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                match.result === 'W' ? 'bg-green-500/20 text-green-300' :
                                match.result === 'D' ? 'bg-amber-500/20 text-amber-300' :
                                'bg-red-500/20 text-red-300'
                              }`}>
                                {match.teamScore} - {match.opponentScore}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-medium text-white">
                              {match.goals}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-medium text-white">
                              {match.assists}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                              <div className="flex items-center justify-center">
                                <span className="font-medium text-white mr-2">{match.rating.toFixed(1)}</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <div 
                                      key={i}
                                      className={`w-1.5 h-1.5 mx-0.5 rounded-full ${
                                        match.rating / 2 > i ? 'bg-yellow-400' : 'bg-gray-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center">
                    <Button variant="outline" className="bg-gray-900/50 border-gray-600/50 text-gray-300 hover:bg-gray-800">
                      View More Matches
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <Card className="bg-gray-800/60 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Player Information</CardTitle>
                <CardDescription>Personal and career details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Personal Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Full Name</span>
                        <span className="text-white font-medium">Cristiano Ronaldo dos Santos Aveiro</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Date of Birth</span>
                        <span className="text-white font-medium">February 5, 1985</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Age</span>
                        <span className="text-white font-medium">{player.age} years</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Nationality</span>
                        <span className="text-white font-medium">{player.nationality}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Height</span>
                        <span className="text-white font-medium">{player.height} cm</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Weight</span>
                        <span className="text-white font-medium">{player.weight} kg</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-gray-400">Preferred Foot</span>
                        <span className="text-white font-medium capitalize">{player.preferredFoot}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Career History</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">AL</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Al-Nassr</div>
                          <div className="text-sm text-gray-400">2023 - Present</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">MU</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Manchester United</div>
                          <div className="text-sm text-gray-400">2021 - 2022</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">JUV</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Juventus</div>
                          <div className="text-sm text-gray-400">2018 - 2021</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">RM</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Real Madrid</div>
                          <div className="text-sm text-gray-400">2009 - 2018</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
                        <div className="w-12 h-12 bg-gray-700/50 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">MU</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Manchester United</div>
                          <div className="text-sm text-gray-400">2003 - 2009</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayerDetails;
