
import React, { useState } from 'react';
import { ChevronLeft, ChevronDown, BarChart3, Search, Plus, Eye, Edit, Trash, CheckCircle, Clock, Brain, Database, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import MatchSchedule from "@/components/MatchSchedule";
import LeagueTable from "@/components/LeagueTable";
import BothTeamsScored from "@/components/BothTeamsScored";
import FormTable from "@/components/FormTable";
import LeagueSeasons from "@/components/LeagueSeasons";
import LeagueEditor from "@/components/LeagueEditor";
import PredictionSystem from "@/components/PredictionSystem";

const Matches = () => {
  const [activeTab, setActiveTab] = useState("matches");
  const [isEditing, setIsEditing] = useState(false);
  
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
                  <Tabs defaultValue="matches" className="w-full" onValueChange={setActiveTab}>
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
                  </Tabs>
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
