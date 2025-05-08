
import { Team } from "../types/match";
import { HistoricalMatch, MatchResult, PredictionResult, TeamAnalysis, TeamForm } from "../types/prediction";

// Mock database for historical matches - in a real app, this would come from an API
const historicalMatches: HistoricalMatch[] = [
  {
    id: '1',
    date: '2025-03-10',
    homeTeam: 'Liverpool',
    homeTeamId: 'liverpool',
    awayTeam: 'Chelsea',
    awayTeamId: 'chelsea',
    score: { home: 2, away: 1 }
  },
  {
    id: '2',
    date: '2025-02-25',
    homeTeam: 'Chelsea',
    homeTeamId: 'chelsea',
    awayTeam: 'Liverpool',
    awayTeamId: 'liverpool',
    score: { home: 2, away: 2 }
  },
  {
    id: '3',
    date: '2024-12-15',
    homeTeam: 'Liverpool',
    homeTeamId: 'liverpool',
    awayTeam: 'Manchester Kék',
    awayTeamId: 'manchester-city',
    score: { home: 3, away: 1 }
  },
  {
    id: '4',
    date: '2025-01-05',
    homeTeam: 'Chelsea',
    homeTeamId: 'chelsea',
    awayTeam: 'Vörös Ördögök',
    awayTeamId: 'manchester-united',
    score: { home: 0, away: 2 }
  },
  {
    id: '5',
    date: '2025-01-21',
    homeTeam: 'Manchester Kék',
    homeTeamId: 'manchester-city',
    awayTeam: 'Liverpool',
    awayTeamId: 'liverpool',
    score: { home: 1, away: 1 }
  }
];

// Add more mock historical matches for other Premier League teams
[...Array(50)].forEach((_, i) => {
  const randomHomeScore = Math.floor(Math.random() * 5);
  const randomAwayScore = Math.floor(Math.random() * 4);
  const teamPairs = [
    ['Vörös Ördögök', 'Manchester Kék'], 
    ['London Ágyúk', 'Tottenham'], 
    ['Chelsea', 'Aston Oroszlán'],
    ['Liverpool', 'Everton'],
    ['Wolverhampton', 'West Ham'],
    ['Brighton', 'Nottingham'],
    ['Crystal Palace', 'Brentford'],
    ['Newcastle', 'Fulham']
  ];
  const randomPair = teamPairs[Math.floor(Math.random() * teamPairs.length)];
  
  const randomDate = new Date(2024, 6 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1);
  
  historicalMatches.push({
    id: `auto-${i+6}`,
    date: randomDate.toISOString().split('T')[0],
    homeTeam: randomPair[0],
    homeTeamId: randomPair[0].toLowerCase().replace(/\s/g, '-'),
    awayTeam: randomPair[1],
    awayTeamId: randomPair[1].toLowerCase().replace(/\s/g, '-'),
    score: { home: randomHomeScore, away: randomAwayScore }
  });
});

// Filter matches specifically between two teams (case-insensitive)
export const getTeamMatches = (team1Name: string, team2Name: string): HistoricalMatch[] => {
  return historicalMatches.filter(match => {
    const matchesTeam1 = match.homeTeam.toLowerCase() === team1Name.toLowerCase() || 
                        match.awayTeam.toLowerCase() === team1Name.toLowerCase();
    const matchesTeam2 = match.homeTeam.toLowerCase() === team2Name.toLowerCase() || 
                        match.awayTeam.toLowerCase() === team2Name.toLowerCase();
    return matchesTeam1 && matchesTeam2;
  });
};

// Get all matches that involve a specific team
export const getMatchesForTeam = (teamName: string): HistoricalMatch[] => {
  return historicalMatches.filter(match => {
    return match.homeTeam.toLowerCase() === teamName.toLowerCase() || 
           match.awayTeam.toLowerCase() === teamName.toLowerCase();
  });
};

// Calculate percentage of matches where both teams scored
export const calculateBothTeamsScoredPercentage = (matches: HistoricalMatch[]): number => {
  if (matches.length === 0) return 0;

  const bothTeamsScoredCount = matches.reduce((count, match) => {
    return count + ((match.score.home > 0 && match.score.away > 0) ? 1 : 0);
  }, 0);

  return parseFloat(((bothTeamsScoredCount / matches.length) * 100).toFixed(2));
};

// Calculate average goals statistics
export const calculateAverageGoals = (matches: HistoricalMatch[]): {
  averageTotalGoals: number;
  averageHomeGoals: number;
  averageAwayGoals: number;
} => {
  if (matches.length === 0) {
    return {
      averageTotalGoals: 0,
      averageHomeGoals: 0,
      averageAwayGoals: 0
    };
  }

  const totalMatches = matches.length;
  const goals = matches.reduce((acc, match) => {
    const homeGoals = match.score?.home || 0;
    const awayGoals = match.score?.away || 0;
    
    return {
      total: acc.total + homeGoals + awayGoals,
      home: acc.home + homeGoals,
      away: acc.away + awayGoals
    };
  }, { total: 0, home: 0, away: 0 });

  return {
    averageTotalGoals: parseFloat((goals.total / totalMatches).toFixed(2)),
    averageHomeGoals: parseFloat((goals.home / totalMatches).toFixed(2)),
    averageAwayGoals: parseFloat((goals.away / totalMatches).toFixed(2))
  };
};

// Calculate team form index based on recent games
export const calculateFormIndex = (matches: HistoricalMatch[], teamName: string, recentGames: number = 5): TeamForm => {
  if (!teamName) {
    return { recentResults: [], points: 0, formIndex: 0 };
  }
  
  const teamMatches = matches.filter(match => 
    match.homeTeam.toLowerCase() === teamName.toLowerCase() || 
    match.awayTeam.toLowerCase() === teamName.toLowerCase()
  );

  if (teamMatches.length === 0) {
    return { recentResults: [], points: 0, formIndex: 0 };
  }

  // Sort matches by date (most recent first)
  const sortedMatches = [...teamMatches].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const recentMatches = sortedMatches.slice(0, Math.min(sortedMatches.length, recentGames));
  
  const results = recentMatches.map(match => {
    const isHomeTeam = match.homeTeam.toLowerCase() === teamName.toLowerCase();
    const homeScore = match.score.home;
    const awayScore = match.score.away;

    if (isHomeTeam) {
      if (homeScore > awayScore) return 'W';
      if (homeScore === awayScore) return 'D';
      return 'L';
    } else {
      if (awayScore > homeScore) return 'W';
      if (homeScore === awayScore) return 'D';
      return 'L';
    }
  }) as ('W' | 'D' | 'L')[];

  const points = results.reduce((sum, result) => {
    if (result === 'W') return sum + 3;
    if (result === 'D') return sum + 1;
    return sum;
  }, 0);

  const maxPossiblePoints = recentMatches.length * 3;
  const formIndex = maxPossiblePoints > 0 ? parseFloat(((points / maxPossiblePoints) * 100).toFixed(2)) : 0;

  return {
    recentResults: results,
    points,
    formIndex
  };
};

// Calculate head-to-head statistics between teams
export const calculateHeadToHeadStats = (matches: HistoricalMatch[], team1: string, team2: string): {
  homeWins: number;
  awayWins: number;
  draws: number;
  homeWinPercentage: number;
  awayWinPercentage: number;
  drawPercentage: number;
} => {
  const h2hMatches = getTeamMatches(team1, team2);
  
  if (h2hMatches.length === 0) {
    return {
      homeWins: 0,
      awayWins: 0,
      draws: 0,
      homeWinPercentage: 0,
      awayWinPercentage: 0,
      drawPercentage: 0
    };
  }

  const team1IsHome = (match: HistoricalMatch) => match.homeTeam.toLowerCase() === team1.toLowerCase();

  const stats = h2hMatches.reduce((acc, match) => {
    const homeScore = match.score.home;
    const awayScore = match.score.away;
    
    if (homeScore > awayScore) {
      // Home team won
      if (team1IsHome(match)) acc.team1Wins++;
      else acc.team2Wins++;
    } else if (homeScore < awayScore) {
      // Away team won
      if (!team1IsHome(match)) acc.team1Wins++;
      else acc.team2Wins++;
    } else {
      // Draw
      acc.draws++;
    }
    return acc;
  }, { team1Wins: 0, team2Wins: 0, draws: 0 });

  const totalMatches = h2hMatches.length;

  return {
    homeWins: stats.team1Wins,
    awayWins: stats.team2Wins,
    draws: stats.draws,
    homeWinPercentage: parseFloat(((stats.team1Wins / totalMatches) * 100).toFixed(2)),
    awayWinPercentage: parseFloat(((stats.team2Wins / totalMatches) * 100).toFixed(2)),
    drawPercentage: parseFloat(((stats.draws / totalMatches) * 100).toFixed(2))
  };
};

// Calculate expected goals for a team
export const calculateExpectedGoals = (teamName: string, matches: HistoricalMatch[]): number => {
  if (!teamName || matches.length === 0) return 0;

  const teamMatches = matches.filter(match => 
    match.homeTeam.toLowerCase() === teamName.toLowerCase() || 
    match.awayTeam.toLowerCase() === teamName.toLowerCase()
  );

  if (teamMatches.length === 0) return 0;

  const totalGoals = teamMatches.reduce((sum, match) => {
    const isHomeTeam = match.homeTeam.toLowerCase() === teamName.toLowerCase();
    return sum + (isHomeTeam ? match.score.home : match.score.away);
  }, 0);

  return parseFloat((totalGoals / teamMatches.length).toFixed(2));
};

// Calculate probability of both teams to score
export const calculateBothTeamsToScoreProb = (matches: HistoricalMatch[]): number => {
  if (matches.length === 0) return 0;

  const bothScoredCount = matches.filter(match => 
    match.score.home > 0 && match.score.away > 0
  ).length;

  return parseFloat(((bothScoredCount / matches.length) * 100).toFixed(2));
};

// Predict winner based on historical head-to-head matches
export const predictWinner = (homeTeam: string, awayTeam: string, matches: HistoricalMatch[]): {
  winner: 'home' | 'away' | 'draw' | 'unknown';
  confidence: number;
} => {
  if (!homeTeam || !awayTeam || matches.length === 0) {
    return { winner: 'unknown', confidence: 0 };
  }

  const h2hMatches = matches.filter(match => 
    (match.homeTeam.toLowerCase() === homeTeam.toLowerCase() && match.awayTeam.toLowerCase() === awayTeam.toLowerCase()) ||
    (match.homeTeam.toLowerCase() === awayTeam.toLowerCase() && match.awayTeam.toLowerCase() === homeTeam.toLowerCase())
  );

  if (h2hMatches.length === 0) {
    return { winner: 'unknown', confidence: 0 };
  }

  // For fair comparison, we need to count wins for teams regardless of home/away status
  const stats = h2hMatches.reduce((acc, match) => {
    const isHomeMatch = match.homeTeam.toLowerCase() === homeTeam.toLowerCase();
    const homeScore = match.score.home;
    const awayScore = match.score.away;
    
    if (isHomeMatch) {
      // This game had homeTeam at home
      if (homeScore > awayScore) acc.homeTeamWins++;
      else if (homeScore < awayScore) acc.awayTeamWins++;
      else acc.draws++;
    } else {
      // This game had homeTeam as away team
      if (awayScore > homeScore) acc.homeTeamWins++;
      else if (awayScore < homeScore) acc.awayTeamWins++;
      else acc.draws++;
    }
    return acc;
  }, { homeTeamWins: 0, awayTeamWins: 0, draws: 0 });

  const totalMatches = h2hMatches.length;
  
  // Determine winner
  if (stats.homeTeamWins > stats.awayTeamWins && stats.homeTeamWins > stats.draws) {
    return { winner: 'home', confidence: parseFloat((stats.homeTeamWins / totalMatches).toFixed(2)) };
  } else if (stats.awayTeamWins > stats.homeTeamWins && stats.awayTeamWins > stats.draws) {
    return { winner: 'away', confidence: parseFloat((stats.awayTeamWins / totalMatches).toFixed(2)) };
  } else if (stats.draws >= stats.homeTeamWins && stats.draws >= stats.awayTeamWins) {
    return { winner: 'draw', confidence: parseFloat((stats.draws / totalMatches).toFixed(2)) };
  } else {
    // This should not happen, but just in case
    return { winner: 'unknown', confidence: 0 };
  }
};

// Calculate win probability based on winner prediction and outcome type
export const calculateWinProbability = (
  winnerPrediction: { winner: 'home' | 'away' | 'draw' | 'unknown'; confidence: number },
  outcomeType: 'home' | 'away' | 'draw'
): number => {
  if (winnerPrediction.winner === 'unknown') {
    // Equal probability for all outcomes when unknown
    return parseFloat((1/3).toFixed(2));
  }
  
  if (winnerPrediction.winner === outcomeType) {
    return winnerPrediction.confidence;
  }
  
  // Distribute remaining probability among non-predicted outcomes
  const remainingProb = 1 - winnerPrediction.confidence;
  const nonPredictedOutcomes = 2; // There are always 2 other outcomes (home, away, draw)
  return parseFloat((remainingProb / nonPredictedOutcomes).toFixed(2));
};

// Run match prediction analysis
export const runPrediction = (homeTeam: string, awayTeam: string, matches: HistoricalMatch[]): PredictionResult => {
  const allMatches = [...historicalMatches, ...matches];
  
  const homeTeamMatches = getMatchesForTeam(homeTeam);
  const awayTeamMatches = getMatchesForTeam(awayTeam);
  const h2hMatches = getTeamMatches(homeTeam, awayTeam);
  
  const homeExpectedGoals = calculateExpectedGoals(homeTeam, homeTeamMatches);
  const awayExpectedGoals = calculateExpectedGoals(awayTeam, awayTeamMatches);
  const bothTeamsToScoreProb = calculateBothTeamsToScoreProb([...homeTeamMatches, ...awayTeamMatches]);
  const winnerPrediction = predictWinner(homeTeam, awayTeam, allMatches);
  
  // Apply a home team advantage (approximately 20% boost to expected goals)
  const adjustedHomeExpectedGoals = parseFloat((homeExpectedGoals * 1.2).toFixed(2));

  return {
    homeExpectedGoals: adjustedHomeExpectedGoals,
    awayExpectedGoals,
    bothTeamsToScoreProb,
    predictedWinner: winnerPrediction.winner,
    confidence: winnerPrediction.confidence,
    modelPredictions: {
      randomForest: winnerPrediction.winner === 'unknown' ? 
        'insufficient_data' : `${winnerPrediction.winner}_win`,
      poisson: {
        homeGoals: Math.round(adjustedHomeExpectedGoals),
        awayGoals: Math.round(awayExpectedGoals)
      },
      elo: {
        homeWinProb: calculateWinProbability(winnerPrediction, 'home'),
        drawProb: calculateWinProbability(winnerPrediction, 'draw'),
        awayWinProb: calculateWinProbability(winnerPrediction, 'away')
      }
    }
  };
};

// Team analysis combining multiple stats
export const analyzeTeams = (homeTeam: Team, awayTeam: Team): TeamAnalysis => {
  const h2hMatches = getTeamMatches(homeTeam.name, awayTeam.name);
  const headToHeadStats = calculateHeadToHeadStats(h2hMatches, homeTeam.name, awayTeam.name);
  const homeTeamMatches = getMatchesForTeam(homeTeam.name);
  const awayTeamMatches = getMatchesForTeam(awayTeam.name);
  
  return {
    homeTeam,
    awayTeam,
    matchesCount: h2hMatches.length,
    bothTeamsScoredPercentage: calculateBothTeamsScoredPercentage(h2hMatches),
    averageGoals: calculateAverageGoals(h2hMatches),
    homeFormIndex: calculateFormIndex(homeTeamMatches, homeTeam.name).formIndex,
    awayFormIndex: calculateFormIndex(awayTeamMatches, awayTeam.name).formIndex,
    headToHeadStats
  };
};
