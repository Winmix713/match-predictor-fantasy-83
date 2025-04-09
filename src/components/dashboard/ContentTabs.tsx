import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Assuming shadcn/ui
import { RovingFocusGroup } from "@radix-ui/react-roving-focus";
import { Loader2 } from 'lucide-react';
import clsx from 'clsx'; // Utility for conditionally joining classNames

// --- Child Component Imports ---
// These components would ideally handle their own internal state,
// data fetching (if applicable), and potentially their own loading/error states.
import MatchSchedule from '@/components/MatchSchedule';
import LeagueTable from '@/components/LeagueTable';
import FormTable from '@/components/FormTable';
import BothTeamsScored from '@/components/BothTeamsScored';
import PredictionSystem from '@/components/PredictionSystem';

// --- Types ---

interface TabConfig {
  value: string; // Unique identifier for the tab
  label: string; // Text displayed on the tab trigger
  component: React.ReactNode; // The component to render for this tab's content
}

interface ContentTabsProps {
  /** The value of the tab to be active by default or controlled externally. */
  activeTab: string;
  /** Callback invoked when the active tab changes. Receives the new tab's value. */
  setActiveTab: (tabValue: string) => void;
  /** Represents the loading state for the *entire* tab content area.
   *  More granular loading (per tab) should typically be handled
   *  within the individual child components (e.g., MatchSchedule). */
  isLoading: boolean;
  /** Optional additional className to apply to the root div. */
  className?: string;
}

// --- Configuration ---

// Define tab configurations in a single source of truth.
// Mapping the component directly here avoids a separate map lookup later.
const tabData: TabConfig[] = [
  { value: "matches", label: "Mérkőzések", component: <MatchSchedule /> },
  { value: "standings", label: "Tabella", component: <LeagueTable /> },
  { value: "form", label: "Forma", component: <FormTable /> },
  { value: "bts", label: "Gólok", component: <BothTeamsScored /> },
  { value: "prediction", label: "Elemzés", component: <PredictionSystem /> },
];

// --- Reusable Loading Indicator Component ---
// Kept separate for clarity and potential reuse.
const LoadingIndicator: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-24 px-4" aria-live="polite" aria-busy="true">
    <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
      <Loader2 className="h-8 w-8 text-blue-500 animate-spin" aria-hidden="true"/>
    </div>
    <h3 className="text-xl font-medium text-white mb-2">Adatok betöltése...</h3>
    <p className="text-gray-400 text-center max-w-md">
      A mérkőzés adatok frissítése és elemzése folyamatban van. Ez néhány másodpercet vehet igénybe.
    </p>
  </div>
);

// --- Fallback Content Component ---
// Used if a tab configuration is somehow missing its component.
const MissingContent: React.FC<{ label: string }> = ({ label }) => (
    <div className="p-4 text-red-500 text-center" role="alert">
        Content for '{label}' could not be loaded. Please try again later.
    </div>
);

// --- Main ContentTabs Component ---

const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  setActiveTab,
  isLoading,
  className,
}) => {
  // Base classes for tab triggers
  const tabTriggerBaseClasses = "py-4 rounded-none border-b-2 border-transparent";
  // Classes applied only when a trigger is active
  const tabTriggerActiveClasses = "data-[state=active]:border-blue-500 data-[state=active]:bg-black/20";

  return (
    <div className={clsx(
      "bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg",
      className // Allow passing additional classes from parent
    )}>
      <Tabs
        defaultValue={activeTab}
        value={activeTab} // Make it controlled if activeTab prop is used consistently
        className="w-full"
        onValueChange={setActiveTab}
        // Radix UI Tabs handles ARIA roles and states internally.
        // Verify implementation meets specific accessibility needs.
      >
        {/* RovingFocusGroup enhances keyboard navigation between triggers */}
        <RovingFocusGroup asChild orientation="horizontal">
          <TabsList className="grid grid-cols-5 bg-muted/50 w-full rounded-none">
            {/* Map over tabData to generate triggers */}
            {tabData.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                // Use clsx for cleaner conditional class application
                className={clsx(tabTriggerBaseClasses, tabTriggerActiveClasses)}
                // Disable triggers while loading to prevent interaction issues
                disabled={isLoading}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </RovingFocusGroup>

        {/* --- Conditional Rendering: Loading State --- */}
        {/* Show a single loading indicator for the whole tab panel area */}
        {isLoading && <LoadingIndicator />}

        {/* --- Conditional Rendering: Content Panes --- */}
        {/* Only render content panes when not loading */}
        {!isLoading && (
          <>
            {/* Map over tabData again to generate content panes */}
            {/* NOTE: This separate map is necessary due to the structure required by Tabs/TabsList/TabsContent */}
            {tabData.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="p-0 mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" // Added focus style
                // Ensure content is properly labelled by its trigger for accessibility
                // Radix usually handles aria-labelledby, but verify
              >
                {/* Render the configured component or a fallback */}
                {tab.component || <MissingContent label={tab.label} />}
              </TabsContent>
            ))}
          </>
        )}
      </Tabs>
    </div>
    /*
      RECOMMENDATIONS:
      1. Data Fetching: Handle data fetching for tab content *outside* this component,
         likely in the parent component or using dedicated custom hooks (e.g., useMatchesData, useStandingsData).
         Pass data down to child components (MatchSchedule, etc.) or let them fetch via context/hooks.
         The `isLoading` prop should reflect the loading state derived from these fetching mechanisms.
      2. Granular Loading/Error States: For loading/error states specific to *each* tab's content,
         implement that logic *within* the respective child components (MatchSchedule, LeagueTable, etc.).
      3. Styling: For more complex applications, consider managing CSS classes using CSS Modules,
         Styled Components, Tailwind Variants (CVA), or Tailwind's @apply directive for better maintainability
         than inline clsx logic for complex variants.
      4. Testing: Implement unit and integration tests (e.g., using React Testing Library)
         to verify rendering, tab switching, loading state display, and interaction with `setActiveTab`.
    */
  );
};

export default ContentTabs;
