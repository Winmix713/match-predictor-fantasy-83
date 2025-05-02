
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Matches from "./pages/Matches";
import NotFound from "./pages/NotFound";
import AdvancedPattern from "./pages/AdvancedPattern";
import Analysis from "./pages/Analysis";
import League from "./pages/League";
import Brandbook from "./components/Brandbook";
import LeagueManagement from "./pages/LeagueManagement";
import LeagueCreate from "./pages/LeagueCreate";
import LeagueAnalytics from "./pages/LeagueAnalytics";
import TeamDetails from "./pages/TeamDetails";
import PlayerDetails from "./pages/PlayerDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/advanced-pattern" element={<AdvancedPattern />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/league" element={<League />} />
          <Route path="/league-management" element={<LeagueManagement />} />
          <Route path="/league-management/create" element={<LeagueCreate />} />
          <Route path="/league-management/analytics" element={<LeagueAnalytics />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/players/:id" element={<PlayerDetails />} />
          <Route path="/brandbook" element={<Brandbook />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
