// src/components/ui/LoadingOrRefreshIcon.tsx

import React from 'react';
import { RefreshCw, Loader2 } from 'lucide-react'; // Icons for refresh and loading
import { cn } from "@/lib/utils"; // Assumes you have this utility from shadcn/ui setup

// Define the props the component accepts
interface LoadingOrRefreshIconProps {
  isRefreshing: boolean;
  className?: string; // Allow passing additional classes
}

const LoadingOrRefreshIcon: React.FC<LoadingOrRefreshIconProps> = ({
  isRefreshing,
  className,
}) => {
  if (isRefreshing) {
    // Display a spinning loader icon when isRefreshing is true
    return <Loader2 className={cn("h-4 w-4 animate-spin", className)} />;
    // Note: Matched size h-4 w-4 to fit well inside the h-8 w-8 button in DashboardHeader
  } else {
    // Display the standard refresh icon when isRefreshing is false
    return <RefreshCw className={cn("h-4 w-4", className)} />;
  }
};

export default LoadingOrRefreshIcon; // Default export is needed here
