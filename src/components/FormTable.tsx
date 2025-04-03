
import React from 'react';
import { Activity } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const FormTable = () => {
  const teams = [
    { team: 'Vörös Ördögök', form: ['W', 'W', 'D', 'L', 'W'] },
    { team: 'Liverpool', form: ['D', 'W', 'D', 'L', 'W'] },
    { team: 'Tottenham', form: ['D', 'D', 'D', 'W', 'L'] },
    { team: 'Manchester Kék', form: ['W', 'D', 'D', 'W', 'L'] },
    { team: 'Chelsea', form: ['D', 'W', 'W', 'W', 'W'] },
    { team: 'Everton', form: ['L', 'D', 'D', 'W', 'D'] },
    { team: 'Wolverhampton', form: ['D', 'D', 'L', 'W', 'W'] },
  ];

  const getFormColor = (result) => {
    switch (result) {
      case 'W': return 'bg-emerald-500';
      case 'D': return 'bg-amber-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white">Form</h2>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Team</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Last 5</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow 
                key={index} 
                className="border-b border-white/5 hover:bg-white/5"
              >
                <TableCell className="text-white font-medium">{team.team}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {team.form.map((result, idx) => (
                      <div 
                        key={idx} 
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${getFormColor(result)}`}
                      >
                        <span className="text-white text-xs font-bold">{result}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormTable;
