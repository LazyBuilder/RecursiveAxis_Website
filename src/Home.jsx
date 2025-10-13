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
    
  useEffect(() => {
    // Initialize or assign refs for each section
    sectionsRef.current = sections.map((_, i) => sectionsRef.current[i] ?? React.createRef());
  }, [sections]);

  const handleIntroComplete = () => {
    setIsLoading(false);
  };

  // --- Snap Scroll Logic (Only active on LG screens for programmatic jumps) ---
  const scrollToSection = (index) => {
    if (!isLargeScreen() || !mainRef.current || !sectionsRef.current[index].current) return;
    
    const targetElement = sectionsRef.current[index].current;
    if (targetElement) {
        mainRef.current.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
        });
        setActiveScreen(index);
        lastScrollTime = Date.now();
    }
  };

  const handleScroll = (e) => {
    // Only run snap-scroll logic on large screens
    if (!isLargeScreen() /*|| Date.now() - lastScrollTime < SCROLL_DEBOUNCE_TIME*/) return;

    const main = e.target;
    let newActiveScreen = activeScreen;
    
    // Logic to determine which section is currently active (closest to viewport center)
    sectionsRef.current.forEach((ref, index) => {
      const section = ref.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= main.clientHeight / 2 && rect.bottom >= main.clientHeight / 2) {
          newActiveScreen = index;
        }
      }
    });

    if (newActiveScreen !== activeScreen) {
      setActiveScreen(newActiveScreen);
    }
  };
  // --------------------------------------------------------

  // Destructure colors for use in injected CSS
  const { primary, secondary } = colors;

  return (
    <>
      {/* 🚨 FIX 1: Global CSS injection for animated-gradient and Tag Box. 
          This makes the 'animated-gradient' class available to ALL child components. */}
      <style global jsx>{`
        .animated-gradient {
            background: linear-gradient(45deg, ${primary}, ${secondary}, ${primary});
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: global-gradient-shift 10s ease infinite; 
        }
        @keyframes global-gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .tag-box {
            font-size: 0.75rem; 
            font-weight: 700; 
            letter-spacing: 0.1em; 
            text-transform: uppercase;
            padding-bottom: 0.5rem; 
            border-bottom-width: 2px;
        }
      `}</style>

      <AnimatePresence>
        {isLoading && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        
        {/* Header: Fixed position, imported from './components/Header'. */}
        <Header />

        {/* Main Scroll Container (Adaptive) */}
        <main 
          ref={mainRef} 
          onScroll={handleScroll}
          // ADAPTIVE SCROLL CLASSES: Default (mobile) uses min-h-screen for natural scroll.
          // lg: (desktop) activates h-screen and snap-scrolling.
          className="w-screen relative scroll-smooth overflow-y-scroll min-h-screen lg:h-screen lg:snap-y lg:snap-mandatory"
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
          <RecentProjectsCarousel ref={sectionsRef.current[2]} /> 
          <ServicesSection ref={sectionsRef.current[1]} />
          <PhilosophySection ref={sectionsRef.current[3]} />
          <FounderStorySection ref={sectionsRef.current[4]} />
          <ContactCTA ref={sectionsRef.current[5]} />

        </main>
      </div>
    </>
  );
};

export default Home;