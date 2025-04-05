
import React, { useState, useCallback } from 'react';
import { 
  LineChart, TrendingUp, BarChart4, PieChart, ArrowDownUp, 
  Database, Upload, FileUp, Filter, Search, FilePlus, 
  CheckCircle, AlertCircle, FileText, Download, Bell, Sliders
} from 'lucide-react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';
import {
  PatternDefinition,
  PatternDetectionResult,
  PatternMatch,
  DataSource,
  AnalysisReport,
  HalfTimeFullTimePattern
} from '../types/match';

// Sample data sources
const dataSources: DataSource[] = [
  {
    id: '1',
    name: 'Premier League 2024-2025',
    type: 'api',
    description: 'API feed for the current Premier League season',
    connection: { url: 'https://api.example.com/v1/premier-league/2024-2025' },
    lastSync: '2025-04-03T14:30:00',
    status: 'active',
    matches: 240
  },
  {
    id: '2',
    name: 'Historical Match Data',
    type: 'csv',
    description: 'Historical match data from previous 5 seasons',
    connection: { filename: 'historical_data.csv' },
    lastSync: '2025-04-01T09:15:00',
    status: 'active',
    matches: 1200
  },
  {
    id: '3',
    name: 'Betting Odds Database',
    type: 'database',
    description: 'SQL database with pre-match and in-play odds',
    connection: { host: 'db.example.com', database: 'betting_odds' },
    lastSync: '2025-04-04T08:00:00',
    status: 'active',
    matches: 960
  },
  {
    id: '4',
    name: 'Custom Observations',
    type: 'manual',
    description: 'Manually entered match observations',
    connection: null,
    lastSync: '2025-03-30T16:45:00',
    status: 'active',
    matches: 56
  }
];

// Sample predefined patterns
const predefinedPatterns: PatternDefinition[] = [
  {
    id: 'p1',
    name: 'Draw to Away Win Turnaround',
    description: 'Matches where the result changes from a draw at half-time to an away win at full-time',
    type: 'turnaround',
    conditions: [
      { id: 'c1', field: 'htHomeScore', operator: '=', value: 'htAwayScore' },
      { id: 'c2', field: 'ftAwayScore', operator: '>', value: 'ftHomeScore', logicalOperator: 'AND' }
    ],
    createdAt: '2025-03-20T10:00:00',
    lastUpdated: '2025-04-01T14:30:00',
    isActive: true
  },
  {
    id: 'p2',
    name: 'Home Team Comeback',
    description: 'Home team trailing at half-time but wins at full-time',
    type: 'turnaround',
    conditions: [
      { id: 'c3', field: 'htHomeScore', operator: '<', value: 'htAwayScore' },
      { id: 'c4', field: 'ftHomeScore', operator: '>', value: 'ftAwayScore', logicalOperator: 'AND' }
    ],
    createdAt: '2025-03-22T11:15:00',
    lastUpdated: '2025-03-22T11:15:00',
    isActive: true
  },
  {
    id: 'p3',
    name: 'High-Scoring Second Half',
    description: 'Matches with 3+ goals in the second half',
    type: 'goals',
    conditions: [
      { 
        id: 'c5', 
        field: '(ftHomeScore - htHomeScore) + (ftAwayScore - htAwayScore)', 
        operator: '>=', 
        value: 3 
      }
    ],
    createdAt: '2025-03-25T09:30:00',
    lastUpdated: '2025-04-02T16:45:00',
    isActive: true
  }
];

// Sample pattern detection results
const patternResults: PatternDetectionResult[] = [
  {
    patternId: 'p1',
    patternName: 'Draw to Away Win Turnaround',
    matches: [
      {
        matchId: 123,
        homeTeam: 'Nottingham',
        awayTeam: 'Wolverhampton',
        date: '2025-03-15',
        league: 'Premier League',
        pattern: {
          htHomeScore: 0,
          htAwayScore: 0,
          ftHomeScore: 0,
          ftAwayScore: 2
        },
        confidenceScore: 86
      },
      {
        matchId: 456,
        homeTeam: 'Brentford',
        awayTeam: 'Brighton',
        date: '2025-04-01',
        league: 'Premier League',
        pattern: {
          htHomeScore: 0,
          htAwayScore: 0,
          ftHomeScore: 0,
          ftAwayScore: 2
        },
        confidenceScore: 77
      }
    ],
    frequency: 24.6,
    confidenceScore: 81.5,
    significance: 'high',
    insights: [
      'This pattern occurs most frequently in matches where the home team has poor second-half defensive stats',
      'The away teams in these matches typically have strong counterattacking ability'
    ]
  },
  {
    patternId: 'p2',
    patternName: 'Home Team Comeback',
    matches: [
      {
        matchId: 789,
        homeTeam: 'Chelsea',
        awayTeam: 'London Ágyúk',
        date: '2025-03-20',
        league: 'Premier League',
        pattern: {
          htHomeScore: 0,
          htAwayScore: 1,
          ftHomeScore: 2,
          ftAwayScore: 1
        },
        confidenceScore: 74
      }
    ],
    frequency: 18.2,
    confidenceScore: 74,
    significance: 'medium',
    insights: [
      'Home comebacks are more common in matches where the home team makes early substitutions',
      'Teams with strong bench strength show this pattern more consistently'
    ]
  }
];

// Helper functions
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-emerald-500">Aktív</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-500">Inaktív</Badge>;
    case 'error':
      return <Badge className="bg-red-500">Hiba</Badge>;
    default:
      return <Badge className="bg-gray-500">{status}</Badge>;
  }
};

const getSourceTypeBadge = (type: string) => {
  switch (type) {
    case 'api':
      return <Badge className="bg-blue-500">API</Badge>;
    case 'csv':
      return <Badge className="bg-purple-500">CSV</Badge>;
    case 'database':
      return <Badge className="bg-amber-500">Adatbázis</Badge>;
    case 'manual':
      return <Badge className="bg-gray-500">Manuális</Badge>;
    default:
      return <Badge className="bg-gray-500">{type}</Badge>;
  }
};

const getSignificanceBadge = (significance: string) => {
  switch (significance) {
    case 'high':
      return <Badge className="bg-emerald-500">Magas jelentőség</Badge>;
    case 'medium':
      return <Badge className="bg-amber-500">Közepes jelentőség</Badge>;
    case 'low':
      return <Badge className="bg-gray-500">Alacsony jelentőség</Badge>;
    default:
      return <Badge className="bg-gray-500">{significance}</Badge>;
  }
};

const AdvancedPatternAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('patterns');
  const [selectedPattern, setSelectedPattern] = useState<PatternDefinition | null>(null);
  const [isCreatingPattern, setIsCreatingPattern] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if the device is mobile
  React.useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const handleImportData = useCallback(() => {
    toast.success("Adatimport kezdeményezve", {
      description: "Az adatok feldolgozása megkezdődött, az eredményekről értesítést kap."
    });
  }, []);
  
  const handleCreatePattern = useCallback(() => {
    setIsCreatingPattern(true);
  }, []);
  
  const handleSavePattern = useCallback(() => {
    setIsCreatingPattern(false);
    toast.success("Minta sikeresen létrehozva", {
      description: "Az új minta mostantól elérhető az elemzési rendszerben."
    });
  }, []);
  
  const handleRunAnalysis = useCallback(() => {
    toast.success("Elemzés elindítva", {
      description: "Az eredmények hamarosan elérhetők lesznek."
    });
  }, []);
  
  const handleExportReport = useCallback(() => {
    toast.success("Jelentés exportálása", {
      description: "A jelentés letöltése hamarosan elindul."
    });
  }, []);
  
  // Filtering patterns based on search term
  const filteredPatterns = predefinedPatterns.filter(pattern =>
    pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Pattern details drawer or dialog based on device
  const PatternDetailsView = ({ pattern }: { pattern: PatternDefinition }) => {
    if (isMobile) {
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="sm" onClick={() => setSelectedPattern(pattern)}>
              Részletek
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{pattern.name}</DrawerTitle>
              <DrawerDescription>{pattern.description}</DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2">
              <PatternDetailsContent pattern={pattern} />
            </div>
            <DrawerFooter>
              <Button className="w-full" onClick={handleRunAnalysis}>Elemzés indítása</Button>
              <DrawerClose asChild>
                <Button variant="outline">Bezárás</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    }
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" onClick={() => setSelectedPattern(pattern)}>
            Részletek
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{pattern.name}</DialogTitle>
            <DialogDescription>{pattern.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <PatternDetailsContent pattern={pattern} />
          </div>
          <DialogFooter>
            <Button onClick={handleRunAnalysis}>Elemzés indítása</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  // Pattern details content component
  const PatternDetailsContent = ({ pattern }: { pattern: PatternDefinition }) => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-white mb-2">Minta feltételek:</h4>
        <div className="bg-black/20 rounded-md p-3 space-y-2">
          {pattern.conditions.map((condition, idx) => (
            <div key={condition.id} className="flex items-center gap-2">
              <Badge className="bg-blue-500/20 text-blue-400">{condition.field}</Badge>
              <span className="text-gray-400">{condition.operator}</span>
              <Badge className="bg-purple-500/20 text-purple-400">{condition.value}</Badge>
              {condition.logicalOperator && (
                <span className="text-gray-400 font-bold">{condition.logicalOperator}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {patternResults.some(result => result.patternId === pattern.id) && (
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Korábbi elemzési eredmények:</h4>
          <div className="bg-black/20 rounded-md p-3">
            {patternResults
              .filter(result => result.patternId === pattern.id)
              .map(result => (
                <div key={result.patternId} className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-black/30 rounded-md">
                      <div className="text-xs text-gray-400">Gyakoriság</div>
                      <div className="text-lg font-bold text-white">{result.frequency}%</div>
                    </div>
                    <div className="p-2 bg-black/30 rounded-md">
                      <div className="text-xs text-gray-400">Megbízhatóság</div>
                      <div className="text-lg font-bold text-emerald-400">{result.confidenceScore}%</div>
                    </div>
                    <div className="p-2 bg-black/30 rounded-md">
                      <div className="text-xs text-gray-400">Jelentőség</div>
                      <div>{getSignificanceBadge(result.significance)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h5 className="text-xs font-medium text-white">Elemzési meglátások:</h5>
                    <ul className="text-xs text-gray-300 space-y-1 list-disc pl-5">
                      {result.insights.map((insight, i) => (
                        <li key={i}>{insight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Database className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-bold text-white">Minta Elemzési Rendszer</h2>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-black/20 w-full grid grid-cols-4">
          <TabsTrigger value="datasources" className="data-[state=active]:bg-blue-500/20">
            Adatforrások
          </TabsTrigger>
          <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-500/20">
            Minták
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-500/20">
            Elemzés
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-blue-500/20">
            Jelentések
          </TabsTrigger>
        </TabsList>
        
        {/* Data Sources Tab */}
        <TabsContent value="datasources" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Adatforrások</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 flex items-center gap-1"
                onClick={handleImportData}
              >
                <Upload className="h-4 w-4" />
                <span>Importálás</span>
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
              >
                <FilePlus className="h-4 w-4" />
                <span>Új adatforrás</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-900/40 rounded-lg p-4 mb-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/40">
                  <TableRow className="border-b border-white/5 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-normal">Név</TableHead>
                    <TableHead className="text-gray-400 font-normal">Típus</TableHead>
                    <TableHead className="text-gray-400 font-normal">Leírás</TableHead>
                    <TableHead className="text-gray-400 font-normal">Utolsó szinkronizálás</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Mérkőzések</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Státusz</TableHead>
                    <TableHead className="text-gray-400 font-normal"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataSources.map((source) => (
                    <TableRow key={source.id} className="border-b border-white/5 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{source.name}</TableCell>
                      <TableCell>{getSourceTypeBadge(source.type)}</TableCell>
                      <TableCell className="text-gray-300">{source.description}</TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(source.lastSync).toLocaleString('hu-HU')}
                      </TableCell>
                      <TableCell className="text-center font-medium text-white">{source.matches}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(source.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Sliders className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        {/* Patterns Tab */}
        <TabsContent value="patterns" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Minta Definíciók</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Keresés..." 
                  className="pl-8 bg-black/20 border-white/10 focus-visible:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                onClick={handleCreatePattern}
              >
                <FilePlus className="h-4 w-4" />
                <span>Új minta</span>
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-900/40 rounded-lg p-4 mb-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-black/40">
                  <TableRow className="border-b border-white/5 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-normal">Név</TableHead>
                    <TableHead className="text-gray-400 font-normal">Típus</TableHead>
                    <TableHead className="text-gray-400 font-normal">Leírás</TableHead>
                    <TableHead className="text-gray-400 font-normal">Létrehozva</TableHead>
                    <TableHead className="text-gray-400 font-normal text-center">Állapot</TableHead>
                    <TableHead className="text-gray-400 font-normal"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatterns.map((pattern) => (
                    <TableRow key={pattern.id} className="border-b border-white/5 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{pattern.name}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${pattern.type === 'turnaround' ? 'bg-purple-500/80' : 
                            pattern.type === 'scoreline' ? 'bg-blue-500/80' : 
                            pattern.type === 'goals' ? 'bg-emerald-500/80' : 'bg-gray-500/80'}
                        `}>
                          {pattern.type === 'turnaround' ? 'Fordulat' : 
                           pattern.type === 'scoreline' ? 'Eredmény' : 
                           pattern.type === 'goals' ? 'Gól' : 'Egyedi'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{pattern.description}</TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(pattern.createdAt).toLocaleDateString('hu-HU')}
                      </TableCell>
                      <TableCell className="text-center">
                        {pattern.isActive ? 
                          <Badge className="bg-emerald-500/80">Aktív</Badge> : 
                          <Badge className="bg-gray-500/80">Inaktív</Badge>
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <PatternDetailsView pattern={pattern} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Pattern Creation Dialog */}
          <Dialog open={isCreatingPattern} onOpenChange={setIsCreatingPattern}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Új minta létrehozása</DialogTitle>
                <DialogDescription>
                  Határozzon meg egy új mintát, amelyet a rendszer keresni fog a mérkőzés adatokban.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Minta neve</label>
                    <Input placeholder="pl. Második félidei fordulat" className="bg-black/20 border-white/10" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Minta leírása</label>
                    <Input placeholder="pl. Mérkőzések, ahol a hazai csapat hátrányból fordít" className="bg-black/20 border-white/10" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Minta típusa</label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20">
                        Fordulat
                      </Button>
                      <Button variant="outline" className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20">
                        Eredmény
                      </Button>
                      <Button variant="outline" className="bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20">
                        Gól
                      </Button>
                      <Button variant="outline" className="bg-gray-500/10 border-gray-500/30 hover:bg-gray-500/20">
                        Egyedi
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-white">Feltételek</label>
                      <Button variant="ghost" size="sm" className="h-8 text-blue-400">
                        + Feltétel hozzáadása
                      </Button>
                    </div>
                    
                    <div className="bg-black/20 rounded-md p-3 space-y-2">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-3">
                          <Input placeholder="Mező" className="bg-black/40 border-white/10" defaultValue="htHomeScore" />
                        </div>
                        <div className="col-span-2">
                          <Input placeholder="Operátor" className="bg-black/40 border-white/10" defaultValue="&lt;" />
                        </div>
                        <div className="col-span-3">
                          <Input placeholder="Érték" className="bg-black/40 border-white/10" defaultValue="htAwayScore" />
                        </div>
                        <div className="col-span-3">
                          <Input placeholder="Logikai operátor" className="bg-black/40 border-white/10" defaultValue="AND" />
                        </div>
                        <div className="col-span-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400">
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-3">
                          <Input placeholder="Mező" className="bg-black/40 border-white/10" defaultValue="ftHomeScore" />
                        </div>
                        <div className="col-span-2">
                          <Input placeholder="Operátor" className="bg-black/40 border-white/10" defaultValue="&gt;" />
                        </div>
                        <div className="col-span-3">
                          <Input placeholder="Érték" className="bg-black/40 border-white/10" defaultValue="ftAwayScore" />
                        </div>
                        <div className="col-span-3">
                          <Input placeholder="Logikai operátor" className="bg-black/40 border-white/10" />
                        </div>
                        <div className="col-span-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-400">
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingPattern(false)}>Mégsem</Button>
                <Button onClick={handleSavePattern}>Mentés</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        {/* Analysis Tab */}
        <TabsContent value="analysis" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Minta Elemzés</h3>
            <div className="flex gap-2">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                onClick={handleRunAnalysis}
              >
                <LineChart className="h-4 w-4" />
                <span>Elemzés indítása</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-900/40 rounded-lg p-4 border border-white/5">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-400" />
                Elemzési beállítások
              </h4>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Adatforrások</label>
                  <div className="flex flex-wrap gap-1">
                    {dataSources.map(source => (
                      <Badge key={source.id} className="bg-blue-500/20 text-blue-400">
                        {source.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Elemzendő minták</label>
                  <div className="flex flex-wrap gap-1">
                    {predefinedPatterns.map(pattern => (
                      <Badge key={pattern.id} className="bg-purple-500/20 text-purple-400">
                        {pattern.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Statisztikai konfidencia minimum</label>
                  <div className="font-medium text-white">75%</div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-gray-400">Minimum mérkőzés szám</label>
                  <div className="font-medium text-white">10</div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-2 bg-black/20 border-white/10">
                  Beállítások módosítása
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-900/40 rounded-lg p-4 border border-white/5 md:col-span-2">
              <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                <BarChart4 className="h-4 w-4 text-blue-400" />
                Elemzési eredmények
              </h4>
              
              {patternResults.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {patternResults.map(result => (
                      <div key={result.patternId} className="bg-black/20 p-3 rounded-md border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-medium">{result.patternName}</h5>
                          {getSignificanceBadge(result.significance)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div>
                            <div className="text-xs text-gray-400">Megbízhatóság</div>
                            <div className="text-lg font-bold text-emerald-400">{result.confidenceScore}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Gyakoriság</div>
                            <div className="text-lg font-bold text-blue-400">{result.frequency}%</div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-400 mb-1">Megfigyelt esetek</div>
                        <div className="text-sm font-medium text-white">{result.matches.length} mérkőzés</div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-2 text-blue-400 hover:text-blue-300 hover:bg-blue-950/20"
                        >
                          Részletek megtekintése
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
                    onClick={handleExportReport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Elemzési jelentés exportálása
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-blue-400" />
                  </div>
                  <h5 className="text-white font-medium mb-2">Még nincs elemzési eredmény</h5>
                  <p className="text-gray-400 text-sm mb-4">Indítson el egy új elemzést a minták alapján</p>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleRunAnalysis}
                  >
                    Elemzés indítása
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Additional visualizations for analysis results */}
          <div className="bg-gray-900/40 rounded-lg p-4 mb-6 border border-white/5">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <PieChart className="h-4 w-4 text-blue-400" />
              Mintaeloszlás vizualizáció
            </h4>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-gray-400">Diagramok az elemzés futtatása után jelennek meg</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Elemzési jelentések</h3>
            <Button 
              variant="outline" 
              className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 flex items-center gap-1"
              onClick={handleExportReport}
            >
              <Download className="h-4 w-4" />
              <span>Exportálás</span>
            </Button>
          </div>
          
          <div className="bg-gray-900/40 rounded-lg p-4 mb-6">
            {patternResults.length > 0 ? (
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h4 className="text-white font-medium mb-3">Összefoglaló</h4>
                  <p className="text-gray-300 text-sm">
                    Az elemzés során összesen {patternResults.length} mintát vizsgáltunk {dataSources.reduce((sum, source) => sum + source.matches, 0)} mérkőzés adatain.
                    A legjelentősebb eredményeket az alábbi jelentésben foglaltuk össze.
                  </p>
                </div>
                
                <div className="border-b border-white/10 pb-4">
                  <h4 className="text-white font-medium mb-3">Kiemelt megállapítások</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        A "Draw to Away Win Turnaround" minta 24.6%-os előfordulással jelentkezik, és 
                        81.5%-os megbízhatósággal jelezhető előre.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        A hazai pályán történő fordítások 18.2%-os gyakorisággal fordulnak elő, 
                        és erősen korrelálnak a korai cserékkel és az erős kispad jelenlétével.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        A V-Sports rendszerben a fordulati események konzisztens mintázatot mutatnak, 
                        ami megerősíti a kvázi-determinisztikus RNG feltételezést.
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-3">Javasolt intézkedések</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-md border border-white/5">
                      <h5 className="text-white font-medium mb-2 flex items-center gap-2">
                        <Bell className="h-4 w-4 text-amber-400" />
                        Fordulat figyelő riasztások beállítása
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Állítson be automatikus értesítéseket, amikor egy mérkőzés a "Draw to Away Win"
                        minta feltételeit mutatja élőben.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-black/10 border-white/10">
                        Beállítás
                      </Button>
                    </div>
                    
                    <div className="bg-black/20 p-3 rounded-md border border-white/5">
                      <h5 className="text-white font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        Részletes jelentés létrehozása
                      </h5>
                      <p className="text-gray-400 text-sm">
                        Készítsen részletes PDF jelentést az összes feltárt mintáról és azok 
                        statisztikai elemzéséről.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-black/10 border-white/10">
                        Létrehozás
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <h5 className="text-white font-medium mb-2">Még nincs elemzési jelentés</h5>
                <p className="text-gray-400 text-sm mb-4">
                  Az elemzési jelentések az elemzés futtatása után lesznek elérhetők
                </p>
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleRunAnalysis}
                >
                  Elemzés indítása
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPatternAnalysis;
