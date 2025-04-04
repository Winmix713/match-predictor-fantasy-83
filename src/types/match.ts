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

// New types for pattern analysis
export interface HalfTimeFullTimePattern {
  id: number;
  homeTeam: string;
  awayTeam: string;
  htHomeScore: number;
  htAwayScore: number;
  ftHomeScore: number;
  ftAwayScore: number;
  turnaround: boolean; // Indicates if the result changed from HT to FT
  turnaroundType: 'home-to-away' | 'away-to-home' | 'draw-to-home' | 'draw-to-away' | 'home-to-draw' | 'away-to-draw' | 'none';
  date: string;
  consistency: number; // 0-100% how consistent this pattern is
}

export interface TurnaroundPrediction {
  homeTeam: string;
  awayTeam: string;
  predictedOutcome: 'turnaround' | 'no-turnaround';
  confidenceScore: number; // 0-100%
  consistentPatternCount: number; // How many consistent patterns support this prediction
  odds: number; // Potential odds for this outcome
}
