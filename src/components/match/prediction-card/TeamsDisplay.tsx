
import React from 'react';
import { Team } from '../../../data/premier-league-teams';
import { usePrediction } from '../../../hooks/usePrediction';

interface TeamsDisplayProps {
  homeTeam: Team;
  awayTeam: Team;
}

const TeamLogo = ({ team }: { team: Team }) => (
  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-lg">
    {team.logo ? (
      <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain" />
    ) : (
      <span className="text-lg font-semibold text-white">{team.name.substring(0, 2)}</span>
    )}
  </div>
);

const TeamInfo = ({ team, formIndex = 0 }: { team: Team; formIndex?: number }) => (
  <div className="text-center">
    <h3 className="text-white font-bold mb-1">{team.name}</h3>
    <div className="flex justify-center">
      <span className={`text-xs px-1.5 py-0.5 rounded ${
        formIndex > 70 ? 'bg-emerald-500/20 text-emerald-300' : 
        formIndex > 40 ? 'bg-amber-500/20 text-amber-300' : 
        'bg-gray-500/20 text-gray-300'
      }`}>
        Forma: {formIndex ? `${Math.round(formIndex)}%` : 'N/A'}
      </span>
    </div>
  </div>
);

const TeamsDisplay: React.FC<TeamsDisplayProps> = ({ homeTeam, awayTeam }) => {
  const { teamAnalysis } = usePrediction({
    homeTeam,
    awayTeam
  });
  
  return (
    <div className="flex justify-between items-center my-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      {/* Home Team */}
      <div className="flex-1 flex flex-col items-center gap-3">
        <TeamLogo team={homeTeam} />
        <TeamInfo 
          team={homeTeam} 
          formIndex={teamAnalysis?.homeFormIndex} 
        />
      </div>
      
      {/* VS Badge */}
      <div className="mx-4 py-2">
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full border border-white/10 w-10 h-10 flex items-center justify-center animate-pulse">
          <span className="text-white/80 text-sm font-bold">VS</span>
        </div>
      </div>
      
      {/* Away Team */}
      <div className="flex-1 flex flex-col items-center gap-3">
        <TeamLogo team={awayTeam} />
        <TeamInfo 
          team={awayTeam} 
          formIndex={teamAnalysis?.awayFormIndex} 
        />
      </div>
    </div>
  );
};

export default TeamsDisplay;
