
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Check, X, BarChart4, Users, Clock } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { Team, TeamStats, TeamForm, HeadToHeadStats } from '@/types/team';

// Mock data for the team details page
const mockTeam: Team = {
  id: 1,
  name: "Manchester United",
  shortName: "MUN",
  logo: "https://media.api-sports.io/football/teams/33.png",
  country: "England",
  founded: 1878,
  venueId: 1,
  venueName: "Old Trafford",
  venueCapacity: 76212,
  leagueId: 39,
  leagueName: "Premier League",
  coach: "Erik ten Hag",
  formation: "4-2-3-1"
};

const mockTeamStats: TeamStats = {
  teamId: 1,
  season: "2023-2024",
  leagueId: 39,
  matches: 38,
  wins: 21,
  draws: 7,
  losses: 10,
  goalsFor: 75,
  goalsAgainst: 43,
  goalDifference: 32,
  cleanSheets: 14,
  yellowCards: 67,
  redCards: 3,
  avgPossession: 54.2,
  avgShotsTotal: 14.2,
  avgShotsOnTarget: 5.7,
  avgPassesTotal: 587,
  avgPassAccuracy: 86.3
};

const mockTeamForm: TeamForm = {
  teamId: 1,
  recentMatches: [
    { matchId: 101, date: "2023-05-28", opponent: "Manchester City", isHome: true, result: "W", score: "3-1" },
    { matchId: 98, date: "2023-05-20", opponent: "Liverpool", isHome: false, result: "D", score: "2-2" },
    { matchId: 94, date: "2023-05-13", opponent: "Arsenal", isHome: true, result: "W", score: "2-0" },
    { matchId: 90, date: "2023-05-06", opponent: "Chelsea", isHome: false, result: "L", score: "1-2" },
    { matchId: 86, date: "2023-04-29", opponent: "Tottenham", isHome: true, result: "W", score: "3-0" }
  ],
  last5Form: ["W", "D", "W", "L", "W"],
  winningStreak: 0,
  unbeatenRun: 3
};

const mockHeadToHead: HeadToHeadStats = {
  team1Id: 1,
  team2Id: 2,
  team1Name: "Manchester United",
  team2Name: "Liverpool",
  totalMatches: 10,
  team1Wins: 4,
  team2Wins: 3,
  draws: 3,
  team1GoalsFor: 15,
  team2GoalsFor: 12,
  lastMatches: [
    { date: "2023-05-20", competition: "Premier League", team1Score: 2, team2Score: 2, venue: "Anfield" },
    { date: "2023-01-14", competition: "Premier League", team1Score: 2, team2Score: 1, venue: "Old Trafford" },
    { date: "2022-08-22", competition: "Premier League", team1Score: 2, team2Score: 1, venue: "Old Trafford" },
    { date: "2022-03-06", competition: "Premier League", team1Score: 0, team2Score: 5, venue: "Old Trafford" },
    { date: "2021-10-24", competition: "Premier League", team1Score: 0, team2Score: 5, venue: "Old Trafford" }
  ],
  winningStreakTeam1: 0,
  winningStreakTeam2: 0
};

const PlayerRow: React.FC<{ id: number, name: string, position: string, nationality: string, age: number }> = ({ 
  id, name, position, nationality, age 
}) => (
  <TableRow>
    <TableCell className="font-medium">
      <a href={`/players/${id}`} className="text-blue-400 hover:text-blue-300 hover:underline">
        {name}
      </a>
    </TableCell>
    <TableCell>{position}</TableCell>
    <TableCell>{nationality}</TableCell>
    <TableCell className="text-center">{age}</TableCell>
  </TableRow>
);

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [teamStats, setTeamStats] = useState<TeamStats | null>(null);
  const [teamForm, setTeamForm] = useState<TeamForm | null>(null);
  const [headToHead, setHeadToHead] = useState<HeadToHeadStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call
      setTimeout(() => {
        setTeam(mockTeam);
        setTeamStats(mockTeamStats);
        setTeamForm(mockTeamForm);
        setHeadToHead(mockHeadToHead);
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

  if (!team) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <Header />
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-16">
            <h1 className="text-2xl font-bold text-white mb-4">Team not found</h1>
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
        {/* Team Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-start md:items-center">
          <div className="flex items-center gap-6 bg-gray-800/40 p-6 rounded-lg border border-white/10 w-full">
            {team.logo && (
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="h-28 w-28 object-contain"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{team.name}</h1>
              <p className="text-gray-400">{team.country} · {team.leagueName}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Founded: {team.founded}
                </span>
                <span className="bg-purple-500/20 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {team.venueName}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Stats and Squad */}
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="grid grid-cols-5 bg-gray-800/60 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Overview
            </TabsTrigger>
            <TabsTrigger value="squad" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Squad
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Statistics
            </TabsTrigger>
            <TabsTrigger value="fixtures" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Fixtures
            </TabsTrigger>
            <TabsTrigger value="head2head" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Head-to-Head
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400"/>
                    Team Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-y-3">
                      <div className="text-sm text-gray-400">Coach:</div>
                      <div className="text-sm text-white font-medium">{team.coach}</div>
                      
                      <div className="text-sm text-gray-400">Formation:</div>
                      <div className="text-sm text-white font-medium">{team.formation}</div>
                      
                      <div className="text-sm text-gray-400">Stadium:</div>
                      <div className="text-sm text-white font-medium">{team.venueName}</div>
                      
                      <div className="text-sm text-gray-400">Capacity:</div>
                      <div className="text-sm text-white font-medium">{team.venueCapacity?.toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart4 className="w-5 h-5 text-green-400"/>
                    Season Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {teamStats && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-y-3">
                        <div className="text-sm text-gray-400">League Position:</div>
                        <div className="text-sm text-white font-medium">3rd</div>
                        
                        <div className="text-sm text-gray-400">Matches:</div>
                        <div className="text-sm text-white font-medium">{teamStats.matches}</div>
                        
                        <div className="text-sm text-gray-400">Record:</div>
                        <div className="text-sm text-white font-medium">
                          {teamStats.wins}W - {teamStats.draws}D - {teamStats.losses}L
                        </div>
                        
                        <div className="text-sm text-gray-400">Goals:</div>
                        <div className="text-sm text-white font-medium">
                          {teamStats.goalsFor} / {teamStats.goalsAgainst} (Diff: {teamStats.goalDifference})
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400"/>
                    Recent Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {teamForm && (
                    <>
                      <div className="flex gap-1 mb-4">
                        {teamForm.last5Form.map((result, index) => (
                          <div 
                            key={index}
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-medium text-sm ${
                              result === 'W' ? 'bg-green-500/80' : 
                              result === 'D' ? 'bg-amber-500/80' : 
                              'bg-red-500/80'
                            }`}
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-3">
                        {teamForm.recentMatches.map((match, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <div className="text-gray-400 w-16 text-xs">{match.date.split('-')[2]}/{match.date.split('-')[1]}</div>
                              <div className="text-white">{match.opponent}</div>
                            </div>
                            <div className="flex items-center">
                              <div className="text-white font-medium mr-2">{match.score}</div>
                              <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs ${
                                match.result === 'W' ? 'bg-green-500/80' : 
                                match.result === 'D' ? 'bg-amber-500/80' : 
                                'bg-red-500/80'
                              }`}>
                                {match.result}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Squad Tab */}
          <TabsContent value="squad">
            <Card className="bg-gray-800/60 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Team Squad</CardTitle>
                <CardDescription>Players currently in the team roster</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader className="bg-gray-700/30">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-gray-300">Player Name</TableHead>
                      <TableHead className="text-gray-300">Position</TableHead>
                      <TableHead className="text-gray-300">Nationality</TableHead>
                      <TableHead className="text-gray-300 text-center">Age</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <PlayerRow id={1001} name="David de Gea" position="Goalkeeper" nationality="Spain" age={33} />
                    <PlayerRow id={1002} name="Harry Maguire" position="Defender" nationality="England" age={30} />
                    <PlayerRow id={1003} name="Bruno Fernandes" position="Midfielder" nationality="Portugal" age={29} />
                    <PlayerRow id={1004} name="Marcus Rashford" position="Forward" nationality="England" age={26} />
                    <PlayerRow id={1005} name="Casemiro" position="Midfielder" nationality="Brazil" age={31} />
                    <PlayerRow id={1006} name="Luke Shaw" position="Defender" nationality="England" age={28} />
                    <PlayerRow id={1007} name="Antony" position="Forward" nationality="Brazil" age={24} />
                    <PlayerRow id={1008} name="Lisandro Martínez" position="Defender" nationality="Argentina" age={25} />
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            {teamStats && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-800/60 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-gray-400">Possession</span>
                          <span className="text-white font-medium">{teamStats.avgPossession}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full">
                          <div
                            className="bg-blue-500 h-full rounded-full"
                            style={{ width: `${teamStats.avgPossession}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-gray-400">Pass Accuracy</span>
                          <span className="text-white font-medium">{teamStats.avgPassAccuracy}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full">
                          <div
                            className="bg-green-500 h-full rounded-full"
                            style={{ width: `${teamStats.avgPassAccuracy}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-gray-400">Shot Conversion Rate</span>
                          <span className="text-white font-medium">{(teamStats.goalsFor / (teamStats.avgShotsTotal * teamStats.matches) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full">
                          <div
                            className="bg-purple-500 h-full rounded-full"
                            style={{ width: `${(teamStats.goalsFor / (teamStats.avgShotsTotal * teamStats.matches) * 100).toFixed(1)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span className="text-gray-400">Clean Sheet Rate</span>
                          <span className="text-white font-medium">{(teamStats.cleanSheets / teamStats.matches * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full">
                          <div
                            className="bg-amber-500 h-full rounded-full"
                            style={{ width: `${(teamStats.cleanSheets / teamStats.matches * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/60 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Disciplinary Record</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-400">Yellow Cards</span>
                            <span className="text-white font-medium">{teamStats.yellowCards}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(12, teamStats.yellowCards) }).map((_, i) => (
                              <div key={i} className="h-6 w-3 bg-yellow-500/80 rounded-sm"></div>
                            ))}
                            {teamStats.yellowCards > 12 && (
                              <div className="text-white text-xs ml-2">+{teamStats.yellowCards - 12}</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2 text-sm">
                            <span className="text-gray-400">Red Cards</span>
                            <span className="text-white font-medium">{teamStats.redCards}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: teamStats.redCards }).map((_, i) => (
                              <div key={i} className="h-6 w-3 bg-red-500/80 rounded-sm"></div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          <div className="text-sm text-gray-400 mb-2">Cards per Match</div>
                          <div className="text-2xl font-bold text-white">
                            {(teamStats.yellowCards / teamStats.matches).toFixed(1)} <span className="text-sm text-gray-400">YC</span>
                            <span className="text-gray-400 mx-2">/</span>
                            {(teamStats.redCards / teamStats.matches).toFixed(1)} <span className="text-sm text-gray-400">RC</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Fixtures Tab */}
          <TabsContent value="fixtures">
            <Card className="bg-gray-800/60 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400"/>
                  Upcoming Fixtures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                    <div className="w-16 text-xs text-gray-400">03/12</div>
                    <div className="flex-1">
                      <span className="text-white">Manchester United</span>
                      <span className="text-gray-400 mx-2">vs</span>
                      <span className="text-white">Chelsea</span>
                    </div>
                    <div className="text-xs text-gray-400">Old Trafford</div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                    <div className="w-16 text-xs text-gray-400">10/12</div>
                    <div className="flex-1">
                      <span className="text-white">Liverpool</span>
                      <span className="text-gray-400 mx-2">vs</span>
                      <span className="text-white">Manchester United</span>
                    </div>
                    <div className="text-xs text-gray-400">Anfield</div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                    <div className="w-16 text-xs text-gray-400">17/12</div>
                    <div className="flex-1">
                      <span className="text-white">Manchester United</span>
                      <span className="text-gray-400 mx-2">vs</span>
                      <span className="text-white">Arsenal</span>
                    </div>
                    <div className="text-xs text-gray-400">Old Trafford</div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-900/50 rounded-lg">
                    <div className="w-16 text-xs text-gray-400">26/12</div>
                    <div className="flex-1">
                      <span className="text-white">Newcastle</span>
                      <span className="text-gray-400 mx-2">vs</span>
                      <span className="text-white">Manchester United</span>
                    </div>
                    <div className="text-xs text-gray-400">St James' Park</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Head-to-Head Tab */}
          <TabsContent value="head2head">
            {headToHead && (
              <Card className="bg-gray-800/60 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">
                    {headToHead.team1Name} vs {headToHead.team2Name}
                  </CardTitle>
                  <CardDescription>Last {headToHead.totalMatches} meetings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <div className="text-center mb-4">
                        <div className="text-sm text-gray-400 mb-1">Head-to-Head Record</div>
                        <div className="flex justify-center items-center gap-4 text-xl font-bold">
                          <span className="text-blue-400">{headToHead.team1Wins}</span>
                          <span className="text-gray-400">-</span>
                          <span className="text-amber-400">{headToHead.draws}</span>
                          <span className="text-gray-400">-</span>
                          <span className="text-red-400">{headToHead.team2Wins}</span>
                        </div>
                        <div className="flex justify-center items-center gap-4 text-xs text-gray-400 mt-1">
                          <span>Wins</span>
                          <span>Draws</span>
                          <span>Losses</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Goals</div>
                        <div className="flex justify-center items-center gap-4 text-xl font-bold">
                          <span className="text-blue-400">{headToHead.team1GoalsFor}</span>
                          <span className="text-gray-400">-</span>
                          <span className="text-red-400">{headToHead.team2GoalsFor}</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <div className="text-sm text-gray-400 mb-2">Recent Meetings</div>
                      {headToHead.lastMatches.map((match, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                          <div className="text-xs text-gray-400">{match.date} · {match.competition}</div>
                          <div className="flex items-center gap-1">
                            <div className="text-white font-medium">{match.team1Score}</div>
                            <div className="text-gray-400 mx-1">-</div>
                            <div className="text-white font-medium">{match.team2Score}</div>
                          </div>
                          <div className="text-xs text-gray-400">{match.venue}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamDetails;
