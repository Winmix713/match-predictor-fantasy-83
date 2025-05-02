
export interface MatchEvent {
  id: number;
  matchId: number;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty' | 'own_goal' | 'var_decision' | 'injury';
  teamId: number;
  playerId: number;
  playerName: string;
  assistPlayerId?: number;
  assistPlayerName?: string;
  extraInfo?: string;
}

export interface MatchStats {
  matchId: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamPossession: number;
  awayTeamPossession: number;
  homeTeamShots: number;
  awayTeamShots: number;
  homeTeamShotsOnTarget: number;
  awayTeamShotsOnTarget: number;
  homeTeamCorners: number;
  awayTeamCorners: number;
  homeTeamFouls: number;
  awayTeamFouls: number;
  homeTeamYellowCards: number;
  awayTeamYellowCards: number;
  homeTeamRedCards: number;
  awayTeamRedCards: number;
  homeTeamPasses: number;
  awayTeamPasses: number;
  homeTeamPassAccuracy: number;
  awayTeamPassAccuracy: number;
}

export interface AdvancedMatchStats {
  matchId: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamxG: number; // Expected goals
  awayTeamxG: number;
  homeTeamPPDA: number; // Passes allowed per defensive action
  awayTeamPPDA: number;
  homeTeamFieldTilt: number; // Territorial dominance
  awayTeamFieldTilt: number;
  homeTeamCounterAttacks: number;
  awayTeamCounterAttacks: number;
  homeTeamSetPieceGoals: number;
  awayTeamSetPieceGoals: number;
}

export interface PredictionModel {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  lastUpdated: string;
  matchesAnalyzed: number;
}

export interface MatchPrediction {
  matchId: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  homeWinProbability: number;
  drawProbability: number;
  awayWinProbability: number;
  predictedHomeGoals: number;
  predictedAwayGoals: number;
  confidenceScore: number;
  homeTeamFormFactor: number;
  awayTeamFormFactor: number;
  homeAdvantageImpact: number;
  headToHeadImpact: number;
  modelId: string;
}
