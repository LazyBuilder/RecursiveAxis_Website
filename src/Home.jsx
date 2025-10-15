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
    
  // Get colors directly for the background class interpolation
  const { light } = colors;

  useEffect(() => {
    sectionsRef.current = sections.map((_, i) => sectionsRef.current[i] ?? React.createRef());
  }, [sections]);

  // Handler for the Intro Overlay completion
  const handleIntroComplete = () => {
    setIsLoading(false);
  };
  
  // Custom scroll logic to enforce snapping on desktop
  const handleScroll = (e) => {
    if (!isLargeScreen()) {
      return;
    }
    
    // Throttle scroll events to prevent rapid snapping
    const now = Date.now();
    if (now - lastScrollTime < SCROLL_DEBOUNCE_TIME) {
      return;
    }
    lastScrollTime = now;

    // Determine scroll direction
    const container = mainRef.current;
    if (!container) return;

    const scrollDirection = container.scrollTop > container.lastScrollTop ? 1 : -1;
    container.lastScrollTop = container.scrollTop;

    // Find the next active screen based on direction
    let nextScreen = activeScreen + scrollDirection;
    
    // Clamp the next screen index
    nextScreen = Math.max(0, Math.min(sections.length - 1, nextScreen));

    // Only scroll if the screen actually changed
    if (nextScreen !== activeScreen) {
      scrollToSection(nextScreen);
    }
  };
  
  // Function to scroll to a specific section by index
  const scrollToSection = (index) => {
    const targetRef = sectionsRef.current[index];
    if (targetRef && targetRef.current) {
      setActiveScreen(index);
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
      // Debounce scroll for manual navigation as well
      lastScrollTime = Date.now(); 
    }
  };


  return (
    // Outer container ensures the full viewport is covered
    <div className="w-screen min-h-screen bg-[#f7f7f7]">
      {/* Intro Overlay */}
      <AnimatePresence>
        {isLoading && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        
        {/* Header (fixed to viewport) */}
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
          <ServicesSection ref={sectionsRef.current[1]} />
          <RecentProjectsCarousel ref={sectionsRef.current[2]} />
          <PhilosophySection ref={sectionsRef.current[3]} />
          <FounderStorySection ref={sectionsRef.current[4]} />
          {/* ContactCTA is the final scrollable section (ID: contact) */}
          <ContactCTA ref={sectionsRef.current[5]} />

        </main>
        
      </div>
    </div>
  );
};

export default Home;