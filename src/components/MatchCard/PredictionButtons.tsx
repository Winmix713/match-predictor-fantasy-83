
import React from 'react';
import { Check } from 'lucide-react';
import { PredictionType, Team } from '../../types/match';

interface PredictionButtonsProps {
  homeTeam: Team | null;
  awayTeam: Team | null;
  selectedPrediction: PredictionType;
  setSelectedPrediction: (type: PredictionType) => void;
}

const PredictionButtons: React.FC<PredictionButtonsProps> = ({
  homeTeam,
  awayTeam,
  selectedPrediction,
  setSelectedPrediction
}) => {
  if (!homeTeam || !awayTeam) return null;

  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      <button
        onClick={() => setSelectedPrediction('home')}
        className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
          selectedPrediction === 'home'
            ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20'
            : 'bg-white/5 text-gray-300 hover:bg-white/10'
        }`}
      >
        {selectedPrediction === 'home' ? <Check className="w-3 h-3" /> : null}
        {homeTeam.name} győzelem
      </button>
      <button
        onClick={() => setSelectedPrediction('draw')}
        className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
          selectedPrediction === 'draw'
            ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20'
            : 'bg-white/5 text-gray-300 hover:bg-white/10'
        }`}
      >
        {selectedPrediction === 'draw' ? <Check className="w-3 h-3" /> : null}
        Döntetlen
      </button>
      <button
        onClick={() => setSelectedPrediction('away')}
        className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${
          selectedPrediction === 'away'
            ? 'bg-blue-500/80 text-white shadow-lg shadow-blue-500/20'
            : 'bg-white/5 text-gray-300 hover:bg-white/10'
        }`}
      >
        {selectedPrediction === 'away' ? <Check className="w-3 h-3" /> : null}
        {awayTeam.name} győzelem
      </button>
    </div>
  );
};

export default PredictionButtons;
