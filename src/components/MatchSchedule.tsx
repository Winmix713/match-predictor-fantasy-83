
import React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const MatchSchedule = () => {
  const matches = [
    { date: '17:21', homeTeam: 'Wolverhampton', awayTeam: 'West Ham', ht: '2 - 0', ft: '4 - 0' },
    { date: '17:21', homeTeam: 'Vörös Ördögök', awayTeam: 'Nottingham', ht: '0 - 0', ft: '2 - 0' },
    { date: '17:21', homeTeam: 'Liverpool', awayTeam: 'Brentford', ht: '2 - 1', ft: '4 - 1' },
    { date: '17:21', homeTeam: 'Crystal Palace', awayTeam: 'Manchester Kék', ht: '0 - 1', ft: '2 - 1' },
    { date: '17:21', homeTeam: 'Brighton', awayTeam: 'Chelsea', ht: '1 - 3', ft: '2 - 4' },
    { date: '17:21', homeTeam: 'Everton', awayTeam: 'Aston Oroszlán', ht: '0 - 0', ft: '1 - 0' },
    { date: '17:21', homeTeam: 'London Ágyúk', awayTeam: 'Tottenham', ht: '0 - 1', ft: '0 - 1' },
    { date: '17:21', homeTeam: 'Fulham', awayTeam: 'Newcastle', ht: '2 - 1', ft: '2 - 1' },
    { date: '17:29', homeTeam: 'Manchester Kék', awayTeam: 'London Ágyúk', ht: '1 - 1', ft: '4 - 1' },
    { date: '17:29', homeTeam: 'Aston Oroszlán', awayTeam: 'Brighton', ht: '0 - 0', ft: '1 - 0' },
    { date: '17:29', homeTeam: 'Brentford', awayTeam: 'Vörös Ördögök', ht: '0 - 0', ft: '0 - 1' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-emerald-500" />
          <h2 className="text-xl font-bold text-white">Match Schedule</h2>
        </div>
        <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
          <span>View by Rounds</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="bg-black/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-xs">R</span>
          </div>
          <h3 className="text-white font-medium">Round Unknown</h3>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-b border-white/5 hover:bg-transparent">
                <TableHead className="text-gray-400 font-normal">Date</TableHead>
                <TableHead className="text-gray-400 font-normal">Home Team</TableHead>
                <TableHead className="text-gray-400 font-normal">Away Team</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">HT</TableHead>
                <TableHead className="text-gray-400 font-normal text-center">FT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match, index) => (
                <TableRow 
                  key={index} 
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <TableCell className="text-gray-300">{match.date}</TableCell>
                  <TableCell className="text-white font-medium">{match.homeTeam}</TableCell>
                  <TableCell className="text-white font-medium">{match.awayTeam}</TableCell>
                  <TableCell className="text-center text-gray-300">{match.ht}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${match.ft.includes('0') ? 'text-emerald-500' : 'text-white'}`}>
                      {match.ft}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MatchSchedule;
