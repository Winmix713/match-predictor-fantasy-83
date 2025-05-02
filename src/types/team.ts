
export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  country: string;
  founded: number;
  venueId?: number;
  venueName?: string;
  venueCapacity?: number;
  leagueId: number;
  leagueName: string;
  coach?: string;
  formation?: string;
}

export interface TeamStats {
  teamId: number;
  season: string;
  leagueId: number;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  cleanSheets: number;
  yellowCards: number;
  redCards: number;
  avgPossession: number;
  avgShotsTotal: number;
  avgShotsOnTarget: number;
  avgPassesTotal: number;
  avgPassAccuracy: number;
}

export interface TeamForm {
  teamId: number;
  recentMatches: {
    matchId: number;
    date: string;
    opponent: string;
    isHome: boolean;
    result: 'W' | 'D' | 'L';
    score: string;
  }[];
  last5Form: ('W' | 'D' | 'L')[];
  winningStreak: number;
  unbeatenRun: number;
}

export interface HeadToHeadStats {
  team1Id: number;
  team2Id: number;
  team1Name: string;
  team2Name: string;
  totalMatches: number;
  team1Wins: number;
  team2Wins: number;
  draws: number;
  team1GoalsFor: number;
  team2GoalsFor: number;
  lastMatches: Array<{
    date: string;
    competition: string;
    team1Score: number;
    team2Score: number;
    venue: string;
  }>;
  winningStreakTeam1: number;
  winningStreakTeam2: number;
}
