
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, BarChart3, Search, Plus, Eye, Edit, Trash, CheckCircle, Clock, Brain, Database, LineChart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import MatchSchedule from "@/components/MatchSchedule";
import LeagueTable from "@/components/LeagueTable";
import BothTeamsScored from "@/components/BothTeamsScored";
import FormTable from "@/components/FormTable";
import LeagueSeasons from "@/components/LeagueSeasons";
import LeagueEditor from "@/components/LeagueEditor";
import PredictionSystem from "@/components/PredictionSystem";
import { RovingFocusGroup, RovingFocusGroupScope } from "@radix-ui/react-roving-focus";

const Matches = () => {
  const [activeTab, setActiveTab] = useState("matches");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataUpdatedAt, setDataUpdatedAt] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to handle data refresh
  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsRefreshing(false);
      setDataUpdatedAt(new Date());
      toast.success("Data refreshed successfully", {
        description: `All match data has been updated as of ${new Date().toLocaleTimeString()}`
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {isEditing ? (
          <LeagueEditor onBack={() => setIsEditing(false)} />
        ) : (
          <>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-blue-500" />
                    V-SPORTS ELEMZŐ RENDSZER
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">Professzionális Elemzés és Predikció</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-400">
                    Last updated: {dataUpdatedAt.toLocaleString()}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    disabled={isRefreshing}
                    onClick={handleRefreshData}
                    className="bg-black/20 border-white/10 text-blue-400 h-8 w-8"
                  >
                    {isRefreshing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-4 w-4"
                      >
                        <path d="M21 2v6h-6"></path>
                        <path d="M21 13a9 9 0 1 1-3-7.7L21 8"></path>
                      </svg>
                    )}
                  </Button>
                  
                  <div className="relative flex items-center">
                    <Button variant="outline" className="bg-black/20 border-white/10 text-white flex items-center gap-2">
                      <span>2023-2024 Szezon</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {activeTab === "league-list" ? (
                <LeagueSeasons onEdit={() => setIsEditing(true)} />
              ) : (
                <div className="bg-card rounded-xl overflow-hidden border border-white/5 shadow-lg">
                  {/* Using RovingFocusGroupScope to fix the error */}
                  <RovingFocusGroupScope asChild>
                    <Tabs defaultValue="matches" className="w-full" onValueChange={setActiveTab}>
                      <RovingFocusGroup asChild orientation="horizontal">
                        <TabsList className="grid grid-cols-5 bg-muted/50 w-full rounded-none">
                          <TabsTrigger 
                            value="matches" 
                            className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                          >
                            Mérkőzések
                          </TabsTrigger>
                          <TabsTrigger 
                            value="standings" 
                            className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                          >
                            Tabella
                          </TabsTrigger>
                          <TabsTrigger 
                            value="form" 
                            className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                          >
                            Forma
                          </TabsTrigger>
                          <TabsTrigger 
                            value="bts" 
                            className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                          >
                            Gólok
                          </TabsTrigger>
                          <TabsTrigger 
                            value="prediction" 
                            className="py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-black/20"
                          >
                            Elemzés
                          </TabsTrigger>
                        </TabsList>
                      </RovingFocusGroup>
                      
                      {/* Loading State */}
                      {isLoading && (
                        <div className="flex flex-col items-center justify-center py-24 px-4">
                          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                          </div>
                          <h3 className="text-xl font-medium text-white mb-2">Adatok betöltése...</h3>
                          <p className="text-gray-400 text-center max-w-md">
                            A mérkőzés adatok frissítése és elemzése folyamatban van. Ez néhány másodpercet vehet igénybe.
                          </p>
                        </div>
                      )}
                      
                      {/* Tab Contents */}
                      {!isLoading && (
                        <>
                          <TabsContent value="matches" className="p-0 mt-0">
                            <MatchSchedule />
                          </TabsContent>
                          
                          <TabsContent value="standings" className="p-0 mt-0">
                            <LeagueTable />
                          </TabsContent>
                          
                          <TabsContent value="form" className="p-0 mt-0">
                            <FormTable />
                          </TabsContent>
                          
                          <TabsContent value="bts" className="p-0 mt-0">
                            <BothTeamsScored />
                          </TabsContent>
                          
                          <TabsContent value="prediction" className="p-0 mt-0">
                            <PredictionSystem />
                          </TabsContent>
                        </>
                      )}
                    </Tabs>
                  </RovingFocusGroupScope>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Matches;
