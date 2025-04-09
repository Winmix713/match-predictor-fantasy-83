// src/components/IntegrationCards.jsx (or wherever the original was)
import React from 'react';
import { Brain, Trophy } from 'lucide-react'; // Import icons here
import IntegrationCard from './IntegrationCard'; // Adjust path if needed

// Define the data for the cards
const integrationsData = [
  {
    id: 'analysis',
    icon: Brain, // Pass the component type directly
    title: "V-Sports Analysis",
    description: "Advanced pattern detection and match prediction",
    linkTo: "/analysis",
    color: "blue",
  },
  {
    id: 'championship',
    icon: Trophy, // Pass the component type directly
    title: "Soccer Championship",
    description: "League tables, rankings, and team statistics",
    linkTo: "/league",
    color: "emerald",
  },
  // Add more cards here easily by adding objects to this array
  // {
  //   id: 'another-feature',
  //   icon: SomeOtherIcon, 
  //   title: "Another Feature",
  //   description: "Description for the new feature",
  //   linkTo: "/another",
  //   color: "purple", // Make sure 'purple' classes are defined/available
  // },
];

const IntegrationCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {integrationsData.map((integration) => (
        <IntegrationCard
          key={integration.id} // Use a unique key for list rendering
          icon={integration.icon}
          title={integration.title}
          description={integration.description}
          linkTo={integration.linkTo}
          color={integration.color}
        />
      ))}
    </div>
  );
};

export default IntegrationCards;
