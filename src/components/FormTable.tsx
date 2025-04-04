
import React from 'react';
import { Activity } from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const FormTable = () => {
  const teams = [
    { team: 'Vörös Ördögök', form: ['W', 'W', 'D', 'L', 'W'], history: 'WWDLWWDLLWWWDLWWW' },
    { team: 'Liverpool', form: ['D', 'W', 'D', 'L', 'W'], history: 'DWDLWWWDWLLWDWWDW' },
    { team: 'Tottenham', form: ['D', 'D', 'D', 'W', 'L'], history: 'DDDWLWDLLWDWWDDD' },
    { team: 'Manchester Kék', form: ['W', 'D', 'D', 'W', 'L'], history: 'WDDWLWWDWLLWDWWW' },
    { team: 'Chelsea', form: ['D', 'W', 'W', 'W', 'W'], history: 'DWWWWWWDLWWWDLWW' },
    { team: 'Everton', form: ['L', 'D', 'D', 'W', 'D'], history: 'LDDWDDWDWLLWDDWL' },
    { team: 'Wolverhampton', form: ['D', 'D', 'L', 'W', 'W'], history: 'DDLWWDWDLWLDWWW' },
    { team: 'London Ágyúk', form: ['L', 'L', 'W', 'D', 'D'], history: 'LLWDDWLLLDDWDWL' },
    { team: 'Crystal Palace', form: ['W', 'D', 'L', 'L', 'W'], history: 'WDLLWDDWLWLDLWW' },
    { team: 'Aston Oroszlán', form: ['D', 'W', 'W', 'L', 'D'], history: 'DWWLDDWLLWDDLWW' },
    { team: 'Newcastle', form: ['L', 'D', 'W', 'W', 'D'], history: 'LDWWDDLLLWDWLWW' },
    { team: 'Brentford', form: ['W', 'W', 'L', 'D', 'W'], history: 'WWLDWDWDLWLWWWL' },
    { team: 'West Ham', form: ['D', 'L', 'D', 'W', 'L'], history: 'DLDWLLLDDWDWLWL' },
    { team: 'Nottingham', form: ['L', 'W', 'D', 'D', 'L'], history: 'LWDDLLWDLWLDLWL' },
    { team: 'Fulham', form: ['W', 'D', 'L', 'W', 'D'], history: 'WDLWDWDLLWDWLWD' },
  ];

  const getFormColor = (result) => {
    switch (result) {
      case 'W': return 'bg-emerald-500';
      case 'D': return 'bg-amber-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-700';
    }
  };

  // Mintázatot kereső függvény - szimulált
  const hasPattern = (history) => {
    // Egyszerű mintadetektálás - ismétlődő WW kombinációk keresése
    return (history.match(/WW/g) || []).length >= 3;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white">Csapatok Formája és Mintázatok</h2>
      </div>
      
      <p className="text-gray-400 text-sm">
        Az alábbi táblázat a csapatok legutóbbi formáját mutatja, valamint azonosítja azokat a csapatokat, 
        amelyeknél ismétlődő mintázatokat találtunk a történelmi adatokban.
      </p>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-b border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-normal">Csapat</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Utolsó 5</TableHead>
              <TableHead className="text-gray-400 font-normal">Történelmi adatok</TableHead>
              <TableHead className="text-gray-400 font-normal text-center">Mintázat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team, index) => (
              <TableRow 
                key={index} 
                className={`border-b border-white/5 hover:bg-white/5 ${hasPattern(team.history) ? 'bg-blue-500/5' : ''}`}
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
                <TableCell className="text-gray-300">
                  <div className="flex flex-wrap gap-1">
                    {team.history.split('').map((result, idx) => (
                      <div 
                        key={idx} 
                        className={`w-4 h-4 rounded-sm flex items-center justify-center ${getFormColor(result)}`}
                      >
                        <span className="text-white text-[8px] font-bold">{result}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {hasPattern(team.history) ? (
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                      Mintázat észlelve
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs">-</span>
                  )}
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
