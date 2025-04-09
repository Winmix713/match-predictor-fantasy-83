import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use react-router-dom
import { cn } from "@/lib/utils"; // Standard utility for combining class names in shadcn/ui projects

// Define the expected props for the component
interface IntegrationCardProps {
  icon: React.ElementType; // Accepts a component type like Brain or Trophy
  title: string;
  description: string;
  linkTo: string;
  color: 'blue' | 'emerald' | 'purple' | string; // Define specific colors or allow any string
}

// Define Tailwind classes for different color themes
// You can customize these colors and add more themes
const colorVariants = {
  blue: {
    bg: "bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50",
    border: "border-blue-200 hover:border-blue-300 dark:border-blue-800 dark:hover:border-blue-700",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconText: "text-blue-600 dark:text-blue-400",
    titleText: "text-blue-900 dark:text-blue-100",
    descriptionText: "text-blue-700 dark:text-blue-300",
  },
  emerald: {
    bg: "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50",
    border: "border-emerald-200 hover:border-emerald-300 dark:border-emerald-800 dark:hover:border-emerald-700",
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
    iconText: "text-emerald-600 dark:text-emerald-400",
    titleText: "text-emerald-900 dark:text-emerald-100",
    descriptionText: "text-emerald-700 dark:text-emerald-300",
  },
  purple: { // Added purple example based on your commented data
    bg: "bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50",
    border: "border-purple-200 hover:border-purple-300 dark:border-purple-800 dark:hover:border-purple-700",
    iconBg: "bg-purple-100 dark:bg-purple-900",
    iconText: "text-purple-600 dark:text-purple-400",
    titleText: "text-purple-900 dark:text-purple-100",
    descriptionText: "text-purple-700 dark:text-purple-300",
  },
  // Add more color variants as needed
  default: { // Fallback colors
    bg: "bg-gray-50 hover:bg-gray-100 dark:bg-gray-900/30 dark:hover:bg-gray-900/50",
    border: "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700",
    iconBg: "bg-gray-100 dark:bg-gray-900",
    iconText: "text-gray-600 dark:text-gray-400",
    titleText: "text-gray-900 dark:text-gray-100",
    descriptionText: "text-gray-700 dark:text-gray-300",
  }
};

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  icon: IconComponent, // Rename prop for clarity when using as component
  title,
  description,
  linkTo,
  color,
}) => {

  // Get the color theme classes, falling back to default if the color isn't defined
  const theme = colorVariants[color as keyof typeof colorVariants] || colorVariants.default;

  return (
    <Link
      to={linkTo}
      className={cn(
        "block p-6 rounded-lg border shadow-sm transition-all duration-200 ease-in-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Accessibility
        theme.bg,
        theme.border
      )}
    >
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className={cn("flex-shrink-0 p-2 rounded-lg", theme.iconBg)}>
          <IconComponent className={cn("w-6 h-6", theme.iconText)} aria-hidden="true" />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0"> {/* Added min-w-0 for potential text overflow issues */}
          <h3 className={cn("text-lg font-semibold truncate", theme.titleText)}> {/* Added truncate */}
            {title}
          </h3>
          <p className={cn("text-sm mt-1", theme.descriptionText)}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default IntegrationCard;
