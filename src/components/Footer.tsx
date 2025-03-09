
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Twitter, Instagram, Facebook, Mail, Trophy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-black/70 backdrop-blur-sm pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <Trophy className="text-white h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300">MatchPro</span>
                <span className="text-[10px] -mt-1 text-blue-400/80">Fantasy Predictor</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Make your predictions on upcoming matches and compete with friends to see who's the ultimate sports oracle.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Home</Link>
              </li>
              <li>
                <Link to="/upcoming" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Upcoming Matches</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Leaderboard</Link>
              </li>
              <li>
                <Link to="/live" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Live Matches</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/support" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Support</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">FAQ</Link>
              </li>
              <li>
                <Link to="/rules" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Game Rules</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Contact Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2023 MatchPro Fantasy Predictor. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center">
              Made with <Heart className="h-3 w-3 text-red-500 mx-1" /> for sports fans everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
