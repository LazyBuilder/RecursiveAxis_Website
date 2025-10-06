// src/components/Home.jsx (PROJECTS CAROUSEL INTEGRATION)

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

// Import Utilities and Data
import { colors, LogoSVG } from './UIMain';

// Import Feature Components
import IntroOverlay from './IntroOverlay'; 

// Import Section Components
import HeroSection from './HeroSection';
// --- START CHANGE 1: Import the new component (assuming it's named) ---
import RecentProjectsCarousel from './RecentProjectsCarousel'; // New component
import ServicesSection from './ServicesSection';
import PhilosophySection from './PhilosophySection';
import FounderStorySection from './FounderStorySection';
import ContactCTA from './ContactCTA';

// Global variables for robust scroll management
let lastScrollTime = 0;
// Increased debounce time to 1100ms to cover the full smooth scroll duration
const SCROLL_DEBOUNCE_TIME = 1100; 
// Threshold to ignore tiny residual scroll events (important for trackpads)
const SCROLL_DELTA_THRESHOLD = 5;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState(0);

  const mainRef = useRef(null); // Ref for the main scroll container
  
  // --- START CHANGE 2: Update the sections array ---
  // Replaced 'trusted' with 'projects'
  const sections = ['home', 'projects', 'services', 'philosophy', 'founder-story', 'contact'];
  // --- END CHANGE 2 ---

  const sectionsRef = useRef([]);
    
  // Initialize refs for each section
  useEffect(() => {
    sectionsRef.current = sections.map((_, i) => sectionsRef.current[i] ?? React.createRef());
  }, [sections]);

  const handleIntroComplete = () => {
    setIsLoading(false);
  };

  const scrollToSection = (index) => {
    if (sectionsRef.current[index]?.current) {
      sectionsRef.current[index].current.scrollIntoView({ behavior: 'smooth' });
      setActiveScreen(index);
    }
  };

  // --- REVISED: Custom Scroll Handling Function with Delta Threshold ---
  const handleScroll = (event) => {
    // CRUCIAL: Immediately prevent default behavior to stop the native scroll jump
    event.preventDefault();

    const currentTime = new Date().getTime();
    
    // 1. Time-based debounce check. If a scroll was recently executed, exit immediately.
    if (isLoading || currentTime - lastScrollTime < SCROLL_DEBOUNCE_TIME) { 
        return;
    }
    
    // Determine direction and apply the delta threshold
    let direction = 0;
    if (event.deltaY > SCROLL_DELTA_THRESHOLD) {
        direction = 1; // Scroll Down
    } else if (event.deltaY < -SCROLL_DELTA_THRESHOLD) {
        direction = -1; // Scroll Up
    }

    // Ignore non-vertical scroll events or movements below the threshold
    if (direction === 0) return;
    
    let nextIndex = activeScreen + direction;

    // Boundary check
    if (nextIndex >= 0 && nextIndex < sections.length) {
        
        // 2. Lock: Update the time only when a successful scroll is initiated
        lastScrollTime = currentTime; 

        scrollToSection(nextIndex);
    }
  };
    
  // Intersection Observer to track active section
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            setActiveScreen(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7, 
      }
    );

    // Attach observer to section elements
    sectionsRef.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup observer
    return () => {
      sectionsRef.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [isLoading]);

  // Attach Scroll Handler to Main Content
  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement && !isLoading) {
      // Use { passive: false } to allow event.preventDefault() inside handleScroll
      mainElement.addEventListener('wheel', handleScroll, { passive: false }); 
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('wheel', handleScroll);
      }
    };
  }, [isLoading, activeScreen]);

  return (
    // Universal background color removed to enable section-specific backgrounds
    <div className={`font-sans antialiased overflow-hidden w-screen h-screen`}>
      {/* Inline Styles (omitted for brevity, assume they remain unchanged) */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto+Mono:wght@700&display=swap');
          
          body { 
            font-family: 'Poppins', sans-serif; 
            background-color: #f7f7f7; /* Default light background */
            color: #1a1a1a; /* Default dark text color */
          }
          /* ... other styles remain the same ... */
          
          .no-scrollbar::-webkit-scrollbar { display: none; }
          
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
          
          .bg-grid-white {
            background-image: linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px);
            background-size: 40px 40px;
          }

          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 45s linear infinite;
            width: max-content;
          }

          .bg-radiant-pulse {
            background: radial-gradient(circle, rgba(0,234,255,0.1), transparent 70%);
            animation: radiant-pulse 6s ease-in-out infinite;
          }

          @keyframes radiant-pulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.8; }
          }
        `}
      </style>

      {/* Intro Overlay */}
      <AnimatePresence>
        {isLoading && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Content (Hidden until Intro is complete) */}
      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        
        {/* Header */}
        <header className={`fixed top-0 z-50 w-full bg-[#0a0a0a] bg-opacity-90 backdrop-blur-md transition-shadow duration-300 shadow-sm`}>
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 font-bold text-lg">
              <LogoSVG />
              <span className={`text-white`}>Recursive Axis Digital Services</span>
            </div>
            <a 
              href="https://cal.com/asitdeva" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`px-4 py-2 text-[#0a0a0a] rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105`}
              // Set the background color explicitly using the variable
              style={{ backgroundColor: colors.primary, color: colors.dark }} 
            >
              Book a Call
            </a>
          </div>
        </header>

        {/* Main Content Sections with Custom Scroll Handler */}
        <main 
          ref={mainRef} // Attach ref for event listener
          className="w-screen min-h-screen overflow-y-scroll scroll-smooth relative h-full"
        >
          
          {/* Vertical Navigation Dots */}
          <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-2">
            {sections.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${activeScreen === index ? `bg-[${colors.primary}] scale-125` : 'bg-gray-500 hover:bg-white'}`}
                onClick={() => scrollToSection(index)}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Render all sections, passing refs */}
          <HeroSection ref={sectionsRef.current[0]} />
          {/* --- START CHANGE 3: Render the new component --- */}
          <RecentProjectsCarousel ref={sectionsRef.current[1]} /> 
          {/* --- END CHANGE 3 --- */}
          <ServicesSection ref={sectionsRef.current[2]} />
          <PhilosophySection ref={sectionsRef.current[3]} />
          <FounderStorySection ref={sectionsRef.current[4]} />
          <ContactCTA ref={sectionsRef.current[5]} />

        </main>
      </div>
    </div>
  );
};

export default App;