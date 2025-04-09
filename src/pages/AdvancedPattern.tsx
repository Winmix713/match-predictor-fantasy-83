import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming this is from Shadcn UI or similar
import AdvancedPatternAnalysis from '@/components/AdvancedPatternAnalysis'; // Import the main component

// Placeholder for i18n translation function
// Replace with your actual i18n implementation (e.g., using useTranslation hook from i18next)
const t = (key: string, fallback: string) => {
  // In a real app, this would look up the key in translation files
  console.warn(`i18n: Using fallback text for key "${key}"`);
  return fallback;
};

/**
 * A view component that wraps the AdvancedPatternAnalysis feature.
 * Provides page layout, styling, and navigation back to the matches list.
 */
const AdvancedPatternView: React.FC = () => {
  return (
    // Page container with padding and background
    <div className="min-h-screen bg-background pt-20 pb-10 md:pt-24 md:pb-16 text-foreground">
      {/* Centered content container */}
      <div className="container mx-auto max-w-7xl px-4">
        {/* Back navigation button section */}
        <div className="mb-6">
          <Link to="/matches" className="inline-block"> {/* Make link block for better hit area */}
            <Button
              variant="ghost"
              // Note: If this style is reused, consider creating a custom button variant
              // in your UI library setup (e.g., variant="outline-translucent")
              className="group flex items-center gap-2 rounded-md border border-border bg-card/50 px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {/* i18n: Use translation function */}
              {t('advancedPattern.backToMatches', 'Back to Matches')}
            </Button>
          </Link>
        </div>

        {/* Main content card */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-md">
           {/* Add padding inside the card if AdvancedPatternAnalysis doesn't handle it */}
           {/* Example: <div className="p-4 md:p-6"> */}
                <AdvancedPatternAnalysis />
           {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdvancedPatternView;
