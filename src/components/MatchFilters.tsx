
import React, { useState } from 'react';
import { CalendarIcon, Filter, X, Check, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

// Mock data - would come from your data source
const leagues = [
  { id: 1, name: 'Premier League', country: 'England' },
  { id: 2, name: 'La Liga', country: 'Spain' },
  { id: 3, name: 'Bundesliga', country: 'Germany' },
  { id: 4, name: 'Serie A', country: 'Italy' },
  { id: 5, name: 'Ligue 1', country: 'France' },
];

const teams = [
  { id: 1, name: 'Vörös Ördögök', league: 'Premier League' },
  { id: 2, name: 'Liverpool', league: 'Premier League' },
  { id: 3, name: 'Manchester Kék', league: 'Premier League' },
  { id: 4, name: 'London Ágyúk', league: 'Premier League' },
  { id: 5, name: 'Real Madrid', league: 'La Liga' },
  { id: 6, name: 'Barcelona', league: 'La Liga' },
  { id: 7, name: 'Bayern Munich', league: 'Bundesliga' },
  { id: 8, name: 'Juventus', league: 'Serie A' },
  { id: 9, name: 'PSG', league: 'Ligue 1' },
];

const statuses = [
  { id: 'upcoming', name: 'Upcoming' },
  { id: 'live', name: 'Live' },
  { id: 'completed', name: 'Completed' },
];

interface MatchFiltersProps {
  onFilterChange: (filters: {
    dateRange: { from: Date | null; to: Date | null };
    leagues: number[];
    teams: number[];
    statuses: string[];
  }) => void;
}

const MatchFilters: React.FC<MatchFiltersProps> = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [selectedLeagues, setSelectedLeagues] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isLeagueOpen, setIsLeagueOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const handleDateSelect = (range: { from: Date | null; to: Date | null }) => {
    setDateRange(range);
    onFilterChange({
      dateRange: range,
      leagues: selectedLeagues,
      teams: selectedTeams,
      statuses: selectedStatuses
    });
  };

  const toggleLeague = (leagueId: number) => {
    const updatedLeagues = selectedLeagues.includes(leagueId)
      ? selectedLeagues.filter(id => id !== leagueId)
      : [...selectedLeagues, leagueId];
    
    setSelectedLeagues(updatedLeagues);
    onFilterChange({
      dateRange,
      leagues: updatedLeagues,
      teams: selectedTeams,
      statuses: selectedStatuses
    });
  };

  const toggleTeam = (teamId: number) => {
    const updatedTeams = selectedTeams.includes(teamId)
      ? selectedTeams.filter(id => id !== teamId)
      : [...selectedTeams, teamId];
    
    setSelectedTeams(updatedTeams);
    onFilterChange({
      dateRange,
      leagues: selectedLeagues,
      teams: updatedTeams,
      statuses: selectedStatuses
    });
  };

  const toggleStatus = (statusId: string) => {
    const updatedStatuses = selectedStatuses.includes(statusId)
      ? selectedStatuses.filter(id => id !== statusId)
      : [...selectedStatuses, statusId];
    
    setSelectedStatuses(updatedStatuses);
    onFilterChange({
      dateRange,
      leagues: selectedLeagues,
      teams: selectedTeams,
      statuses: updatedStatuses
    });
  };

  const clearFilters = () => {
    setDateRange({ from: null, to: null });
    setSelectedLeagues([]);
    setSelectedTeams([]);
    setSelectedStatuses([]);
    onFilterChange({
      dateRange: { from: null, to: null },
      leagues: [],
      teams: [],
      statuses: []
    });
  };

  const hasFilters = dateRange.from || dateRange.to || selectedLeagues.length > 0 || selectedTeams.length > 0 || selectedStatuses.length > 0;

  const getSelectedCount = () => {
    let count = 0;
    if (dateRange.from || dateRange.to) count++;
    if (selectedLeagues.length > 0) count++;
    if (selectedTeams.length > 0) count++;
    if (selectedStatuses.length > 0) count++;
    return count;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4">
      {/* Date Range Filter */}
      <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={`bg-black/20 border-white/10 text-white flex items-center gap-2 ${dateRange.from ? 'border-blue-500' : ''}`}
          >
            <CalendarIcon className="h-4 w-4" />
            {dateRange.from ? (
              <span>
                {format(dateRange.from, 'PP')} 
                {dateRange.to ? ` - ${format(dateRange.to, 'PP')}` : ''}
              </span>
            ) : (
              <span>Date Range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-card border-white/10">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateSelect}
            initialFocus
            className="bg-transparent border-none"
          />
        </PopoverContent>
      </Popover>

      {/* League Filter */}
      <Popover open={isLeagueOpen} onOpenChange={setIsLeagueOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={`bg-black/20 border-white/10 text-white flex items-center gap-2 ${selectedLeagues.length > 0 ? 'border-blue-500' : ''}`}
          >
            <Filter className="h-4 w-4" />
            <span>Leagues</span>
            {selectedLeagues.length > 0 && (
              <Badge className="ml-1 h-5 rounded-full bg-blue-500 text-[10px] px-2 py-0">
                {selectedLeagues.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0 bg-card border-white/10">
          <Command>
            <CommandInput placeholder="Search leagues..." className="h-9 border-white/10" />
            <CommandList>
              <CommandEmpty>No leagues found.</CommandEmpty>
              <CommandGroup>
                {leagues.map(league => (
                  <CommandItem
                    key={league.id}
                    onSelect={() => toggleLeague(league.id)}
                    className="flex items-center gap-2 cursor-pointer hover:bg-white/5"
                  >
                    <Checkbox
                      id={`league-${league.id}`}
                      checked={selectedLeagues.includes(league.id)}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <span>{league.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">{league.country}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Team Filter */}
      <Popover open={isTeamOpen} onOpenChange={setIsTeamOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={`bg-black/20 border-white/10 text-white flex items-center gap-2 ${selectedTeams.length > 0 ? 'border-blue-500' : ''}`}
          >
            <Filter className="h-4 w-4" />
            <span>Teams</span>
            {selectedTeams.length > 0 && (
              <Badge className="ml-1 h-5 rounded-full bg-blue-500 text-[10px] px-2 py-0">
                {selectedTeams.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0 bg-card border-white/10">
          <Command>
            <CommandInput placeholder="Search teams..." className="h-9 border-white/10" />
            <CommandList>
              <CommandEmpty>No teams found.</CommandEmpty>
              <CommandGroup>
                {teams.map(team => (
                  <CommandItem
                    key={team.id}
                    onSelect={() => toggleTeam(team.id)}
                    className="flex items-center gap-2 cursor-pointer hover:bg-white/5"
                  >
                    <Checkbox
                      id={`team-${team.id}`}
                      checked={selectedTeams.includes(team.id)}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <span>{team.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">{team.league}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Status Filter */}
      <Popover open={isStatusOpen} onOpenChange={setIsStatusOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={`bg-black/20 border-white/10 text-white flex items-center gap-2 ${selectedStatuses.length > 0 ? 'border-blue-500' : ''}`}
          >
            <Filter className="h-4 w-4" />
            <span>Status</span>
            {selectedStatuses.length > 0 && (
              <Badge className="ml-1 h-5 rounded-full bg-blue-500 text-[10px] px-2 py-0">
                {selectedStatuses.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0 bg-card border-white/10">
          <Command>
            <CommandList>
              <CommandGroup>
                {statuses.map(status => (
                  <CommandItem
                    key={status.id}
                    onSelect={() => toggleStatus(status.id)}
                    className="flex items-center gap-2 cursor-pointer hover:bg-white/5"
                  >
                    <Checkbox
                      id={`status-${status.id}`}
                      checked={selectedStatuses.includes(status.id)}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <span>{status.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Clear Filters Button */}
      {hasFilters && (
        <Button 
          variant="ghost" 
          onClick={clearFilters}
          className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
        >
          <X className="h-4 w-4 mr-2" />
          Clear ({getSelectedCount()})
        </Button>
      )}
    </div>
  );
};

export default MatchFilters;
