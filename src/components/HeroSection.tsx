
import React from 'react';
import { ChevronRight, Users, Award, TrendingUp, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-blue-950/20 to-black/95"></div>
        
        {/* Animated radial gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.15),transparent_45%)]"></div>
        
        {/* Animated dot pattern overlay with refined animation */}
        <div className="absolute inset-0 opacity-30"
             style={{
               backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)',
               backgroundSize: '30px 30px',
               backgroundPosition: '0 0',
             }}>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/40 animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated orbs with glassmorphism */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[250px] rounded-full bg-indigo-500/5 blur-3xl animate-pulse-subtle" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content with Enhanced Typography and Microinteractions */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-full backdrop-blur-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <p className="text-xs font-medium text-blue-300">Tippelj mérkőzésekre és nyerj jutalmakat</p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight animate-slide-in-bottom" style={{animationDelay: '0.1s'}}>
              <span className="block mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">Emeld új szintre </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500">mérkőzés tippjeidet</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-xl animate-slide-in-bottom" style={{animationDelay: '0.3s'}}>
              Csatlakozz ezrekhez, akik tippelési tudásukat tesztelik és versenyeznek, hogy a ranglista élére kerüljenek.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-slide-in-bottom" style={{animationDelay: '0.5s'}}>
              <Link 
                to="/signup"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-7 py-3.5 rounded-xl shadow-[0_8px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_25px_rgba(59,130,246,0.5)] transition-all duration-300"
              >
                <span className="relative z-10">Kezdj el tippelni most</span>
                <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              </Link>
              
              <Link 
                to="/how-it-works"
                className="group inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-medium px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span>Hogyan működik</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform duration-300" />
              </Link>
            </div>
            
            {/* Stats with Neomorphic Cards */}
            <div className="grid grid-cols-3 gap-4 pt-8 animate-slide-in-bottom" style={{animationDelay: '0.7s'}}>
              {/* Users Stat */}
              <div className="flex flex-col bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-blue-400">Felhasználók</span>
                </div>
                <span className="text-2xl font-bold">10K+</span>
                <span className="text-xs text-gray-400">Aktív tippelő</span>
              </div>
              
              {/* Accuracy Stat */}
              <div className="flex flex-col bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Award className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-blue-400">Pontosság</span>
                </div>
                <span className="text-2xl font-bold">87%</span>
                <span className="text-xs text-gray-400">Legjobb tippelő</span>
              </div>
              
              {/* Matches Stat */}
              <div className="flex flex-col bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:border-blue-500/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-blue-400">Mérkőzések</span>
                </div>
                <span className="text-2xl font-bold">5K+</span>
                <span className="text-xs text-gray-400">Tipp naponta</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image with Advanced Glassmorphism and 3D Effects */}
          <div className="relative mx-auto lg:mx-0 animate-slide-in-right" style={{animationDelay: '0.5s'}}>
            <div className="relative h-[500px] w-[500px] max-w-full">
              {/* Glowing orb backdrop with blur effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/15 blur-3xl animate-pulse-subtle"></div>
              
              {/* Decorative rings */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 animate-float" style={{animationDuration: '15s'}}></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-blue-500/10 animate-float" style={{animationDuration: '20s', animationDelay: '0.5s'}}></div>
              
              {/* Content container with enhanced glass effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] h-[420px] rounded-[2rem] overflow-hidden backdrop-blur-xl bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-gray-900/80 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] transform rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:shadow-[0_30px_80px_rgba(59,130,246,0.2)]">
                  {/* Match card preview with refined UI */}
                  <div className="h-full w-full p-8 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <div className="bg-blue-500/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-blue-400/20">
                        <span className="text-xs font-medium text-blue-300">Élő mérkőzés</span>
                      </div>
                      <div className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-blue-400/10">21:00</div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-col items-center">
                        <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                          <img 
                            src="https://media.api-sports.io/football/teams/42.png" 
                            alt="Arsenal" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-white">Arsenal</span>
                        <span className="text-xs text-blue-400 mt-1">Otthon</span>
                      </div>
                      
                      <div className="flex flex-col items-center mx-4">
                        <div className="text-lg font-bold mb-1 text-gray-400">VS</div>
                        <div className="text-xs text-blue-400 py-1 px-3 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-400/10 animate-pulse-subtle">Élő</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-18 h-18 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-white/5 mb-3 p-4 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                          <img 
                            src="https://media.api-sports.io/football/teams/49.png" 
                            alt="Chelsea" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-white">Chelsea</span>
                        <span className="text-xs text-blue-400 mt-1">Vendég</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="mb-4">
                        <div className="text-xs text-gray-400 mb-2">Tipp esélyek</div>
                        <div className="flex gap-1 items-center">
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{width: '42%'}}></div>
                          </div>
                          <span className="text-xs text-blue-400 min-w-[30px] text-right">42%</span>
                        </div>
                        <div className="flex gap-1 items-center mt-1.5">
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-500 rounded-full" style={{width: '28%'}}></div>
                          </div>
                          <span className="text-xs text-gray-400 min-w-[30px] text-right">28%</span>
                        </div>
                        <div className="flex gap-1 items-center mt-1.5">
                          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{width: '30%'}}></div>
                          </div>
                          <span className="text-xs text-blue-400 min-w-[30px] text-right">30%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                          Hazai
                        </button>
                        <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                          Döntetlen
                        </button>
                        <button className="bg-gradient-to-br from-white/10 to-white/5 text-xs text-white rounded-lg py-2.5 backdrop-blur-sm border border-white/10 hover:border-blue-400/20 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(59,130,246,0.2)]">
                          Vendég
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute top-[20%] right-[5%] w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-blue-600/30 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.3)] animate-float" style={{animationDuration: '4s'}}>
                <Trophy className="text-white h-5 w-5" />
              </div>
              <div className="absolute bottom-[15%] left-[10%] w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_4px_20px_rgba(139,92,246,0.3)] animate-float" style={{animationDuration: '5s', animationDelay: '1s'}}>
                <Award className="text-white h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
