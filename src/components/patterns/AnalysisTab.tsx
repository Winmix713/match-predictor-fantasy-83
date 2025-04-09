// src/components/Analysis/AnalysisTab.tsx (or your chosen path)
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Use Card component
import { Download, LineChart, BarChart4, Filter, PieChart, Settings2, Percent, CheckCircle, AlertTriangle } from 'lucide-react';
import { DataSource, PatternDefinition, PatternDetectionResult } from '../../types/match'; // Assuming types are in ../../types

interface AnalysisTabProps {
  dataSources: DataSource[];
  predefinedPatterns: PatternDefinition[]; // Patterns selected/available for analysis
  patternResults: PatternDetectionResult[]; // Results from the LAST analysis run
  analysisInProgress: boolean; // Flag indicating if analysis is running
  handleRunAnalysis: () => void;
  handleExportReport: () => void;
  handleConfigureAnalysis?: () => void; // Optional: For opening detailed settings modal
  handleViewResultDetails?: (result: PatternDetectionResult) => void; // Optional: For viewing details of a specific result
}

// Helper function for significance badge styling
const getSignificanceBadgeInfo = (significance: string): { variant: "success" | "warning" | "secondary" | "outline", label: string } => {
  switch (significance?.toLowerCase()) {
    case 'high': return { variant: 'success', label: 'Magas' };
    case 'medium': return { variant: 'warning', label: 'Közepes' };
    case 'low': return { variant: 'secondary', label: 'Alacsony' };
    default: return { variant: 'outline', label: significance || 'N/A' };
  }
};

/**
 * Tab for configuring, running, and viewing pattern analysis results.
 */
const AnalysisTab: React.FC<AnalysisTabProps> = ({
  dataSources,
  predefinedPatterns,
  patternResults,
  analysisInProgress,
  handleRunAnalysis,
  handleExportReport,
  handleConfigureAnalysis,
  handleViewResultDetails,
}) => {
  const hasResults = patternResults && patternResults.length > 0;
  const hasConfig = dataSources.length > 0 && predefinedPatterns.length > 0;

  // Example hardcoded settings - replace with dynamic values if needed
  const analysisSettings = {
      confidenceThreshold: 75,
      minMatchCount: 10,
  };

  return (
    <>
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h3 className="text-xl font-semibold text-white">Minta Elemzés és Eredmények</h3>
        <div className="flex flex-wrap gap-2">
          {/* Conditionally show Configure button */}
          {handleConfigureAnalysis && (
             <Button
                variant="outline"
                className="bg-gray-500/10 border-gray-500/30 hover:bg-gray-500/20 text-white flex items-center gap-2"
                onClick={handleConfigureAnalysis}
            >
                <Settings2 className="h-4 w-4" />
                <span>Beállítások</span>
            </Button>
          )}
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            onClick={handleRunAnalysis}
            disabled={analysisInProgress || !hasConfig}
            aria-label={analysisInProgress ? "Elemzés folyamatban..." : "Elemzés indítása"}
          >
            {analysisInProgress ? (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
            ) : (
              <LineChart className="h-4 w-4" />
            )}
            <span>{analysisInProgress ? 'Elemzés folyamatban...' : 'Elemzés Indítása'}</span>
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* Settings Overview Card */}
        <Card className="bg-gray-900/50 border-white/10 text-white lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-blue-400" />
              Aktuális Elemzési Konfiguráció
            </CardTitle>
             {/* Optionally add configure button here too */}
             {/* {handleConfigureAnalysis && <Button size="sm" variant="ghost" onClick={handleConfigureAnalysis} className="absolute top-4 right-4">Módosítás</Button>} */}
          </CardHeader>
          <CardContent className="space-y-5 text-sm">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Adatforrások</label>
              {dataSources.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                    {dataSources.map(source => (
                    <Badge key={source.id} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {source.name}
                    </Badge>
                    ))}
                </div>
               ) : ( <p className="text-gray-500 italic">Nincs kiválasztott adatforrás.</p> )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Elemzendő Minták</label>
              {predefinedPatterns.length > 0 ? (
                 <div className="flex flex-wrap gap-1">
                    {predefinedPatterns.map(pattern => (
                    <Badge key={pattern.id} variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {pattern.name}
                    </Badge>
                    ))}
                 </div>
                ) : ( <p className="text-gray-500 italic">Nincs kiválasztott minta.</p> )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
                 <div className="space-y-1">
                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Konfidencia Küszöb</label>
                     <div className="font-semibold text-base text-white">{analysisSettings.confidenceThreshold}%</div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Min. Mérkőzés Szám</label>
                    <div className="font-semibold text-base text-white">{analysisSettings.minMatchCount}</div>
                 </div>
            </div>

            {!hasConfig && (
                 <div className="pt-2 text-center text-amber-400/80 text-xs flex items-center gap-2 bg-amber-900/20 p-2 rounded border border-amber-500/20">
                     <AlertTriangle className="h-4 w-4 flex-shrink-0"/>
                     Az elemzés indításához válasszon ki legalább egy adatforrást és egy mintát.
                 </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results Card */}
        <Card className="bg-gray-900/50 border-white/10 text-white lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart4 className="h-5 w-5 text-emerald-400" />
              Legutóbbi Elemzés Eredményei
            </CardTitle>
             {hasResults && <CardDescription className="text-gray-400">A legutóbbi elemzés futtatásának eredményei.</CardDescription>}
          </CardHeader>
          <CardContent>
            {hasResults ? (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patternResults.map(result => {
                     const significanceInfo = getSignificanceBadgeInfo(result.significance);
                     return (
                        <div key={result.patternId} className="bg-black/30 p-4 rounded-lg border border-white/10 space-y-3 transform transition-transform hover:scale-[1.02] hover:shadow-md">
                            <div className="flex justify-between items-start gap-2">
                            <h5 className="text-base font-semibold text-white leading-tight">{result.patternName}</h5>
                            <Badge variant={significanceInfo.variant} className="text-xs capitalize flex-shrink-0">
                                {significanceInfo.label} Jelentőség
                            </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-center border-t border-b border-white/5 py-3">
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Megbízhatóság</div>
                                <div className="text-xl font-bold text-emerald-400 flex items-center justify-center gap-1">
                                     <Percent className="h-4 w-4" /> {(result.confidenceScore ?? 0).toFixed(1)}%
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 mb-1">Gyakoriság</div>
                                <div className="text-xl font-bold text-blue-400 flex items-center justify-center gap-1">
                                    <BarChart4 className="h-4 w-4"/> {(result.frequency ?? 0).toFixed(1)}%
                                </div>
                            </div>
                            </div>

                            <div className="text-xs text-gray-400 mb-1">Megfigyelt esetek</div>
                            <div className="text-sm font-medium text-white">{result.matches?.length ?? 0} mérkőzés</div>

                            {handleViewResultDetails && (
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="w-full mt-2 text-blue-400 hover:text-blue-300 px-0 justify-start"
                                    onClick={() => handleViewResultDetails(result)}
                                >
                                Részletes eredmények megtekintése <ArrowRight className="h-3 w-3 ml-1"/>
                                </Button>
                             )}
                        </div>
                     );
                    })}
                </div>

                {/* Export Button within results */}
                <Button
                  variant="outline"
                  className="w-full bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-white flex items-center gap-2 mt-4"
                  onClick={handleExportReport}
                  disabled={analysisInProgress}
                >
                  <Download className="h-4 w-4" />
                  <span>Eredmények Exportálása</span>
                </Button>
              </div>
            ) : (
              // Empty State for Results
              <div className="text-center py-10 px-4">
                {analysisInProgress ? (
                    <>
                     <div className="w-16 h-16 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-5 border border-blue-500/20">
                        <span className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full"></span>
                     </div>
                     <h5 className="text-lg font-semibold text-white mb-2">Elemzés folyamatban...</h5>
                     <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                        A rendszer dolgozik a minták felismerésén. Az eredmények hamarosan megjelennek.
                     </p>
                    </>
                ) : (
                    <>
                    <div className="w-16 h-16 rounded-full bg-gray-500/10 mx-auto flex items-center justify-center mb-5 border border-gray-500/20">
                        <LineChart className="h-8 w-8 text-gray-400" />
                    </div>
                    <h5 className="text-lg font-semibold text-white mb-2">Nincsenek megjeleníthető eredmények</h5>
                    <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                        Indítson el egy új elemzést a fent megadott konfigurációval az eredmények megtekintéséhez.
                    </p>
                    <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleRunAnalysis}
                        disabled={!hasConfig} // Disable if no config
                    >
                        Elemzés Indítása Most
                    </Button>
                    </>
                )}

              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for Additional Visualizations */}
      {hasResults && (
        <Card className="bg-gray-900/50 border-white/10 text-white shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChart className="h-5 w-5 text-purple-400" />
                    Eredmények Vizualizációja
                </CardTitle>
                 <CardDescription className="text-gray-400">Mintaeloszlás és egyéb diagramok (Hamarosan).</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded-md bg-black/20">
                    <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 mx-auto flex items-center justify-center mb-4">
                        <BarChart4 className="h-6 w-6 text-purple-400" />
                        </div>
                        <p className="text-gray-500 text-sm">Diagramok fejlesztés alatt.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
       )}
    </>
  );
};

export default AnalysisTab;
