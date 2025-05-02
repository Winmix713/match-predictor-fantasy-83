
export interface Player {
  id: number;
  name: string;
  position: string;
  teamId: number;
  teamName: string;
  nationality: string;
  age: number;
  height?: number; // in cm
  weight?: number; // in kg
  jerseyNumber?: number;
  preferredFoot?: 'left' | 'right' | 'both';
  image?: string;
}

export interface PlayerStats {
  playerId: number;
  appearances: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  shotsTotal: number;
  shotsOnTarget: number;
  passesTotal: number;
  passesCompleted: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  duelsWon: number;
  duelsTotal: number;
  dribbleSuccess: number;
  dribblesAttempted: number;
  foulsDrawn: number;
  foulsCommitted: number;
  season: string;
  competitionId: number;
}

export interface PlayerForm {
  playerId: number;
  matchId: number;
  date: string;
  rating: number; // 1-10 rating
  minutesPlayed: number;
  goals: number;
  assists: number;
  teamScore: number;
  opponentScore: number;
  opponentId: number;
  opponentName: string;
  isHome: boolean;
  result: 'W' | 'D' | 'L';
}

export interface PlayerComparison {
  categories: string[];
  player1Data: number[];
  player2Data: number[];
  player1Id: number;
  player2Id: number;
  player1Name: string;
  player2Name: string;
}
