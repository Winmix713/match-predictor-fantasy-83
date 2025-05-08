
import { Team } from './match';

export interface MatchResult {
  home: number;
  away: number;
}

export interface HistoricalMatch {
  id: string;
  date: string;
  homeTeam: string;
  homeTeamId: string;
  awayTeam: string;
  awayTeamId: string;
  score: MatchResult;
  league?: string;
}

export interface TeamForm {
  recentResults: ('W' | 'D' | 'L')[];
  points: number;
  formIndex: number;
}

export interface TeamAnalysis {
  homeTeam: Team;
  awayTeam: Team;
  matchesCount: number;
  bothTeamsScoredPercentage: number;
  averageGoals: {
    averageTotalGoals: number;
    averageHomeGoals: number;
    averageAwayGoals: number;
  };
  homeFormIndex: number;
  awayFormIndex: number;
  headToHeadStats: {
    homeWins: number;
    awayWins: number;
    draws: number;
    homeWinPercentage: number;
    awayWinPercentage: number;
    drawPercentage: number;
  };
}

export interface PredictionResult {
  homeExpectedGoals: number;
  awayExpectedGoals: number;
  bothTeamsToScoreProb: number;
  predictedWinner: 'home' | 'away' | 'draw' | 'unknown';
  confidence: number;
  modelPredictions: {
    randomForest: string;
    poisson: {
      homeGoals: number;
      awayGoals: number;
    };
    elo: {
      homeWinProb: number;
      drawProb: number;
      awayWinProb: number;
    };
  };
}

export interface ModelWeights {
  randomForest: number;
  poisson: number;
  elo: number;
}

export type PredictionModel = 'randomForest' | 'poisson' | 'elo';
