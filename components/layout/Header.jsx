'use client';
import React, { useState } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { LOGO_PATH, NAV_LINKS } from '../../src/data/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <header className={`sticky top-0 z-40 w-full bg-gray-950 bg-opacity-100 border-b border-gray-800/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo/Brand */}
        <Link href="/"
          className={`
            flex items-center space-x-2 text-white
            p3 md:p-5 rounded-xl shadow-xl z-50 transition-all duration-300
            bg-gray-950 transform translate-y-3 md:translate-y-6
            hover:scale-[1.2]
            hover:shadow-2xl hover:shadow-cyan-100 cursor-pointer transform hover:translate-y-3
          `}
        >
          <img src={LOGO_PATH} alt="Recursive Axis Logo" className={`h-10 md:h-20`} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
            {NAV_LINKS.map((link, index) => (
                link.type === 'menu' ? (
                    <div
                      key={index}
                      className="relative group"
                      onMouseEnter={() => setActiveMenu(link.name)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                        <button className="flex items-center text-2xl font-bold text-cyan-400 hover:text-cyan-200 transition-colors">
                            {link.name} <ChevronDown className="ml-1 w-5 h-5" />
                        </button>
                        {activeMenu === link.name && (
                            <div className="absolute left-0 top-full w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                {link.submenu.map((sub, subIndex) => (
                                    <Link
                                        key={subIndex}
                                        href={sub.href}
                                        className="block px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ) : link.type === 'external' ? (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"text-2xl font-bold text-cyan-400 hover:text-cyan-200 transition-colors"}
                    >
                        {link.name}
                    </a>
                ) : (
                    <Link
                        key={index}
                        href={link.href}
                        className={"text-2xl font-bold text-cyan-400 hover:text-cyan-200 transition-colors"}
                    >
                        {link.name}
                    </Link>
                )
            ))}
            {/* Main CTA */}
            <a
                href="https://cal.com/asitdeva"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 text-sm font-bold rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-lg flex items-center"
            >
                Book a Call <ArrowRight className="w-4 h-4 ml-1" />
            </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className={`md:hidden bg-gray-950 p-4 border-t border-gray-800 absolute w-full transition-all duration-300 transform-gpu translate-y-0 animate-in fade-in`}>
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link, index) => (
              link.type === 'menu' ? (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="text-lg font-bold text-cyan-400 text-right py-2 border-b border-gray-800">{link.name}</div>
                  <div className="flex flex-col space-y-2 pl-4">
                    {link.submenu.map((sub, subIndex) => (
                      <Link
                        key={subIndex}
                        href={sub.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-md text-gray-400 hover:text-white text-right py-1 block"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : link.type === 'external' ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-300 hover:text-white text-right py-2 border-b border-gray-800 block"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg text-gray-300 hover:text-white text-right py-2 border-b border-gray-800 block"
                >
                  {link.name}
                </Link>
              )
            ))}
            <a href="https://cal.com/asitdeva"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className={`w-full text-center font-bold py-3 rounded-lg mt-4 transition-all duration-300 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30`}>
              Book a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header;
