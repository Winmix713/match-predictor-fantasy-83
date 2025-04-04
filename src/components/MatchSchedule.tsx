
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, Filter, ArrowUpDown, Search, Eye, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import MatchDetail from './MatchDetail';
import MatchFilters from './MatchFilters';
import MatchSorting, { SortField, SortDirection } from './MatchSorting';
import LiveMatchCard from './LiveMatchCard';
import { Badge } from "@/components/ui/badge";
import { teams } from '../data/teams';

interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  ht?: string;
  ft?: string;
  status: 'upcoming' | 'live' | 'completed';
  homeScore?: number;
  awayScore?: number;
}

const MatchSchedule = () => {
  const [matches, setMatches] = useState<Match[]>([
    { id: 1, date: '2025-04-04', time: '17:21', homeTeam: 'Wolverhampton', awayTeam: 'West Ham', ht: '2 - 0', ft: '4 - 0', status: 'completed', homeScore: 4, awayScore: 0 },
    { id: 2, date: '2025-04-04', time: '17:21', homeTeam: 'Vörös Ördögök', awayTeam: 'Nottingham', ht: '0 - 0', ft: '2 - 0', status: 'completed', homeScore: 2, awayScore: 0 },
    { id: 3, date: '2025-04-04', time: '17:21', homeTeam: 'Liverpool', awayTeam: 'Brentford', ht: '2 - 1', ft: '4 - 1', status: 'completed', homeScore: 4, awayScore: 1 },
    { id: 4, date: '2025-04-04', time: '17:21', homeTeam: 'Crystal Palace', awayTeam: 'Manchester Kék', ht: '0 - 1', ft: '2 - 1', status: 'completed', homeScore: 2, awayScore: 1 },
    { id: 5, date: '2025-04-05', time: '15:30', homeTeam: 'Brighton', awayTeam: 'Chelsea', status: 'live', homeScore: 1, awayScore: 2 },
    { id: 6, date: '2025-04-05', time: '15:30', homeTeam: 'Everton', awayTeam: 'Aston Oroszlán', status: 'live', homeScore: 0, awayScore: 0 },
    { id: 7, date: '2025-04-05', time: '18:00', homeTeam: 'London Ágyúk', awayTeam: 'Tottenham', status: 'upcoming' },
    { id: 8, date: '2025-04-06', time: '15:00', homeTeam: 'Fulham', awayTeam: 'Newcastle', status: 'upcoming' },
    { id: 9, date: '2025-04-06', time: '17:30', homeTeam: 'Manchester Kék', awayTeam: 'London Ágyúk', status: 'upcoming' },
    { id: 10, date: '2025-04-07', time: '20:00', homeTeam: 'Aston Oroszlán', awayTeam: 'Brighton', status: 'upcoming' },
    { id: 11, date: '2025-04-08', time: '19:45', homeTeam: 'Brentford', awayTeam: 'Vörös Ördögök', status: 'upcoming' },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{field: SortField; direction: SortDirection}>({
    field: 'date',
    direction: 'asc'
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...matches];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(match => 
        match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort matches
    result.sort((a, b) => {
      switch (sortConfig.field) {
        case 'date':
          const dateCompare = a.date.localeCompare(b.date);
          return sortConfig.direction === 'asc' ? dateCompare : -dateCompare;
        
        case 'league':
          // In a real app, you'd compare league names here
          return 0;
        
        case 'team':
          const aTeams = a.homeTeam + a.awayTeam;
          const bTeams = b.homeTeam + b.awayTeam;
          return sortConfig.direction === 'asc' ? 
            aTeams.localeCompare(bTeams) : 
            bTeams.localeCompare(aTeams);
        
        case 'score':
          // For upcoming matches with no score, we'll put them at the end
          if (!a.homeScore && !b.homeScore) return 0;
          if (!a.homeScore) return sortConfig.direction === 'asc' ? 1 : -1;
          if (!b.homeScore) return sortConfig.direction === 'asc' ? -1 : 1;
          
          const aTotal = a.homeScore + a.awayScore;
          const bTotal = b.homeScore + b.awayScore;
          return sortConfig.direction === 'asc' ? aTotal - bTotal : bTotal - aTotal;
        
        default:
          return 0;
      }
    });
    
    setFilteredMatches(result);
  }, [matches, searchTerm, sortConfig]);

  const handleFilterChange = (filters: any) => {
    let result = [...matches];
    
    // Date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      result = result.filter(match => {
        const matchDate = new Date(match.date);
        let isInRange = true;
        
        if (filters.dateRange.from) {
          isInRange = isInRange && matchDate >= filters.dateRange.from;
        }
        
        if (filters.dateRange.to) {
          isInRange = isInRange && matchDate <= filters.dateRange.to;
        }
        
        return isInRange;
      });
    }
    
    // Status filter
    if (filters.statuses.length > 0) {
      result = result.filter(match => filters.statuses.includes(match.status));
    }
    
    // In a real app, you'd also filter by leagues and teams here
    // This is simplified for the demo
    
    setFilteredMatches(result);
  };

  // Find team object by name
  const findTeamByName = (name: string) => {
    return teams.find(team => team.name === name) || {
      id: 0,
      name,
      logo: '',
      form: '',
      position: 0
    };
  };

  // Handle match click to show details
  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setIsDetailOpen(true);
  };
  
  // Handle sort change
  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortConfig({ field, direction });
  };

  const liveMatches = matches.filter(match => match.status === 'live');
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');
  const completedMatches = matches.filter(match => match.status === 'completed');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-500" />
          <h2 className="text-xl font-bold text-white">Match Schedule</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search teams..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-white/10 text-white w-[200px]"
            />
          </div>
        </div>
      </div>
      
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <MatchFilters onFilterChange={handleFilterChange} />
        <MatchSorting onSortChange={handleSortChange} currentSort={sortConfig} />
      </div>
      
      {/* Live Matches Section */}
      {liveMatches.length > 0 && (
        <div className="space-y-4 mt-8">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-500">LIVE</Badge>
            <h3 className="text-white font-medium">Live Matches</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((match) => (
              <LiveMatchCard 
                key={match.id}
                id={match.id}
                homeTeam={findTeamByName(match.homeTeam)}
                awayTeam={findTeamByName(match.awayTeam)}
                startTime={match.time}
                onMatchClick={() => handleMatchClick(match)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Match Table */}
      <div className="bg-black/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs">R</span>
          </div>
          <h3 className="text-white font-medium">All Matches</h3>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="text-gray-400 font-normal">Date</TableHead>
                <TableHead className="text-gray-400 font-normal">Time</TableHead>
                <TableHead className="text-gray-400 font-normal">Status</TableHead>
                <TableHead className="text-gray-400 font-normal">Home Team</TableHead>
                <TableHead className="text-gray-400 font-normal">Away Team</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">Score</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Loading state
                Array(5).fill(0).map((_, index) => (
                  <TableRow key={index} className="border-b border-white/5">
                    <TableCell><Skeleton className="h-4 w-16 bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12 bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16 bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32 bg-white/5" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32 bg-white/5" /></TableCell>
                    <TableCell className="text-center"><Skeleton className="h-4 w-12 bg-white/5 mx-auto" /></TableCell>
                    <TableCell className="text-center"><Skeleton className="h-8 w-8 bg-white/5 rounded-full mx-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <TableRow 
                    key={match.id} 
                    className={`border-b border-white/5 hover:bg-white/5 cursor-pointer ${
                      match.status === 'live' ? 'bg-red-500/5' : 
                      match.status === 'upcoming' ? 'bg-blue-500/5' : ''
                    }`}
                    onClick={() => handleMatchClick(match)}
                  >
                    <TableCell className="text-gray-300">
                      {new Date(match.date).toLocaleDateString('hu-HU')}
                    </TableCell>
                    <TableCell className="text-gray-300">{match.time}</TableCell>
                    <TableCell>
                      {match.status === 'live' && (
                        <Badge className="bg-red-500 text-white">LIVE</Badge>
                      )}
                      {match.status === 'upcoming' && (
                        <Badge className="bg-blue-500 text-white">Upcoming</Badge>
                      )}
                      {match.status === 'completed' && (
                        <Badge className="bg-green-500 text-white">Completed</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-white font-medium">{match.homeTeam}</TableCell>
                    <TableCell className="text-white font-medium">{match.awayTeam}</TableCell>
                    <TableCell className="text-center">
                      {match.status === 'upcoming' ? (
                        <span className="text-gray-400">-</span>
                      ) : match.status === 'live' ? (
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-bold">{match.homeScore}</span>
                          <span>-</span>
                          <span className="font-bold">{match.awayScore}</span>
                          <Clock className="h-3 w-3 text-red-500 ml-1 animate-pulse" />
                        </div>
                      ) : (
                        <span className={`font-medium ${match.ft?.includes('0') ? 'text-emerald-500' : 'text-white'}`}>
                          {match.ft}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMatchClick(match);
                        }}
                      >
                        <Eye className="h-4 w-4 text-gray-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                    No matches found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* Match Detail Modal */}
      {selectedMatch && (
        <MatchDetail 
          match={selectedMatch} 
          isOpen={isDetailOpen} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </div>
  );
};

export default MatchSchedule;
