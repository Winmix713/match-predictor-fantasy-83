
import React, { useState } from 'react';
import { ChevronLeft, Brain, Database, Calculator, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PREMIER_LEAGUE_TEAMS } from '../data/premier-league-teams';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { usePrediction } from '../hooks/usePrediction';
import { HistoricalMatch } from '../types/prediction';
import { getTeamMatches, calculateHeadToHeadStats } from '../utils/predictionService';

const AdvancedPattern = () => {
  const [homeTeamId, setHomeTeamId] = useState<string>('');
  const [awayTeamId, setAwayTeamId] = useState<string>('');
  const [activeModel, setActiveModel] = useState('combined');
  
  const homeTeam = homeTeamId ? PREMIER_LEAGUE_TEAMS.find(t => t.id === homeTeamId) || null : null;
  const awayTeam = awayTeamId ? PREMIER_LEAGUE_TEAMS.find(t => t.id === awayTeamId) || null : null;
  
  const { prediction, teamAnalysis, isPredicting, error, generatePrediction } = usePrediction({
    homeTeam,
    awayTeam
  });
  
  const headToHead = React.useMemo(() => {
    if (!homeTeam || !awayTeam) return [];
    
    // Get matches between these teams
    const matches = getTeamMatches(homeTeam.name, awayTeam.name);
    
    // Transform to display format
    return matches.map(match => ({
      date: match.date,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: match.score.home,
      awayScore: match.score.away,
      winner: match.score.home > match.score.away ? 'home' : 
              match.score.home < match.score.away ? 'away' : 'draw'
    }));
  }, [homeTeam, awayTeam]);
  
  const handleRunAnalysis = () => {
    if (homeTeam && awayTeam) {
      generatePrediction();
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Header section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-500" />
                ADVANCED PATTERN DETECTION
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-black/20 border-white/10 text-white"
                asChild
              >
                <Link to="/analysis">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Analysis
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Team selection section */}
          <Card className="bg-black/20 border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-400" />
                Select Teams for Pattern Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Home Team</label>
                  <Select value={homeTeamId} onValueChange={setHomeTeamId}>
                    <SelectTrigger className="bg-black/40 border-white/10">
                      <SelectValue placeholder="Select home team" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      {PREMIER_LEAGUE_TEAMS.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Away Team</label>
                  <Select value={awayTeamId} onValueChange={setAwayTeamId}>
                    <SelectTrigger className="bg-black/40 border-white/10">
                      <SelectValue placeholder="Select away team" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10">
                      {PREMIER_LEAGUE_TEAMS.map(team => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button 
                  onClick={handleRunAnalysis}
                  disabled={!homeTeam || !awayTeam || isPredicting}
                  className="bg-blue-600"
                >
                  {isPredicting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-4 w-4" />
                      Run Advanced Analysis
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Results section */}
          {teamAnalysis && prediction && (
            <Card className="bg-black/20 border-white/5 overflow-hidden">
              <CardHeader className="border-b border-white/5">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  Pattern Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeModel} onValueChange={setActiveModel}>
                  <TabsList className="w-full rounded-none border-b border-white/5 bg-black/40">
                    <TabsTrigger value="combined" className="flex-1 rounded-none data-[state=active]:bg-blue-900/20">
                      Combined
                    </TabsTrigger>
                    <TabsTrigger value="randomForest" className="flex-1 rounded-none data-[state=active]:bg-blue-900/20">
                      Random Forest
                    </TabsTrigger>
                    <TabsTrigger value="poisson" className="flex-1 rounded-none data-[state=active]:bg-blue-900/20">
                      Poisson
                    </TabsTrigger>
                    <TabsTrigger value="elo" className="flex-1 rounded-none data-[state=active]:bg-blue-900/20">
                      ELO
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left column - Team stats */}
                      <div className="space-y-6">
                        {/* Team form */}
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5">
                          <h3 className="text-sm font-medium text-white mb-4">Team Form Analysis</h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-xs text-gray-400 mb-2">{homeTeam?.name}</h4>
                              <div className="flex items-center gap-2">
                                <div className="h-2 flex-1 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${teamAnalysis.homeFormIndex}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-blue-400 font-medium">{Math.round(teamAnalysis.homeFormIndex)}%</span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xs text-gray-400 mb-2">{awayTeam?.name}</h4>
                              <div className="flex items-center gap-2">
                                <div className="h-2 flex-1 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full" 
                                    style={{ width: `${teamAnalysis.awayFormIndex}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-blue-400 font-medium">{Math.round(teamAnalysis.awayFormIndex)}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Head-to-head stats */}
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5">
                          <h3 className="text-sm font-medium text-white mb-4">Head-to-Head Stats</h3>
                          
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="bg-black/20 p-3 rounded-lg">
                              <span className="text-lg font-bold text-blue-400">
                                {teamAnalysis.headToHeadStats.homeWins}
                              </span>
                              <p className="text-xs text-gray-400 mt-1">{homeTeam?.name} Wins</p>
                            </div>
                            
                            <div className="bg-black/20 p-3 rounded-lg">
                              <span className="text-lg font-bold text-gray-300">
                                {teamAnalysis.headToHeadStats.draws}
                              </span>
                              <p className="text-xs text-gray-400 mt-1">Draws</p>
                            </div>
                            
                            <div className="bg-black/20 p-3 rounded-lg">
                              <span className="text-lg font-bold text-red-400">
                                {teamAnalysis.headToHeadStats.awayWins}
                              </span>
                              <p className="text-xs text-gray-400 mt-1">{awayTeam?.name} Wins</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="text-xs text-gray-400 mb-2">Win Distribution</div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden flex">
                              <div 
                                className="h-full bg-blue-500" 
                                style={{ width: `${teamAnalysis.headToHeadStats.homeWinPercentage}%` }}
                              ></div>
                              <div 
                                className="h-full bg-gray-500" 
                                style={{ width: `${teamAnalysis.headToHeadStats.drawPercentage}%` }}
                              ></div>
                              <div 
                                className="h-full bg-red-500" 
                                style={{ width: `${teamAnalysis.headToHeadStats.awayWinPercentage}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>{Math.round(teamAnalysis.headToHeadStats.homeWinPercentage)}%</span>
                              <span>{Math.round(teamAnalysis.headToHeadStats.drawPercentage)}%</span>
                              <span>{Math.round(teamAnalysis.headToHeadStats.awayWinPercentage)}%</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Goals analysis */}
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5">
                          <h3 className="text-sm font-medium text-white mb-4">Goals Analysis</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Expected Goals</div>
                              <div className="flex items-center gap-4">
                                <div className="w-1/2 text-center p-2 bg-black/20 rounded-lg">
                                  <span className="text-lg font-bold text-blue-400">
                                    {prediction.homeExpectedGoals.toFixed(1)}
                                  </span>
                                  <p className="text-xs text-gray-400 mt-1">{homeTeam?.name}</p>
                                </div>
                                <div className="w-1/2 text-center p-2 bg-black/20 rounded-lg">
                                  <span className="text-lg font-bold text-red-400">
                                    {prediction.awayExpectedGoals.toFixed(1)}
                                  </span>
                                  <p className="text-xs text-gray-400 mt-1">{awayTeam?.name}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Average Goals (Past Matches)</div>
                              <div className="flex items-center gap-4">
                                <div className="w-1/3 text-center p-2 bg-black/20 rounded-lg">
                                  <span className="text-lg font-bold text-blue-400">
                                    {teamAnalysis.averageGoals.averageHomeGoals.toFixed(1)}
                                  </span>
                                  <p className="text-xs text-gray-400 mt-1">Home</p>
                                </div>
                                <div className="w-1/3 text-center p-2 bg-black/20 rounded-lg">
                                  <span className="text-lg font-bold text-emerald-400">
                                    {teamAnalysis.averageGoals.averageTotalGoals.toFixed(1)}
                                  </span>
                                  <p className="text-xs text-gray-400 mt-1">Total</p>
                                </div>
                                <div className="w-1/3 text-center p-2 bg-black/20 rounded-lg">
                                  <span className="text-lg font-bold text-red-400">
                                    {teamAnalysis.averageGoals.averageAwayGoals.toFixed(1)}
                                  </span>
                                  <p className="text-xs text-gray-400 mt-1">Away</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Both Teams Score</div>
                              <div className="flex items-center">
                                <div className="h-2 flex-1 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-emerald-500 rounded-full" 
                                    style={{ width: `${teamAnalysis.bothTeamsScoredPercentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-emerald-400 font-medium ml-2">
                                  {Math.round(teamAnalysis.bothTeamsScoredPercentage)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right column - Predictions */}
                      <div className="space-y-6">
                        {/* Model prediction */}
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5">
                          <h3 className="text-sm font-medium text-white mb-4">
                            {activeModel === 'combined' ? 'Combined Model Prediction' : 
                            activeModel === 'randomForest' ? 'Random Forest Prediction' :
                            activeModel === 'poisson' ? 'Poisson Model Prediction' : 
                            'ELO Rating Prediction'}
                          </h3>
                          
                          <div className="text-center py-4">
                            <div className="inline-block p-4 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                              {prediction.predictedWinner === 'home' && (
                                <div className="text-blue-400">
                                  <div className="text-xl font-bold">{homeTeam?.name} Win</div>
                                  <div className="text-sm">
                                    {prediction.modelPredictions.poisson.homeGoals} - {prediction.modelPredictions.poisson.awayGoals}
                                  </div>
                                </div>
                              )}
                              {prediction.predictedWinner === 'away' && (
                                <div className="text-red-400">
                                  <div className="text-xl font-bold">{awayTeam?.name} Win</div>
                                  <div className="text-sm">
                                    {prediction.modelPredictions.poisson.homeGoals} - {prediction.modelPredictions.poisson.awayGoals}
                                  </div>
                                </div>
                              )}
                              {prediction.predictedWinner === 'draw' && (
                                <div className="text-amber-400">
                                  <div className="text-xl font-bold">Draw</div>
                                  <div className="text-sm">
                                    {prediction.modelPredictions.poisson.homeGoals} - {prediction.modelPredictions.poisson.awayGoals}
                                  </div>
                                </div>
                              )}
                              {prediction.predictedWinner === 'unknown' && (
                                <div className="text-gray-400">
                                  <div className="text-xl font-bold">Insufficient Data</div>
                                </div>
                              )}
                            </div>
                            
                            <div className="bg-gray-900/80 inline-block px-4 py-2 rounded-full">
                              <span className="text-sm text-gray-300 mr-2">Confidence:</span>
                              <span className={`text-sm font-medium ${
                                prediction.confidence > 0.7 ? 'text-emerald-400' : 
                                prediction.confidence > 0.5 ? 'text-amber-400' : 
                                'text-gray-400'
                              }`}>
                                {Math.round(prediction.confidence * 100)}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-6 space-y-2">
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Model Confidence</div>
                              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    prediction.confidence > 0.7 ? 'bg-emerald-500' : 
                                    prediction.confidence > 0.5 ? 'bg-amber-500' : 
                                    'bg-gray-500'
                                  }`}
                                  style={{ width: `${prediction.confidence * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="bg-black/20 p-2 rounded-lg text-center">
                                <div className="text-xs text-gray-400 mb-1">Model</div>
                                <div className="text-sm text-blue-400 font-medium">
                                  {activeModel === 'combined' ? 'Combined Models' : 
                                   activeModel === 'randomForest' ? 'Random Forest' :
                                   activeModel === 'poisson' ? 'Poisson' : 'ELO Rating'}
                                </div>
                              </div>
                              
                              <div className="bg-black/20 p-2 rounded-lg text-center">
                                <div className="text-xs text-gray-400 mb-1">Data Points</div>
                                <div className="text-sm text-blue-400 font-medium">
                                  {teamAnalysis.matchesCount} matches
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Previous matches */}
                        <div className="p-4 bg-gray-900/50 rounded-xl border border-white/5">
                          <h3 className="text-sm font-medium text-white mb-4">Previous Matches</h3>
                          
                          {headToHead.length === 0 ? (
                            <div className="text-center py-4">
                              <p className="text-gray-400 text-sm">No previous matches found</p>
                            </div>
                          ) : (
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                              {headToHead.map((match, index) => (
                                <div key={index} className="bg-black/20 p-3 rounded-lg">
                                  <div className="flex justify-between items-center">
                                    <span className={`text-sm ${match.winner === 'home' ? 'text-blue-400 font-medium' : 'text-gray-300'}`}>
                                      {match.homeTeam}
                                    </span>
                                    <span className="text-sm text-white mx-2 font-bold">
                                      {match.homeScore} - {match.awayScore}
                                    </span>
                                    <span className={`text-sm ${match.winner === 'away' ? 'text-red-400 font-medium' : 'text-gray-300'}`}>
                                      {match.awayTeam}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1 text-center">
                                    {new Date(match.date).toLocaleDateString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedPattern;
