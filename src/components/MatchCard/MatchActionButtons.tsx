
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Team } from '../../types/match';

interface MatchActionButtonsProps {
  homeTeam: Team | null;
  awayTeam: Team | null;
  selectedPrediction: 'home' | 'draw' | 'away' | null;
  isSubmitting: boolean;
  handlePredictMatch: () => void;
}

const MatchActionButtons: React.FC<MatchActionButtonsProps> = ({
  homeTeam,
  awayTeam,
  selectedPrediction,
  isSubmitting,
  handlePredictMatch
}) => {
  return (
    <div className="pt-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
      <button 
        className={`
          btn-primary inline-flex items-center justify-center gap-2 w-full px-4 py-3 
          rounded-lg font-medium text-sm
          ${homeTeam && awayTeam && selectedPrediction && !isSubmitting
            ? 'btn-primary'
            : 'bg-gray-800 text-gray-400 cursor-not-allowed'
          }
          relative overflow-hidden
        `}
        disabled={!homeTeam || !awayTeam || !selectedPrediction || isSubmitting}
        onClick={handlePredictMatch}
      >
        {/* Button Shine Effect */}
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full hover:animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </span>
        
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          <>
            Predict Match
            <ArrowRight className="w-4 h-4 animate-slide-in-left" />
          </>
        )}
      </button>
    </div>
  );
};

export default MatchActionButtons;
