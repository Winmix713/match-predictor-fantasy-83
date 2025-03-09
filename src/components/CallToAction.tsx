
import React from 'react';
import { ArrowRight, CheckCircle, Trophy as TrophyIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  const benefits = [
    "Access to all prediction features",
    "Join exclusive prediction leagues",
    "Track your performance with detailed analytics",
    "Compete for rewards and prizes"
  ];
  
  return (
    <section className="py-20 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/10 to-transparent opacity-40"></div>
        
        {/* Animated glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl animate-pulse-subtle"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900/90 via-gray-900/95 to-black/95 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 shadow-2xl">
          {/* Top border gradient */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
          
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Ready to Test Your Prediction Skills?
                </h2>
                <p className="text-gray-300 mb-8">
                  Join thousands of sports fans who are making predictions, competing with friends, and climbing the leaderboards.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/signup"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300"
                  >
                    Create Free Account
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  
                  <Link 
                    to="/explore"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-medium px-6 py-3 rounded-lg border border-white/10 transition-all duration-300"
                  >
                    Explore Matches
                  </Link>
                </div>
              </div>
              
              {/* Decorative image/illustration side */}
              <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden">
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl"></div>
                
                {/* Trophy illustration with glow effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse-subtle"></div>
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                      <TrophyIcon className="text-white h-16 w-16" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative particles */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-blue-400"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.2,
                        animation: `pulse-subtle ${Math.random() * 2 + 2}s infinite`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
