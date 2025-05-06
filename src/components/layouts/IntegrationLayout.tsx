
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface IntegrationLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  documentationLink?: string;
}

const IntegrationLayout: React.FC<IntegrationLayoutProps> = ({
  title,
  description,
  children,
  documentationLink
}) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Back link and title section */}
          <div className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white self-start"
              asChild
            >
              <Link to="/integrations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Integrations
              </Link>
            </Button>
            
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <p className="text-gray-400">{description}</p>
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration section - 2/3 width on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                  <CardDescription>Set up your {title.toLowerCase()} connection</CardDescription>
                </CardHeader>
                <CardContent>
                  {children}
                </CardContent>
              </Card>
            </div>
            
            {/* Help section - 1/3 width on large screens */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connection Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-gray-300">Not connected</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Learn more about this integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">
                    View our detailed documentation to learn more about setting up and 
                    using this integration with your V-SPORTS system.
                  </p>
                  
                  {documentationLink && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={documentationLink} target="_blank" rel="noopener noreferrer">
                        View Documentation
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationLayout;
