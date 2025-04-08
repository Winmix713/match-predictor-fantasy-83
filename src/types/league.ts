
export interface Match {
  date: string;
  home_team: string;
  away_team: string;
  ht_home_score: number;
  ht_away_score: number;
  home_score: number;
  away_score: number;
  round?: string;
}

export interface LeagueData {
  id?: string;
  name: string;
  season: string;
  status?: 'completed' | 'in-progress';
}

export interface TeamStanding {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface TeamForm {
  team: string;
  form: ('W' | 'D' | 'L')[];
  history: string;
  position: number;
}
