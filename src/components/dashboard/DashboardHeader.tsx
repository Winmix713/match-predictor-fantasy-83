// src/components/dashboard/DashboardHeader.tsx

import React from 'react';
import { BarChart3 } from 'lucide-react'; // Keep BarChart3
import { format, isValid } from 'date-fns'; // Import date-fns helpers
import { Button } from "@/components/ui/button";
import LoadingOrRefreshIcon from "@/components/ui/LoadingOrRefreshIcon"; // Import the extracted component

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  // Allow null/undefined for dataUpdatedAt for robustness
  dataUpdatedAt: Date | null | undefined;
  isRefreshing: boolean;
  onRefresh: () => void;
  // Keep ReactNode for flexibility, but stricter types could be used if needed
  actionButton?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  dataUpdatedAt,
  isRefreshing,
  onRefresh,
  actionButton
}) => {

  // Format the date using date-fns, with error handling
  let formattedDate = 'N/A'; // Default display
  let isoDateTime: string | undefined;

  if (dataUpdatedAt && isValid(dataUpdatedAt)) {
    try {
      // 'PPpp' provides a localized, user-friendly date/time string
      formattedDate = format(dataUpdatedAt, 'PPpp');
      isoDateTime = dataUpdatedAt.toISOString(); // Get ISO string for <time> tag
    } catch (error) {
      console.error("Error formatting date:", error);
      formattedDate = 'Invalid Date'; // Display error state
      isoDateTime = undefined;
    }
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left Side: Title & Subtitle */}
      <div className="flex min-w-0 items-center gap-2"> {/* min-w-0 helps with flex truncation */}
        {/* Decorative icon */}
        <BarChart3 className="h-6 w-6 flex-shrink-0 text-blue-500" aria-hidden="true" />
        <div className="min-w-0 flex-1"> {/* Container for text to allow truncation */}
          <h1 className="truncate text-2xl font-bold text-white md:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 truncate text-sm text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Right Side: Timestamp, Refresh, Action Button */}
      <div className="flex flex-shrink-0 items-center gap-3">
        {/* Use semantic <time> tag for timestamp */}
        <time
          dateTime={isoDateTime} // Provide machine-readable datetime
          className="whitespace-nowrap text-xs text-gray-400"
          title={isoDateTime ? `Timestamp: ${isoDateTime}` : 'Timestamp not available'} // Optional title attribute
        >
          Last updated: {formattedDate}
        </time>

        <Button
          variant="outline"
          size="icon"
          disabled={isRefreshing}
          onClick={onRefresh}
          className="h-8 w-8 border-white/10 bg-black/20 text-blue-400"
          // Dynamic ARIA label for accessibility
          aria-label={isRefreshing ? "Refreshing data..." : "Refresh data"}
          // Announce label changes (e.g., when refreshing starts/stops)
          aria-live="polite"
        >
          {/* Use the extracted icon component */}
          <LoadingOrRefreshIcon isRefreshing={isRefreshing} />
        </Button>

        {/* Optional action button */}
        {actionButton}
      </div>
    </div>
  );
};

export default DashboardHeader;
