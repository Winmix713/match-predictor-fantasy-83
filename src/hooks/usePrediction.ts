
import { useState, useCallback, useMemo } from 'react';
import { Team } from '../types/match';
import { PredictionResult, TeamAnalysis } from '../types/prediction';
import { analyzeTeams, runPrediction } from '../utils/predictionService';

interface UsePredictionProps {
  homeTeam: Team | null;
  awayTeam: Team | null;
}

interface UsePredictionReturn {
  prediction: PredictionResult | null;
  teamAnalysis: TeamAnalysis | null;
  isPredicting: boolean;
  error: string | null;
  generatePrediction: () => void;
}

export const usePrediction = ({ homeTeam, awayTeam }: UsePredictionProps): UsePredictionReturn => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [teamAnalysis, setTeamAnalysis] = useState<TeamAnalysis | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canPredict = useMemo(() => {
    return !!homeTeam && !!awayTeam;
  }, [homeTeam, awayTeam]);

  const generatePrediction = useCallback(() => {
    if (!canPredict) {
      setError('Both home and away teams must be selected');
      return;
    }

    setError(null);
    setIsPredicting(true);

    try {
      // Simulate API delay
      setTimeout(() => {
        // Generate team analysis
        const analysis = analyzeTeams(homeTeam!, awayTeam!);
        setTeamAnalysis(analysis);

        // Generate prediction
        const newPrediction = runPrediction(homeTeam!.name, awayTeam!.name, []);
        setPrediction(newPrediction);

        setIsPredicting(false);
      }, 1500);
    } catch (err) {
      setError('Failed to generate prediction');
      setIsPredicting(false);
    }
  }, [homeTeam, awayTeam, canPredict]);

  return {
    prediction,
    teamAnalysis,
    isPredicting,
    error,
    generatePrediction
  };
};
