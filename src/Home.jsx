// src/Home.jsx (ADAPTIVE SCROLL IMPLEMENTATION)

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import Utilities and Data (Paths confirmed correct for inner components)
import { colors, LogoSVG } from './components/UIMain'; 

// Import Feature Components
import IntroOverlay from './components/IntroOverlay'; 
import Header from './components/Header'; 


// Import Section Components
import HeroSection from './components/HeroSection';
import RecentProjectsCarousel from './components/RecentProjectsCarousel'; 
import ServicesSection from './components/ServicesSection';
import PhilosophySection from './components/PhilosophySection';
import FounderStorySection from './components/FounderStorySection';
import ContactCTA from './components/ContactCTA';

// Global variables for robust scroll management (DEPRECATED FOR MOBILE, BUT KEPT FOR DESKTOP SNAP)
let lastScrollTime = 0;
const SCROLL_DEBOUNCE_TIME = 1100; 
const SCROLL_DELTA_THRESHOLD = 5;

// Helper function to check if we are on a large screen (where snap is active)
const isLargeScreen = () => window.innerWidth >= 1024; // Tailwind's 'lg' breakpoint

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState(0);

  const mainRef = useRef(null); 
  
  const sections = ['home', 'projects', 'services', 'philosophy', 'founder-story', 'contact'];
  const sectionsRef = useRef([]);
    
  useEffect(() => {
    sectionsRef.current = sections.map((_, i) => sectionsRef.current[i] ?? React.createRef());
  }, [sections]);

  const handleIntroComplete = () => {
    setIsLoading(false);
  };

  // --- Snap Scroll Logic (Only active on LG screens) ---
  const scrollToSection = (index) => {
    if (!isLargeScreen() || !mainRef.current || !sectionsRef.current[index].current) return;
    
    // Smooth scroll to the section using its container's offsetTop
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
    if (!isLargeScreen() || Date.now() - lastScrollTime < SCROLL_DEBOUNCE_TIME) return;

    const main = e.target;
    let newActiveScreen = activeScreen;
    
    // Find the section closest to the top of the viewport
    sectionsRef.current.forEach((ref, index) => {
      const section = ref.current;
      if (section) {
        // Center of the section is within 50% of the viewport height
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

  return (
    <>
      <AnimatePresence>
        {isLoading && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        
        {/* Header (fixed to viewport) */}
        <Header />

        {/* Main Content Sections with Adaptive Scroll Handler */}
        <main 
          ref={mainRef} 
          onScroll={handleScroll}
          // ADAPTIVE SCROLL CLASSES:
          // Default (mobile): traditional overflow-y-scroll, min-h-screen
          // lg: (desktop): h-screen, overflow-y-scroll, snap-y snap-mandatory
          className="w-screen relative scroll-smooth overflow-y-scroll min-h-screen lg:h-screen lg:snap-y lg:snap-mandatory"
        >
          
          {/* Vertical Navigation Dots (HIDDEN ON MOBILE) */}
          <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-2 hidden lg:flex">
            {sections.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${activeScreen === index ? `bg-[${colors.primary}] scale-125` : 'bg-gray-500 hover:bg-white'}`}
                onClick={() => scrollToSection(index)}
                aria-label={`Go to section ${index + 1}`}\
              />
            ))}
          </div>
          
          {/* Render all sections, passing refs. Order fixed to match sections array. */}
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