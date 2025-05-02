
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database, FileSpreadsheet, BarChart4, Trophy, Users, Calendar, 
  PieChart, Settings, ChevronRight 
} from 'lucide-react';

import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const LeagueManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const navigate = useNavigate();

  // Feature cards for the overview page
  const featureCards = [
    {
      title: "League Creation",
      description: "Create and configure new leagues with custom rules and settings",
      icon: Trophy,
      action: () => navigate("/league-management/create"),
      color: "from-blue-500/20 to-blue-500/5",
      textColor: "text-blue-400"
    },
    {
      title: "Match Data",
      description: "Upload, view, and manage match data and results",
      icon: FileSpreadsheet,
      action: () => navigate("/league-management/matches"),
      color: "from-green-500/20 to-green-500/5",
      textColor: "text-green-400"
    },
    {
      title: "Team Management",
      description: "Manage teams, players, and squad information",
      icon: Users,
      action: () => navigate("/league-management/teams"),
      color: "from-amber-500/20 to-amber-500/5",
      textColor: "text-amber-400"
    },
    {
      title: "Analytics Dashboard",
      description: "View comprehensive analytics and statistics",
      icon: BarChart4,
      action: () => navigate("/league-management/analytics"),
      color: "from-purple-500/20 to-purple-500/5",
      textColor: "text-purple-400"
    },
    {
      title: "Schedule Management",
      description: "Create and manage match schedules and fixtures",
      icon: Calendar,
      action: () => navigate("/league-management/schedule"),
      color: "from-pink-500/20 to-pink-500/5",
      textColor: "text-pink-400"
    },
    {
      title: "League Settings",
      description: "Configure settings and customize league parameters",
      icon: Settings,
      action: () => navigate("/league-management/settings"),
      color: "from-teal-500/20 to-teal-500/5",
      textColor: "text-teal-400"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">League Management</h1>
            <p className="text-gray-400">Create, manage, and analyze football leagues and matches</p>
          </div>
          <Button
            onClick={() => navigate("/league-management/create")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create New League
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Overview
            </TabsTrigger>
            <TabsTrigger value="leagues" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              My Leagues
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featureCards.map((card, index) => (
                  <Card 
                    key={index} 
                    className="bg-gray-800/60 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    onClick={card.action}
                  >
                    <CardHeader className={`bg-gradient-to-r ${card.color} p-4`}>
                      <card.icon className={`h-6 w-6 ${card.textColor}`} />
                    </CardHeader>
                    <CardContent className="p-5">
                      <CardTitle className="text-white mb-2">{card.title}</CardTitle>
                      <CardDescription className="text-gray-400">{card.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="bg-black/20 p-3">
                      <Button 
                        variant="ghost" 
                        className={`${card.textColor} p-0 hover:bg-transparent hover:text-white flex items-center`}
                      >
                        <span>Go to {card.title}</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Quick Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gray-800/60 border border-white/10">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <Trophy className="h-6 w-6 text-blue-400 mb-3" />
                    <p className="text-gray-400 text-sm">Active Leagues</p>
                    <p className="text-3xl font-bold text-white">5</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/60 border border-white/10">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <FileSpreadsheet className="h-6 w-6 text-green-400 mb-3" />
                    <p className="text-gray-400 text-sm">Total Matches</p>
                    <p className="text-3xl font-bold text-white">248</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/60 border border-white/10">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <Users className="h-6 w-6 text-amber-400 mb-3" />
                    <p className="text-gray-400 text-sm">Teams</p>
                    <p className="text-3xl font-bold text-white">64</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/60 border border-white/10">
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <BarChart4 className="h-6 w-6 text-purple-400 mb-3" />
                    <p className="text-gray-400 text-sm">Analytics Reports</p>
                    <p className="text-3xl font-bold text-white">12</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leagues">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">My Leagues</h2>
                <p className="text-gray-400">Your created leagues will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Analytics Overview</h2>
                <p className="text-gray-400">League analytics and statistics will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-800/60 border border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">League Management Settings</h2>
                <p className="text-gray-400">Customize your league management experience.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeagueManagement;
