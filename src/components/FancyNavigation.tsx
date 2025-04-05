
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FancyNavigation.css';

interface NavItem {
  text: string;
  href: string;
  icon: React.ReactNode;
}

const FancyNavigation: React.FC<{ navLinks: NavItem[] }> = ({ navLinks }) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-1 py-1">
        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.href;
          
          return (
            <Link
              key={index}
              to={link.href}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl transition-all duration-300
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {link.icon}
              {link.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FancyNavigation;
