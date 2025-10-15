// src/Home.jsx
// Main application container managing navigation, scrolling, and global styles.

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Utility Imports: colors provides global palette, imported from UIMain.jsx
import { colors } from './components/UIMain'; 

// Component Imports (Foreign Links)
import IntroOverlay from './components/IntroOverlay'; 
import Header from './components/Header'; 
import HeroSection from './components/HeroSection';
import RecentProjectsCarousel from './components/RecentProjectsCarousel'; 
import ServicesSection from './components/ServicesSection';
import PhilosophySection from './components/PhilosophySection';
import FounderStorySection from './components/FounderStorySection';
import ContactCTA from './components/ContactCTA';

// Global variables for robust scroll management (Primarily for desktop snap logic)
let lastScrollTime = 0;
const SCROLL_DEBOUNCE_TIME = 1100; 

// Helper function to detect large screens (where snap-scroll is active)
const isLargeScreen = () => window.innerWidth >= 1024; // Corresponds to Tailwind's 'lg' breakpoint

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState(0);

  const mainRef = useRef(null); 
  
  // NOTE: This array defines the canonical order of sections and corresponds to ref indices.
  const sections = ['home', 'projects', 'services', 'philosophy', 'founder-story', 'contact'];
  const sectionsRef = useRef([]);
    
  // 1. Initialize Refs
  useEffect(() => {
    sectionsRef.current = sections.map((_, i) => sectionsRef.current[i] ?? React.createRef());
  }, [sections]);

  // 2. Handle Intro Completion
  const handleIntroComplete = () => {
    setIsLoading(false);
  };

  // 3. Scroll Utility Function (Used by the vertical dots)
  const scrollToSection = (index) => {
    const section = sectionsRef.current[index]?.current;
    if (section) {
      // Use the native scrollIntoView for smooth scrolling
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4. Scroll Handler for Active Screen Tracking (Desktop Snap-Scroll Only)
  const handleScroll = () => {
    if (!isLargeScreen() || !mainRef.current) return;

    const currentTime = Date.now();
    if (currentTime - lastScrollTime < SCROLL_DEBOUNCE_TIME) {
      return; // Debounce
    }

    const mainElement = mainRef.current;
    
    // Find the section closest to the top of the viewport
    let bestMatchIndex = activeScreen; // Default to current
    let minDistance = Infinity;

    sectionsRef.current.forEach((ref, index) => {
      const element = ref.current;
      if (element) {
        // Get bounding box relative to the viewport
        const rect = element.getBoundingClientRect();
        // Distance is the absolute value of the rect.top (how far it is from 0)
        const distance = Math.abs(rect.top); 

        // If the element is within 50% of the viewport AND closer than the current best match
        if (distance < minDistance) {
          minDistance = distance;
          bestMatchIndex = index;
        }
      }
    });

    if (bestMatchIndex !== activeScreen) {
        setActiveScreen(bestMatchIndex);
    }
    
    lastScrollTime = currentTime;
  };

  // Define light color for main background class
  const light = colors.light.replace('#', ''); 

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-gray-800">
      
      {/* 1. Introductory Overlay */}
      <AnimatePresence>
        {isLoading && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* 2. Main Content Wrapper */}
      {/* The `hidden` class is only applied until the IntroOverlay is finished. */}
      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        
        {/* Header (fixed to viewport) - Always visible */}
        <Header />

        {/* Main Content Sections with Custom Scroll Handler */}
        <main 
          ref={mainRef} 
          onScroll={handleScroll}
          // Set DEFAULT background to light
          className={`w-screen relative scroll-smooth overflow-y-scroll min-h-screen lg:h-screen lg:snap-y lg:snap-mandatory bg-[${light}]`}
        >
          
          {/* Vertical Navigation Dots (Hidden on mobile via 'hidden lg:flex') */}
          <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-2 hidden lg:flex">
            {sections.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${activeScreen === index ? `bg-[${colors.primary}] scale-125` : 'bg-gray-500 hover:bg-white'}`}
                onClick={() => scrollToSection(index)}
                aria-label={`Go to section ${index + 1}`} 
              />
            ))}
          </div>
          
          {/* Render Sections in the correct order based on the 'sections' array */}
          <HeroSection ref={sectionsRef.current[0]} />
          <RecentProjectsCarousel ref={sectionsRef.current[1]} /> 
          <ServicesSection ref={sectionsRef.current[2]} />
          <PhilosophySection ref={sectionsRef.current[3]} />
          <FounderStorySection ref={sectionsRef.current[4]} />
          {/* ContactCTA is the final scrollable section (ID: contact) */}
          <ContactCTA ref={sectionsRef.current[5]} />

        </main>
      </div>

      {/* Custom Global CSS for the Hero's gradient text */}
      <style>
      {`
        .animated-gradient {
            background: linear-gradient(45deg, ${colors.primary}, ${colors.secondary}, ${colors.primary});
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-animation 15s ease infinite;
        }
        @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        /* Style for ContactCTA's background pulse */
        .bg-radiant-pulse {
            background: radial-gradient(circle at center, rgba(0, 234, 255, 0.1), rgba(0, 234, 255, 0) 50%);
            animation: pulse 8s infinite alternate ease-in-out;
        }
        @keyframes pulse {
            0% { transform: scale(0.9); opacity: 0.5; }
            100% { transform: scale(1.1); opacity: 0.8; }
        }
      `}
      </style>
    </div>
  );
};

export default Home;