
// src/components/Analysis/ReportsTab.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText, CheckCircle, Bell } from 'lucide-react';
import { PatternDetectionResult, DataSource } from '../../types/match';
import ActionItem from '@/components/Analysis/ActionItem'; // ✅ FIXED: Corrected import path

interface ReportsTabProps {
  patternResults: PatternDetectionResult[];
  dataSources: DataSource[];
  handleExportReport: () => void;
  handleRunAnalysis: () => void;
  isLoading?: boolean; // Added to match the props passed in AdvancedPatternAnalysis
  handleSetupAlerts?: (patternId: string) => void;
  handleGenerateDetailedReport?: (patternId?: string) => void;
}

const ReportsTab: React.FC<ReportsTabProps> = ({
  patternResults,
  dataSources,
  handleExportReport,
  handleRunAnalysis,
  isLoading = false,
  handleSetupAlerts = () => alert("Placeholder: Setup Alerts"),
  handleGenerateDetailedReport = () => alert("Placeholder: Generate Report"),
}) => {
  const totalMatches = dataSources.reduce((sum, source) => sum + (source.matches || 0), 0);
  const hasResults = patternResults.length > 0;

  const actions = [
    {
      id: 'alerts',
      icon: <Bell className="h-4 w-4 text-amber-400" />,
      title: "Fordulat figyelő riasztások",
      description: "Állítson be automatikus értesítéseket a magas jelentőségű minták élő előfordulásakor.",
      buttonText: "Beállítás",
      buttonAction: () => handleSetupAlerts('p1'),
      showCondition: hasResults,
    },
    {
      id: 'pdf',
      icon: <FileText className="h-4 w-4 text-blue-400" />,
      title: "Részletes jelentés létrehozása",
      description: "Készítsen PDF jelentést az összes feltárt mintáról és statisztikai elemzésükről.",
      buttonText: "Létrehozás",
      buttonAction: () => handleGenerateDetailedReport(),
      showCondition: hasResults,
    },
  ];

  const sortedResults = [...patternResults].sort((a, b) => {
    const significanceOrder = { high: 3, medium: 2, low: 1 };
    const sigDiff = (significanceOrder[b.significance] || 0) - (significanceOrder[a.significance] || 0);
    if (sigDiff !== 0) return sigDiff;
    return (b.confidenceScore || 0) - (a.confidenceScore || 0);
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h3 className="text-xl font-semibold text-white">Elemzési jelentések</h3>
        {hasResults && (
          <Button
            aria-label="Export Report"
            variant="outline"
            className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-white flex items-center gap-2"
            onClick={handleExportReport}
          >
            <Download className="h-4 w-4" />
            <span>Teljes jelentés exportálása</span>
          </Button>
        )}
      </div>

      <div className="bg-gray-900/40 rounded-lg p-5 md:p-6 mb-6 border border-white/10 shadow-lg">
        {hasResults ? (
          <div className="space-y-8">
            <div className="border-b border-white/10 pb-6">
              <h4 className="text-lg font-semibold text-white mb-3">Összefoglaló</h4>
              <p className="text-gray-300 text-sm">
                Az elemzés során <span className="font-semibold text-white">{sortedResults.length}</span> mintát vizsgáltunk <span className="font-semibold text-white">{totalMatches.toLocaleString('hu-HU')}</span> mérkőzés adatain.
                A legfontosabb eredményeket és javaslatokat alább részletezzük.
              </p>
            </div>

            <div className="border-b border-white/10 pb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Kiemelt megállapítások</h4>
              {sortedResults.length > 0 ? (
                <ul className="space-y-3">
                  {sortedResults.slice(0, 3).map((result) => (
                    <li key={result.patternId} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-white">"{result.patternName}"</span>
                        <span className="text-gray-300 text-sm block">
                          {result.frequency !== undefined && ` Előfordulás: ~${result.frequency.toFixed(1)}%.`}
                          {result.confidenceScore !== undefined && ` Megbízhatóság: ${result.confidenceScore.toFixed(1)}%.`}
                          {result.insights && result.insights.length > 0 && ` (${result.insights[0]})`}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">Nem található kiemelhető megállapítás.</p>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Javasolt intézkedések</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {actions
                  .filter(action => action.showCondition)
                  .map((action) => (
                    <ActionItem key={action.id} {...action} />
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 mx-auto flex items-center justify-center mb-5 border border-blue-500/20">
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <h5 className="text-lg font-semibold text-white mb-2">Még nincs elemzési jelentés</h5>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
              Futtasson le egy elemzést a minták alapján, hogy megtekinthesse az eredményeket és a kapcsolódó jelentéseket.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleRunAnalysis}
              disabled={isLoading}
            >
              {isLoading ? "Elemzés folyamatban..." : "Elemzés indítása most"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReportsTab;
