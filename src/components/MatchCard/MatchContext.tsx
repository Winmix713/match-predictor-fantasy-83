
import React, { createContext, useState, useContext } from 'react';
import { Team, PredictionType, HeadToHead } from '../../types/match';
import { toast } from 'sonner'; // Import toast directly
import { generateHeadToHead } from '../../data/teams'; // Import directly

interface MatchContextType {
  homeTeam: Team | null;
  awayTeam: Team | null;
  selectedPrediction: PredictionType;
  isHomeDropdownOpen: boolean;
  isAwayDropdownOpen: boolean;
  isSubmitting: boolean;
  isStatsExpanded: boolean;
  headToHead: HeadToHead[];
  setHomeTeam: (team: Team | null) => void;
  setAwayTeam: (team: Team | null) => void;
  setSelectedPrediction: (prediction: PredictionType) => void;
  toggleHomeDropdown: () => void;
  toggleAwayDropdown: () => void;
  toggleStatsExpanded: () => void;
  handlePredictMatch: () => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const useMatchContext = () => {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatchContext must be used within a MatchProvider');
  }
  return context;
};

interface MatchProviderProps {
  initialHomeTeam: Team | null;
  initialAwayTeam: Team | null;
  children: React.ReactNode;
  league?: any;
}

export const MatchProvider: React.FC<MatchProviderProps> = ({
  initialHomeTeam,
  initialAwayTeam,
  children
}) => {
  const [homeTeam, setHomeTeam] = useState<Team | null>(initialHomeTeam);
  const [awayTeam, setAwayTeam] = useState<Team | null>(initialAwayTeam);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionType>(null);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isAwayDropdownOpen, setIsAwayDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatsExpanded, setIsStatsExpanded] = useState(false);
  const [headToHead, setHeadToHead] = useState<HeadToHead[]>([]);

  // Calculate head-to-head data
  React.useEffect(() => {
    if (homeTeam && awayTeam) {
      // Direct import now, not using require
      setHeadToHead(generateHeadToHead(homeTeam.id, awayTeam.id));
    }
  }, [homeTeam, awayTeam]);

  const toggleHomeDropdown = () => {
    setIsHomeDropdownOpen(prev => !prev);
    setIsAwayDropdownOpen(false);
  };

  const toggleAwayDropdown = () => {
    setIsAwayDropdownOpen(prev => !prev);
    setIsHomeDropdownOpen(false);
  };

  const toggleStatsExpanded = () => {
    setIsStatsExpanded(prev => !prev);
  };

  const handlePredictMatch = async () => {
    if (!homeTeam || !awayTeam || !selectedPrediction) return;
    
    setIsSubmitting(true);
    
    try {
      // Direct import now, not using require
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let resultMessage = '';
      switch (selectedPrediction) {
        case 'home':
          resultMessage = `Prediction submitted: ${homeTeam.name} to win`;
          break;
        case 'draw':
          resultMessage = `Prediction submitted: Draw between ${homeTeam.name} and ${awayTeam.name}`;
          break;
        case 'away':
          resultMessage = `Prediction submitted: ${awayTeam.name} to win`;
          break;
      }
      
      toast.success(resultMessage, {
        duration: 3000,
        className: 'bg-green-500/90'
      });
    } catch (error) {
      toast.error('Failed to submit prediction. Please try again.', {
        duration: 4000,
        className: 'bg-red-500/90'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    homeTeam,
    awayTeam,
    selectedPrediction,
    isHomeDropdownOpen,
    isAwayDropdownOpen,
    isSubmitting,
    isStatsExpanded,
    headToHead,
    setHomeTeam,
    setAwayTeam,
    setSelectedPrediction,
    toggleHomeDropdown,
    toggleAwayDropdown,
    toggleStatsExpanded,
    handlePredictMatch,
  };

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  );
};
