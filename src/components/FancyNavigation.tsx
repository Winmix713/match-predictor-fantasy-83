
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
    <div className="hidden md:block">
      <div className="area">
        <div className="area-wrapper">
          <div className="wrapper">
            <div className="frame">
              <div className="frame-inner"></div>
              <div className="frame-black"></div>
              <div className="frame-buttons">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.href;
                  const wrapClass = `wrap wrap-${index + 1}`;
                  
                  return (
                    <div key={index} className={wrapClass}>
                      <input 
                        type="radio" 
                        name="r" 
                        checked={isActive}
                        onChange={() => {}} // React requires onChange for controlled components
                      />
                      <Link to={link.href} className={`button button-${index + 1}`}>
                        <span>
                          {link.text}
                          {index === 0 && (
                            <svg height="24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 4.5v15m0-15-6 6m6-6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                          {index === 1 && (
                            <div className="play">
                              <span className="play-text">▶</span>
                            </div>
                          )}
                        </span>
                      </Link>
                      <div className="layer layer-1"></div>
                      <div className="layer layer-2"></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="noise"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyNavigation;
