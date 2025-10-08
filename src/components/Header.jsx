// src/components/Header.jsx (New Component)

import React from 'react';
import { Link } from 'react-router-dom';
import { colors, LogoSVG } from './UIMain'; 

const Header = () => {
  return (
    <header className={`fixed top-0 z-50 w-full bg-[#0a0a0a] bg-opacity-90 backdrop-blur-md transition-shadow duration-300 shadow-sm`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-bold text-lg">
          {/* Link logo/name back to home route */}
          <Link to="/" className="flex items-center space-x-2">
            <LogoSVG />
            <span className={`text-white text-3xl`}>Recursive Axis</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-4">
            {/* Link to Projects Page */}
            <Link 
                to="/projects" 
                className="px-4 py-2 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:text-opacity-80"
            >
                All Projects
            </Link>

            {/* External CTA Link */}
            <a 
                href="https://cal.com/asitdeva" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`px-4 py-2 text-[#0a0a0a] rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105`}
                style={{ backgroundColor: colors.primary, color: colors.dark }} 
            >
                Book a Call
            </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;