
import React from 'react';
import { ChevronRight, Users, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center pt-24 pb-10 overflow-hidden">
      {/* Background gradient & effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-blue-950/20 to-black/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_45%)]"></div>
        
        {/* Animated dot pattern overlay */}
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)',
               backgroundSize: '40px 40px',
               backgroundPosition: '0 0',
             }}>
        </div>
        
        {/* Animated subtle pulse on hero section */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 animate-pulse-subtle blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 py-1.5 px-3 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <p className="text-xs font-medium text-blue-400">Predict matches and win rewards</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Elevate Your </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">Match Predictions</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-xl">
              Join thousands of fans who are testing their prediction skills and competing to reach the top of the leaderboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300"
              >
                Start Predicting Now
                <ChevronRight className="w-5 h-5" />
              </Link>
              
              <Link 
                to="/how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg border border-white/10 transition-all duration-300"
              >
                How It Works
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Users</span>
                </div>
                <span className="text-2xl font-bold">10K+</span>
                <span className="text-xs text-gray-400">Active Predictors</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <Award className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Accuracy</span>
                </div>
                <span className="text-2xl font-bold">87%</span>
                <span className="text-xs text-gray-400">Top Predictor</span>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Matches</span>
                </div>
                <span className="text-2xl font-bold">5K+</span>
                <span className="text-xs text-gray-400">Predicted Daily</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative mx-auto lg:mx-0">
            <div className="relative h-[450px] w-[450px] max-w-full">
              {/* Main circular gradient backdrop */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/10 blur-xl animate-pulse-subtle"></div>
              
              {/* Content container with glass effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] h-[380px] rounded-[40px] overflow-hidden backdrop-blur-sm bg-gray-900/60 border border-white/10 shadow-2xl transform rotate-3 transition-all duration-500 hover:rotate-0">
                  {/* Example match card preview */}
                  <div className="h-full w-full p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="bg-blue-500/20 rounded-full px-3 py-1">
                        <span className="text-xs font-medium text-blue-400">Live Match</span>
                      </div>
                      <div className="text-xs text-gray-400">21:00 GMT</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-800 mb-2 flex items-center justify-center">
                          <img 
                            src="https://media.api-sports.io/football/teams/42.png" 
                            alt="Arsenal" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-white">Arsenal</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold mb-1 text-white">VS</div>
                        <div className="text-xs text-blue-400">Predict now</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-800 mb-2 flex items-center justify-center">
                          <img 
                            src="https://media.api-sports.io/football/teams/49.png" 
                            alt="Chelsea" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-white">Chelsea</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="grid grid-cols-3 gap-2">
                        <button className="bg-white/10 hover:bg-white/15 text-xs text-white rounded-lg py-2 transition-colors duration-200">
                          Home Win
                        </button>
                        <button className="bg-white/10 hover:bg-white/15 text-xs text-white rounded-lg py-2 transition-colors duration-200">
                          Draw
                        </button>
                        <button className="bg-white/10 hover:bg-white/15 text-xs text-white rounded-lg py-2 transition-colors duration-200">
                          Away Win
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
