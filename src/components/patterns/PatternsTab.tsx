
// src/components/Patterns/PatternsTab.tsx (or your chosen path)
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Use Textarea for description
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Use Select for type
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Search, FilePlus, AlertCircle, Check, X, Trash2, PlusCircle } from 'lucide-react';
import { PatternDefinition, PatternCondition } from '../../types/match'; // Assuming types are in ../../types
import { toast } from 'sonner';
import PatternDetailsView from './PatternDetailsView';
import { Switch } from "@/components/ui/switch"; // Use Switch for isActive

interface PatternsTabProps {
  patterns: PatternDefinition[];
  isMobile: boolean;
  // Handler to trigger a general analysis (might use selected patterns)
  handleRunGeneralAnalysis?: () => void;
  // Modified to match what AdvancedPatternAnalysis passes
  handleRunAnalysis?: () => void;
  isLoading?: boolean;
  // Handler to add a new pattern
  handleAddPattern?: (newPatternData: Omit<PatternDefinition, 'id' | 'createdAt' | 'lastUpdated'>) => Promise<void>; // Make async for potential API call
  // Handler to update an existing pattern (Optional)
  handleUpdatePattern?: (updatedPatternData: PatternDefinition) => Promise<void>;
  // Handler to delete a pattern (Optional)
  handleDeletePattern?: (patternId: string) => Promise<void>;
}

// Define pattern types for selection - removed 'streak' to match the type definition
const PATTERN_TYPES = ['turnaround', 'scoreline', 'goals', 'custom'] as const;
type PatternTypeTuple = typeof PATTERN_TYPES;
type PatternType = PatternTypeTuple[number];

// Helper function to get pattern type information
const getPatternTypeInfo = (type: string) => {
  switch (type) {
    case 'turnaround':
      return {
        label: 'Turnaround',
        badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      };
    case 'scoreline':
      return {
        label: 'Scoreline',
        badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      };
    case 'goals':
      return {
        label: 'Goals',
        badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
      };
    case 'custom':
    default:
      return {
        label: 'Custom',
        badgeClass: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      };
  }
};

// Initial state for a new pattern condition
const initialCondition: Omit<PatternCondition, 'id'> = {
    field: '', operator: '=', value: '', logicalOperator: 'AND'
};

/**
 * Displays, manages, and allows creation of pattern definitions.
 */
const PatternsTab: React.FC<PatternsTabProps> = ({
  patterns,
  isMobile,
  handleRunGeneralAnalysis,
  handleRunAnalysis, // Adding this prop
  handleAddPattern = async () => { toast.error("Add pattern functionality not implemented"); },
  // Use either handleRunGeneralAnalysis or handleRunAnalysis based on availability
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModifyOpen, setIsCreateModifyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for the new pattern form
  const [newPatternName, setNewPatternName] = useState('');
  const [newPatternDesc, setNewPatternDesc] = useState('');
  const [newPatternType, setNewPatternType] = useState<PatternType>('custom');
  const [newPatternIsActive, setNewPatternIsActive] = useState(true);
  const [newPatternConditions, setNewPatternConditions] = useState<Omit<PatternCondition, 'id'>[]>([initialCondition]);

  // Memoized filtering for performance
  const filteredPatterns = useMemo(() => {
    if (!searchTerm) return patterns;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return patterns.filter(pattern =>
      pattern.name.toLowerCase().includes(lowerSearchTerm) ||
      pattern.description?.toLowerCase().includes(lowerSearchTerm) ||
      pattern.type.toLowerCase().includes(lowerSearchTerm)
    );
  }, [patterns, searchTerm]);

  const resetForm = () => {
      setNewPatternName('');
      setNewPatternDesc('');
      setNewPatternType('custom');
      setNewPatternIsActive(true);
      setNewPatternConditions([initialCondition]);
  };

  const handleOpenCreateDialog = () => {
    resetForm();
    setIsCreateModifyOpen(true);
  };

  const handleAddCondition = () => {
    setNewPatternConditions(prev => [...prev, { ...initialCondition, logicalOperator: prev.length > 0 ? 'AND' : undefined }]);
  };

  const handleRemoveCondition = (index: number) => {
    setNewPatternConditions(prev => {
        const updated = prev.filter((_, i) => i !== index);
        // Reset logical operator for the first condition if it exists
        if(updated.length > 0) {
            updated[0].logicalOperator = undefined;
        }
        // Ensure at least one condition row remains if trying to remove the last one
        return updated.length === 0 ? [initialCondition] : updated;
    });
  };

  const handleConditionChange = (index: number, field: keyof PatternCondition, value: string) => {
     setNewPatternConditions(prev =>
        prev.map((cond, i) =>
            i === index ? { ...cond, [field]: value } : cond
        )
    );
  };


  const handleSavePattern = async () => {
    // Basic Validation
    if (!newPatternName.trim()) {
        toast.error("Hiba", { description: "A minta neve kötelező."});
        return;
    }
    if (newPatternConditions.some(c => !c.field.trim() || !c.operator.trim())) {
         toast.error("Hiba", { description: "Minden feltétel mező, operátor és érték kitöltése kötelező."});
         return;
    }

    const patternData: Omit<PatternDefinition, 'id' | 'createdAt' | 'lastUpdated'> = {
      name: newPatternName.trim(),
      description: newPatternDesc.trim(),
      type: newPatternType,
      conditions: newPatternConditions.map((c, index) => ({
          ...c,
          id: `temp_c_${index}`, // Temporary ID, backend should generate real ones
          // Ensure first condition has no logical operator
          logicalOperator: index === 0 ? undefined : c.logicalOperator
      })),
      isActive: newPatternIsActive,
    };

    setIsSubmitting(true);
    try {
        await handleAddPattern(patternData);
        toast.success("Minta sikeresen létrehozva", {
          description: `"${patternData.name}" hozzáadva a rendszerhez.`,
        });
        setIsCreateModifyOpen(false);
        resetForm();
    } catch (error) {
        console.error("Failed to save pattern:", error);
        toast.error("Mentés sikertelen", {
          description: "Hiba történt a minta mentése közben. Kérjük, próbálja újra.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h3 className="text-xl font-semibold text-white">Minta Definíciók</h3>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            <Input
              placeholder="Keresés minták között..."
              className="pl-9 pr-3 py-2 bg-black/20 border-white/10 focus-visible:ring-blue-500 text-white w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search patterns"
            />
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 flex-shrink-0"
            onClick={handleOpenCreateDialog}
          >
            <FilePlus className="h-4 w-4" />
            <span>Új Minta</span>
          </Button>
        </div>
      </div>

      {/* Patterns Table */}
      <div className="bg-gray-900/40 rounded-lg p-1 sm:p-4 mb-6 border border-white/10 shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="text-gray-300 font-medium">Név</TableHead>
                <TableHead className="text-gray-300 font-medium">Típus</TableHead>
                <TableHead className="text-gray-300 font-medium hidden lg:table-cell">Leírás</TableHead>
                <TableHead className="text-gray-300 font-medium hidden md:table-cell">Létrehozva</TableHead>
                <TableHead className="text-gray-300 font-medium text-center">Állapot</TableHead>
                <TableHead className="text-gray-300 font-medium text-right">Műveletek</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatterns && filteredPatterns.length > 0 ? (
                filteredPatterns.map((pattern) => {
                   const typeInfo = getPatternTypeInfo(pattern.type);
                   return (
                    <TableRow key={pattern.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="font-semibold text-white py-3">{pattern.name}</TableCell>
                      <TableCell className="py-3">
                        <Badge className={`text-xs ${typeInfo.badgeClass}`}>
                          {typeInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm hidden lg:table-cell py-3 max-w-xs truncate" title={pattern.description}>
                          {pattern.description || '-'}
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm hidden md:table-cell py-3">
                        {pattern.createdAt ? new Date(pattern.createdAt).toLocaleDateString('hu-HU') : '-'}
                      </TableCell>
                      <TableCell className="text-center py-3">
                        {pattern.isActive ?
                          <Badge variant="default" className="flex items-center justify-center w-fit mx-auto bg-green-600 hover:bg-green-700">
                            <Check className="h-3 w-3 mr-1" /> Aktív
                          </Badge> :
                          <Badge variant="secondary" className="flex items-center justify-center w-fit mx-auto">
                            <X className="h-3 w-3 mr-1" /> Inaktív
                          </Badge>
                        }
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <PatternDetailsView
                          pattern={pattern}
                          isMobile={isMobile}
                          // Pass specific analysis handler if available
                          // handleRunAnalysisForPattern={() => handleRunAnalysisForPattern(pattern.id)}
                        />
                        {/* Add Edit/Delete buttons here if needed */}
                      </TableCell>
                    </TableRow>
                   );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-400 py-8">
                    {searchTerm ? 'Nincs a keresésnek megfelelő minta.' : 'Nincsenek definiált minták.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pattern Creation/Modification Dialog */}
      <Dialog open={isCreateModifyOpen} onOpenChange={setIsCreateModifyOpen}>
        <DialogContent className="sm:max-w-4xl bg-gray-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Új Minta Létrehozása</DialogTitle>
            <DialogDescription className="text-gray-400">
              Határozzon meg egy új mintát a mérkőzésadatok elemzéséhez. Adja meg a nevét, típusát és feltételeit.
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="patternName" className="text-sm font-medium text-gray-300">Minta neve <span className="text-red-500">*</span></label>
                <Input id="patternName" placeholder="pl. Második félidei fordulat" className="bg-black/30 border-white/10 focus:border-blue-500" value={newPatternName} onChange={(e) => setNewPatternName(e.target.value)} />
              </div>
              <div className="space-y-2">
                 <label htmlFor="patternType" className="text-sm font-medium text-gray-300">Minta típusa</label>
                 <Select value={newPatternType} onValueChange={(value: PatternType) => setNewPatternType(value)}>
                    <SelectTrigger id="patternType" className="w-full bg-black/30 border-white/10 focus:border-blue-500">
                       <SelectValue placeholder="Válasszon típust..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20 text-white">
                       {PATTERN_TYPES.map(type => {
                           const { label } = getPatternTypeInfo(type);
                           return <SelectItem key={type} value={type}>{label}</SelectItem>
                       })}
                    </SelectContent>
                 </Select>
              </div>
            </div>
             <div className="space-y-2">
                 <label htmlFor="patternDesc" className="text-sm font-medium text-gray-300">Leírás</label>
                 <Textarea id="patternDesc" placeholder="pl. Mérkőzések, ahol a hazai csapat hátrányból fordít..." className="bg-black/30 border-white/10 focus:border-blue-500 min-h-[80px]" value={newPatternDesc} onChange={(e) => setNewPatternDesc(e.target.value)} />
             </div>
             <div className="flex items-center space-x-2">
                <Switch id="patternIsActive" checked={newPatternIsActive} onCheckedChange={setNewPatternIsActive} />
                <label htmlFor="patternIsActive" className="text-sm font-medium text-gray-300">Aktív minta (elemzésben használható)</label>
            </div>

            {/* Conditions Builder */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-base font-semibold text-white">Feltételek <span className="text-red-500">*</span></label>
                <Button variant="outline" size="sm" className="h-8 text-blue-400 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20" onClick={handleAddCondition}>
                  <PlusCircle className="h-4 w-4 mr-1" /> Feltétel hozzáadása
                </Button>
              </div>

              <div className="bg-black/30 rounded-md p-4 border border-white/10 space-y-3">
                 {newPatternConditions.length === 0 && <p className="text-center text-gray-500 italic">Legalább egy feltételt meg kell adni.</p>}
                {newPatternConditions.map((condition, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                     {index > 0 && (
                         <div className="col-span-full sm:col-span-1">
                            <Select
                                value={condition.logicalOperator ?? 'AND'}
                                onValueChange={(value) => handleConditionChange(index, 'logicalOperator', value)}
                            >
                                <SelectTrigger className="w-full bg-black/50 border-white/10 text-xs h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-white/20 text-white">
                                    <SelectItem value="AND">ÉS</SelectItem>
                                    <SelectItem value="OR">VAGY</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                     )}
                    {/* Adjust colspan if logical operator is shown */}
                    <div className={`col-span-full ${index > 0 ? 'sm:col-span-4' : 'sm:col-span-5'}`}>
                      <Input placeholder="Mező (pl. ftHomeScore)" className="bg-black/50 border-white/10 h-8 text-xs" value={condition.field} onChange={(e) => handleConditionChange(index, 'field', e.target.value)} />
                    </div>
                    <div className="col-span-full sm:col-span-2">
                       <Select value={condition.operator} onValueChange={(value) => handleConditionChange(index, 'operator', value)}>
                           <SelectTrigger className="w-full bg-black/50 border-white/10 text-xs h-8">
                               <SelectValue />
                           </SelectTrigger>
                           <SelectContent className="bg-gray-800 border-white/20 text-white">
                                {['=', '!=', '>', '<', '>=', '<=', 'contains', 'startsWith', 'endsWith'].map(op => (
                                     <SelectItem key={op} value={op}>{op}</SelectItem>
                                ))}
                           </SelectContent>
                       </Select>
                    </div>
                    <div className="col-span-full sm:col-span-4">
                      <Input placeholder="Érték (pl. 1, htAwayScore)" className="bg-black/50 border-white/10 h-8 text-xs" value={condition.value} onChange={(e) => handleConditionChange(index, 'value', e.target.value)} />
                    </div>
                    <div className="col-span-full sm:col-span-1 text-right">
                        {/* Prevent removing the last condition */}
                      {newPatternConditions.length > 1 && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-400 hover:bg-red-500/10" onClick={() => handleRemoveCondition(index)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Feltétel törlése</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <DialogFooter className="pt-4 border-t border-white/10">
            <DialogClose asChild>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" disabled={isSubmitting}>Mégsem</Button>
            </DialogClose>
            <Button onClick={handleSavePattern} disabled={isSubmitting}>
                {isSubmitting ? "Mentés folyamatban..." : "Minta Mentése"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatternsTab;
