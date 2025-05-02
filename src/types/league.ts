
export interface Match {
  id: number;
  date: string;
  time: string;
  home_team: string;
  away_team: string;
  home_team_id: number;
  away_team_id: number;
  ht_home_score: number;
  ht_away_score: number;
  home_score: number;
  away_score: number;
  round?: string;
  stadium?: string;
  referee?: string;
  attendance?: number;
  status: 'scheduled' | 'live' | 'completed' | 'postponed' | 'canceled';
  weather?: string;
  season: string;
  leagueId: number;
}

export interface LeagueData {
  id?: string;
  name: string;
  country: string;
  season: string;
  status?: 'completed' | 'in-progress' | 'upcoming';
  configuration?: LeagueConfiguration;
  teams?: string[];
  logo?: string;
  startDate?: string;
  endDate?: string;
}

export interface LeagueConfiguration {
  pointsForWin: number;
  pointsForDraw: number;
  pointsForLoss: number;
  matchesPerTeam?: number;
  promotionSpots?: number;
  relegationSpots?: number;
  tiebreakers?: ('goalDifference' | 'goalsFor' | 'headToHead')[];
  competitionFormat?: 'league' | 'cup' | 'group+knockout';
  groupCount?: number;
}

export interface TeamStanding {
  team: string;
  teamId: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position?: number;
  form?: ('W' | 'D' | 'L')[];
}

export interface TeamForm {
  team: string;
  teamId: number;
  form: ('W' | 'D' | 'L')[];
  history: string;
  position: number;
}

export interface LeagueStats {
  totalMatches: number;
  completedMatches: number;
  totalGoals: number;
  avgGoalsPerMatch: number;
  mostGoalsTeam: string;
  mostGoalsTeamId: number;
  leastGoalsTeam: string;
  leastGoalsTeamId: number;
  homeWinPercentage: number;
  awayWinPercentage: number;
  drawPercentage: number;
  cleanSheetPercentage: number;
  teamsWithMostCleanSheets: {
    team: string;
    teamId: number;
    cleanSheets: number;
  }[];
  avgCardsPerMatch: {
    yellow: number;
    red: number;
  };
}

export interface TopScorer {
  playerId: number;
  playerName: string;
  teamId: number;
  teamName: string;
  goals: number;
  appearances: number;
  minutesPlayed: number;
  minutesPerGoal: number;
}

export interface LeagueSeason {
  id: string;
  leagueId: string;
  season: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  winner?: string;
  winnerId?: number;
}
