
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Database, BarChart4, PieChart, BallFootball } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import HeroSection from '@/components/Hero';
import ValueProposition from '@/components/ValueProposition';
import TopPredictions from '@/components/TopPredictions';
import BothTeamsScored from '@/components/BothTeamsScored';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import PredictionSystem from '@/components/PredictionSystem';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* New Football Analytics Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900/10 to-gray-900/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Football Analytics Platform</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Advanced analytics and insights for leagues, teams, players, and matches.
              Powered by comprehensive data analysis and visualization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/league-management" className="block">
              <div className="bg-gray-800/60 rounded-lg p-6 border border-white/10 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all">
                <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">League Management</h3>
                <p className="text-gray-400 mb-4">
                  Create and configure leagues, manage teams and matches, track standings and statistics.
                </p>
                <Button variant="link" className="text-blue-400 p-0 hover:text-blue-300">
                  Explore League Management →
                </Button>
              </div>
            </Link>

            <Link to="/teams/1" className="block">
              <div className="bg-gray-800/60 rounded-lg p-6 border border-white/10 hover:border-green-500/50 hover:bg-gray-800/80 transition-all">
                <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <BallFootball className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Team Analytics</h3>
                <p className="text-gray-400 mb-4">
                  In-depth team performance analysis, player statistics, match history, and form trends.
                </p>
                <Button variant="link" className="text-green-400 p-0 hover:text-green-300">
                  View Team Analytics →
                </Button>
              </div>
            </Link>

            <Link to="/players/1" className="block">
              <div className="bg-gray-800/60 rounded-lg p-6 border border-white/10 hover:border-purple-500/50 hover:bg-gray-800/80 transition-all">
                <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Player Statistics</h3>
                <p className="text-gray-400 mb-4">
                  Comprehensive player statistics, performance metrics, career history, and comparison tools.
                </p>
                <Button variant="link" className="text-purple-400 p-0 hover:text-purple-300">
                  Explore Player Stats →
                </Button>
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link to="/league-management/analytics">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                <BarChart4 className="mr-2 h-4 w-4" />
                Explore All Analytics Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <ValueProposition />
      <TopPredictions />
      <BothTeamsScored />
      <PredictionSystem />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
