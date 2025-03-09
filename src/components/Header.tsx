
import React, { useState, useEffect } from 'react';
import { Trophy, BarChart4, Calendar, User, Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { text: "Upcoming Matches", href: "/", icon: <Calendar className="w-4 h-4" /> },
    { text: "Leaderboard", href: "/leaderboard", icon: <BarChart4 className="w-4 h-4" /> },
    { text: "Live Matches", href: "/live", icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/50 py-3 shadow-lg' : 'py-5'}`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/"
          className="relative flex items-center gap-2 group hover-glow"
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
            <Trophy className="text-white h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">MatchPro</span>
            <span className="text-[10px] -mt-1 text-blue-400/80">Fantasy Predictor</span>
          </div>
          
          {/* Subtle hover effect */}
          <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200
                ${window.location.pathname === link.href 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {link.icon}
              {link.text}
            </Link>
          ))}
        </nav>
        
        {/* User Section */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
          >
            Log in
          </Link>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-blue-500/25 transition-all duration-300"
          >
            Sign up
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-200 hover:text-white transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-md z-40 animate-fade-in">
          <div className="p-4 flex flex-col">
            <div className="space-y-1 py-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${window.location.pathname === link.href 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-800/50 flex items-center gap-3">
              <Link 
                to="/login" 
                className="flex-1 py-3 text-center text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 border border-gray-700 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                className="flex-1 py-3 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
            
            <div className="mt-4 text-center">
              <div className="text-xs text-gray-500">© 2023 MatchPro. All rights reserved.</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
