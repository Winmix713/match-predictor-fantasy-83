import React, { useState, useCallback, useEffect } from 'react';
import { Database } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { cn } from "@/lib/utils"; // Assuming you have a utility like this from Shadcn UI

// Import child components
import DataSourcesTab from './patterns/DataSourcesTab';
import PatternsTab from './patterns/PatternsTab';
import AnalysisTab from './patterns/AnalysisTab';
import ReportsTab from './patterns/ReportsTab';

// --- Mock Data & Types (assuming structure from original props) ---
// It's better to define types/interfaces for your data
interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastImport?: string;
}

interface Pattern {
  id: string;
  name: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  tags: string[];
}

interface PatternResult {
  id: string;
  patternId: string;
  patternName?: string; // Denormalized for easier display
  dataSourceId: string;
  dataSourceName?: string; // Denormalized
  runDate: string;
  status: 'completed' | 'failed' | 'running';
  findingsCount: number;
  // Add more result-specific fields as needed
}

// Mock data imports (replace with actual data fetching logic)
import { dataSources, predefinedPatterns, patternResults } from './patterns/mockData';

// --- Helper Functions ---

// Simulate an async operation (e.g., API call)
const simulateAsyncTask = (duration: number = 1500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

// --- Component ---

const AdvancedPatternAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('patterns');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // --- Mobile Detection ---
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // --- Generic Action Handler ---
  const handleAction = useCallback(async (
    actionFn: () => Promise<any>, // The actual async function to perform
    options: {
      loadingMessage: string;
      successMessage: string;
      successDescription?: string;
      errorMessage: string;
    }
  ) => {
    if (isLoading) return; // Prevent concurrent actions if needed

    setIsLoading(true);
    setActionError(null);
    // i18n: Consider externalizing toast messages
    const loadingToastId = toast.loading(options.loadingMessage);

    try {
      await actionFn();
      toast.success(options.successMessage, {
        id: loadingToastId,
        description: options.successDescription,
      });
    } catch (error: any) {
      console.error(`${options.errorMessage}:`, error);
      const errorDesc = error instanceof Error ? error.message : 'An unknown error occurred.';
      setActionError(errorDesc); // Store error state if needed elsewhere
      toast.error(options.errorMessage, {
        id: loadingToastId,
        description: errorDesc,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); // Dependency: isLoading to prevent concurrent calls

  // --- Specific Action Callbacks ---
  const handleImportData = useCallback(() => {
    handleAction(
      () => simulateAsyncTask(2000), // Replace with actual import logic
      {
        loadingMessage: "Importing data...", // i18n
        successMessage: "Data Import Initiated", // i18n
        successDescription: "Processing started, you'll be notified upon completion.", // i18n
        errorMessage: "Data Import Failed", // i18n
      }
    );
  }, [handleAction]);

  const handleRunAnalysis = useCallback(() => {
    handleAction(
      () => simulateAsyncTask(3000), // Replace with actual analysis logic
      {
        loadingMessage: "Running analysis...", // i18n
        successMessage: "Analysis Started", // i18n
        successDescription: "Results will be available shortly.", // i18n
        errorMessage: "Analysis Failed", // i18n
      }
    );
  }, [handleAction]);

  const handleExportReport = useCallback(() => {
    handleAction(
      () => simulateAsyncTask(1000), // Replace with actual export logic
      {
        loadingMessage: "Exporting report...", // i18n
        successMessage: "Report Export Initiated", // i18n
        successDescription: "Your download will begin soon.", // i18n
        errorMessage: "Report Export Failed", // i18n
      }
    );
  }, [handleAction]);

  // --- Render ---
  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
        <Database className="h-6 w-6 text-blue-400" />
        {/* i18n: Externalize title */}
        <h2 className="text-2xl font-semibold text-white">Pattern Analysis System</h2>
      </div>

      {/* Display persistent error if needed */}
      {actionError && (
        <div className="p-3 bg-red-500/20 text-red-300 border border-red-500/50 rounded-md text-sm">
          {/* i18n: */}
          <strong>Action Failed:</strong> {actionError}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Use cn for potential future conditional classes */}
        <TabsList className={cn(
          "grid w-full gap-1 bg-gray-800 p-1 rounded-md",
          // Responsive grid layout for tabs
          "grid-cols-2 sm:grid-cols-4"
        )}>
          {/* i18n: Externalize tab labels */}
          <TabsTrigger value="datasources" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-gray-300 hover:bg-gray-700/50 transition-colors duration-150">
            Data Sources
          </TabsTrigger>
          <TabsTrigger value="patterns" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-gray-300 hover:bg-gray-700/50 transition-colors duration-150">
            Patterns
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-gray-300 hover:bg-gray-700/50 transition-colors duration-150">
            Analysis
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600/30 data-[state=active]:text-white text-gray-300 hover:bg-gray-700/50 transition-colors duration-150">
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Tab Content Panels */}
        <div className="mt-4 p-4 bg-gray-800/50 rounded-b-md border border-t-0 border-gray-700">
            <TabsContent value="datasources">
            <DataSourcesTab
                dataSources={dataSources as DataSource[]} // Assert type
                handleImportData={handleImportData}
                isLoading={isLoading} // Pass loading state if needed
            />
            </TabsContent>

            <TabsContent value="patterns">
            <PatternsTab
                patterns={predefinedPatterns as Pattern[]} // Assert type
                isMobile={isMobile}
                handleRunAnalysis={handleRunAnalysis} // Maybe trigger analysis from here?
                isLoading={isLoading}
            />
            </TabsContent>

            <TabsContent value="analysis">
            <AnalysisTab
                dataSources={dataSources as DataSource[]}
                predefinedPatterns={predefinedPatterns as Pattern[]}
                patternResults={patternResults as PatternResult[]} // Assert type
                handleRunAnalysis={handleRunAnalysis}
                handleExportReport={handleExportReport}
                isLoading={isLoading} // Pass loading state for buttons
            />
            </TabsContent>

            <TabsContent value="reports">
            <ReportsTab
                patternResults={patternResults as PatternResult[]}
                dataSources={dataSources as DataSource[]} // Needed for context?
                handleExportReport={handleExportReport}
                handleRunAnalysis={handleRunAnalysis} // Ability to re-run?
                isLoading={isLoading} // Pass loading state for buttons
            />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AdvancedPatternAnalysis;

// --- Placeholder Child Components (for context, replace with actual) ---

// Assuming similar structure for other tab components

// ./patterns/DataSourcesTab.tsx (Example Structure)
// interface DataSourcesTabProps {
//   dataSources: DataSource[];
//   handleImportData: () => void;
//   isLoading: boolean;
// }
// const DataSourcesTab: React.FC<DataSourcesTabProps> = ({ dataSources, handleImportData, isLoading }) => (
//   <div>
//     <h3>Available Data Sources</h3>
//     {/* Render data sources list */}
//     <button onClick={handleImportData} disabled={isLoading}>
//       {isLoading ? 'Importing...' : 'Import Selected Data'}
//     </button>
//   </div>
// );
// export default DataSourcesTab;

// ./patterns/PatternsTab.tsx (Example Structure)
// interface PatternsTabProps {
//   patterns: Pattern[];
//   isMobile: boolean;
//   handleRunAnalysis: () => void; // Assuming you can trigger analysis from here
//   isLoading: boolean;
// }
// const PatternsTab: React.FC<PatternsTabProps> = ({ patterns, isMobile, handleRunAnalysis, isLoading }) => (
//     <div>
//       <h3>Predefined Patterns</h3>
//       {/* Render patterns list */}
//       <p>Layout adapts on mobile: {isMobile ? 'Yes' : 'No'}</p>
//       {/* Potentially add a button here too? */}
//       {/* <button onClick={handleRunAnalysis} disabled={isLoading}>Run Analysis on Selected</button> */}
//     </div>
// );
// export default PatternsTab;

// ... and so on for AnalysisTab and ReportsTab
