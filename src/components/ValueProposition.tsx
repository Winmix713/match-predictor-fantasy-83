
import React from 'react';
import { Trophy, Users, LineChart, Zap, Award, Shield } from 'lucide-react';

const ValueProposition = () => {
  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-blue-500" />,
      title: "Track Your Success",
      description: "Keep track of all your predictions and see detailed statistics on your performance over time."
    },
    {
      icon: <LineChart className="w-8 h-8 text-blue-500" />,
      title: "Real-Time Updates",
      description: "Get live match updates, instant results, and see how your predictions fare in real-time."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Compete with Friends",
      description: "Create private leagues, invite friends, and compete to see who has the best prediction skills."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Smart Insights",
      description: "Access team statistics, form guides, and head-to-head records to make informed predictions."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: "Earn Rewards",
      description: "Climb the leaderboards and earn points that can be exchanged for exclusive rewards and prizes."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Secure Platform",
      description: "Your data is protected with industry-standard security measures and full transparency."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f620_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Why Choose MatchPro
          </h2>
          <p className="text-gray-400">
            Our platform offers everything you need to elevate your match prediction experience
            and compete with fellow sports enthusiasts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 group"
            >
              <div className="w-14 h-14 rounded-lg bg-blue-500/10 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
