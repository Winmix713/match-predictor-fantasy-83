
import React from 'react';
import { MatchProps } from '../../types/match';
import { MatchProvider } from './MatchContext';
import MatchCardContent from './MatchCardContent';
import { teams } from '../../data/teams';

const MatchCard: React.FC<MatchProps> = ({ 
  id, 
  time, 
  homeTeam: initialHomeTeam, 
  awayTeam: initialAwayTeam,
  league,
  isSelectable = false 
}) => {
  return (
    <MatchProvider 
      initialHomeTeam={initialHomeTeam}
      initialAwayTeam={initialAwayTeam}
    >
      <MatchCardContent 
        id={id}
        time={time}
        league={league}
        isSelectable={isSelectable}
      />
    </MatchProvider>
  );
};

export default MatchCard;
export { teams };
