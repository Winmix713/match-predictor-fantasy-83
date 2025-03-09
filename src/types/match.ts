
export interface Team {
  id: number;
  name: string;
  logo: string;
  form: string;
  position: number;
  // Bővített statisztikák
  stats?: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}

export interface League {
  id: number;
  name: string;
  logo: string;
  country: string;
}

export interface HeadToHead {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  winner: 'home' | 'away' | 'draw';
}

export type PredictionType = 'home' | 'draw' | 'away' | null;

export interface MatchProps {
  id: number;
  time: string;
  homeTeam: Team | null;
  awayTeam: Team | null;
  isSelectable?: boolean;
  league?: League;
  headToHead?: HeadToHead[];
}
