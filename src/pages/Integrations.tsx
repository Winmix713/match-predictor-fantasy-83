
import React from 'react';
import { BarChart, Database, Server, Webhook } from 'lucide-react';
import Header from "@/components/Header";
import IntegrationCard from "@/components/dashboard/IntegrationCard";

const Integrations = () => {
  // Array of integration options
  const integrations = [
    {
      title: "Analytics Integration",
      description: "Connect to our analytics platform for advanced data insights",
      icon: BarChart,
      linkTo: "/analytics",
      color: "blue"
    },
    {
      title: "Database Connection",
      description: "Link your existing databases for seamless data management",
      icon: Database,
      linkTo: "/database-connection",
      color: "emerald"
    },
    {
      title: "API Services",
      description: "Connect to external APIs and services to extend functionality",
      icon: Server,
      linkTo: "/api-services",
      color: "purple"
    },
    {
      title: "Webhook Integration",
      description: "Set up webhooks to automate workflows and notifications",
      icon: Webhook,
      linkTo: "/webhook-setup",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Integrations</h1>
            <p className="text-gray-400 mt-2">Connect your V-SPORTS system with external services and tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <IntegrationCard
                key={index}
                icon={integration.icon}
                title={integration.title}
                description={integration.description}
                linkTo={integration.linkTo}
                color={integration.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
