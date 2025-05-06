
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import IntegrationLayout from "@/components/layouts/IntegrationLayout";

const ApiServices = () => {
  const [apiKey, setApiKey] = useState("");
  const [endpoint, setEndpoint] = useState("https://api.example.com/v1");
  const [headers, setHeaders] = useState("{ \"Content-Type\": \"application/json\" }");
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API connection save
    setTimeout(() => {
      setIsSaving(false);
      toast.success("API configuration saved", {
        description: `Your API settings have been updated`
      });
    }, 1000);
  };

  const handleTest = () => {
    toast.info("Testing API connection", {
      description: "Sending test request to endpoint..."
    });
    
    // Simulate API test
    setTimeout(() => {
      toast.success("API connection successful", {
        description: "Received valid response from endpoint"
      });
    }, 1500);
  };

  return (
    <IntegrationLayout 
      title="API Services" 
      description="Connect to external APIs and services to extend functionality"
      documentationLink="https://docs.example.com/api-services"
    >
      <Tabs defaultValue="configuration">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
        </TabsList>
        
        <TabsContent value="configuration" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiEndpoint">API Base URL</Label>
              <Input 
                id="apiEndpoint" 
                placeholder="https://api.example.com/v1" 
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
              />
              <p className="text-xs text-gray-500">The base URL for the API service</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiHeaders">Default Headers</Label>
              <Input 
                id="apiHeaders" 
                placeholder='{ "Content-Type": "application/json" }' 
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
              />
              <p className="text-xs text-gray-500">JSON format of default headers to send with each request</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Configuration"}
            </Button>
            <Button variant="outline" onClick={handleTest}>Test Connection</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="endpoints" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Badge className="bg-blue-600 hover:bg-blue-700 mr-2">GET</Badge>
                  <span className="font-mono text-sm">/users</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm mt-2 text-gray-400">Retrieves list of users</p>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Badge className="bg-green-600 hover:bg-green-700 mr-2">POST</Badge>
                  <span className="font-mono text-sm">/data/import</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm mt-2 text-gray-400">Imports data from external source</p>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Badge className="bg-purple-600 hover:bg-purple-700 mr-2">PUT</Badge>
                  <span className="font-mono text-sm">/settings</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm mt-2 text-gray-400">Updates system settings</p>
            </div>
          </div>
          
          <Button variant="outline">Add New Endpoint</Button>
        </TabsContent>
        
        <TabsContent value="authentication" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex space-x-2">
                <Input 
                  id="apiKey" 
                  type="password"
                  placeholder="Enter your API key" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <Button variant="outline" size="icon">
                  👁️
                </Button>
              </div>
              <p className="text-xs text-gray-500">Your API key will be stored securely</p>
            </div>
          </div>
          
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Update API Key"}
          </Button>
        </TabsContent>
      </Tabs>
    </IntegrationLayout>
  );
};

export default ApiServices;
