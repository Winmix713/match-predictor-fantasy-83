
// This file lists the routes for the application.
// The actual App.tsx file needs to be updated to include these routes
// as we can't directly modify App.tsx in this request.

export const appRoutes = [
  { path: "/", component: "Index" },
  { path: "/league", component: "League" },
  { path: "/matches", component: "Matches" },
  { path: "/advanced-pattern", component: "AdvancedPattern" },
  { path: "/analysis", component: "Analysis" },
  { path: "/league-management", component: "LeagueManagement" },
  { path: "*", component: "NotFound" }
];

// Usage in App.tsx would be:
/*
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./App.routes";
import Index from "./pages/Index";
import League from "./pages/League";
import Matches from "./pages/Matches";
import AdvancedPattern from "./pages/AdvancedPattern";
import Analysis from "./pages/Analysis";
import LeagueManagement from "./pages/LeagueManagement";
import NotFound from "./pages/NotFound";

const components = {
  Index,
  League,
  Matches,
  AdvancedPattern,
  Analysis,
  LeagueManagement,
  NotFound,
};

function App() {
  return (
    <Routes>
      {appRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={React.createElement(components[component])} />
      ))}
    </Routes>
  );
}
*/
