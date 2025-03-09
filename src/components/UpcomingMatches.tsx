
import React from 'react';
import MatchCard, { Team, teams } from './MatchCard';
import { Calendar, TrendingUp } from 'lucide-react';

// Generate mock matches
const generateMockMatches = () => {
  const mockMatches = [];
  const times = ['14:00', '16:30', '19:00', '21:30'];
  
  const getRandomTeams = (): [Team, Team] => {
    const allTeams = [...teams];
    const shuffledTeams = allTeams.sort(() => 0.5 - Math.random());
    return [shuffledTeams[0], shuffledTeams[1]];
  };
  
  // Generate matches with predetermined teams
  mockMatches.push({
    id: 1,
    time: '19:00',
    homeTeam: teams[0], // Arsenal
    awayTeam: teams[3], // Chelsea
    isSelectable: true,
  });
  
  mockMatches.push({
    id: 2,
    time: '16:30',
    homeTeam: teams[2], // Brighton
    awayTeam: teams[1], // Aston Villa
    isSelectable: true,
  });
  
  // Add a match with empty teams
  mockMatches.push({
    id: 3,
    time: '21:00',
    homeTeam: null,
    awayTeam: null,
    isSelectable: true,
  });
  
  return mockMatches;
};

const UpcomingMatches = () => {
  const matches = generateMockMatches();
  
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-black/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                Today's Featured Matches
              </h2>
            </div>
            <p className="text-gray-400">Select teams and make your predictions</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-blue-500/10 rounded-lg px-4 py-2 border border-blue-500/20">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">
              <strong className="text-blue-300">2,547</strong> predictions made today
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {matches.map(match => (
            <MatchCard 
              key={match.id}
              id={match.id}
              time={match.time}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              isSelectable={match.isSelectable}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
