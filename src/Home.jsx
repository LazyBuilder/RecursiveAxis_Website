// src/Home.jsx (TRADITIONAL SCROLL IMPLEMENTATION)

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

// 💡 REMOVED: lastScrollTime, SCROLL_DEBOUNCE_TIME, and isLargeScreen helper function
// These are no longer necessary for a simple scrolling website.

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  // 💡 REMOVED: activeScreen state as section tracking for navigation dots is no longer needed.

  const mainRef = useRef(null); 
  
  // This array is kept simple to pass refs for in-view animations.
  const sections = ['home', 'projects', 'services', 'philosophy', 'founder-story', 'contact'];
  const sectionsRef = useRef([]);
    
  useEffect(() => {
    sectionsRef.current = sections.map((_, i) => sectionsRef.current[i] ?? React.createRef());
  }, [sections]);

  const handleIntroComplete = () => {
    setIsLoading(false);
  };
  
  // 💡 REMOVED: scrollToSection and handleScroll functions.

  return (
    <>
      {/* Intro Overlay Logic (Remains unchanged) */}
      <AnimatePresence>
        {isLoading && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        
        {/* Header (fixed to viewport) */}
        <Header />

        {/* Main Content Sections with Traditional Scroll */}
        <main 
          ref={mainRef} 
          // 💡 CHANGES:
          // 1. Removed onScroll={handleScroll}.
          // 2. Removed snap-scroll Tailwind classes: lg:h-screen, lg:snap-y, lg:snap-mandatory.
          // The result is a standard, vertically scrolling container on all screen sizes.
          className={`w-screen relative scroll-smooth overflow-y-scroll min-h-screen bg-[${colors.light}]`}
        >
          
          {/* 💡 REMOVED: Vertical Navigation Dots component (as it was tied to snap-scroll) */}
          
          {/* Render Sections in the correct order based on the 'sections' array */}
          <HeroSection ref={sectionsRef.current[0]} />
          <RecentProjectsCarousel ref={sectionsRef.current[1]} /> 
          <ServicesSection ref={sectionsRef.current[2]} />
          <PhilosophySection ref={sectionsRef.current[3]} />
          <FounderStorySection ref={sectionsRef.current[4]} />
          <ContactCTA ref={sectionsRef.current[5]} />

        </main>

      </div>
    </>
  );
}

export default Home;