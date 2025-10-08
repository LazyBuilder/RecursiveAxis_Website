// src/Home.jsx

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

// Global variables for robust scroll management
let lastScrollTime = 0;
const SCROLL_DEBOUNCE_TIME = 1100; 
const SCROLL_DELTA_THRESHOLD = 5;

// Component name is correctly set to Home
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

  const scrollToSection = (index) => {
    if (sectionsRef.current[index]?.current) {
      sectionsRef.current[index].current.scrollIntoView({ behavior: 'smooth' });
      setActiveScreen(index);
    }
  };

  const handleScroll = (event) => {
    event.preventDefault();

    const currentTime = new Date().getTime();
    
    if (isLoading || currentTime - lastScrollTime < SCROLL_DEBOUNCE_TIME) { 
        return;
    }
    
    let direction = 0;
    if (event.deltaY > SCROLL_DELTA_THRESHOLD) {
        direction = 1; 
    } else if (event.deltaY < -SCROLL_DELTA_THRESHOLD) {
        direction = -1; 
    }

    if (direction === 0) return;
    
    let nextIndex = activeScreen + direction;

    if (nextIndex >= 0 && nextIndex < sections.length) {
        lastScrollTime = currentTime; 
        scrollToSection(nextIndex);
    }
  };
    
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

    sectionsRef.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionsRef.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [isLoading]);

  useEffect(() => {
    const mainElement = mainRef.current;
    if (mainElement && !isLoading) {
      mainElement.addEventListener('wheel', handleScroll, { passive: false }); 
    }
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('wheel', handleScroll);
      }
    };
  }, [isLoading, activeScreen]);

  return (
    <div className={`font-sans antialiased overflow-hidden w-screen h-screen`}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto+Mono:wght@700&display=swap');
          
          body { 
            font-family: 'Poppins', sans-serif; 
            background-color: #f7f7f7; 
            color: #1a1a1a; 
          }
          
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

      {/* Main Content */}
      <div className={`${isLoading ? 'hidden' : 'block'}`}>
        
        {/* Header (fixed to viewport) */}
        <Header />

        {/* Main Content Sections with Custom Scroll Handler */}
        <main 
          ref={mainRef} 
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
          <RecentProjectsCarousel ref={sectionsRef.current[1]} /> 
          <ServicesSection ref={sectionsRef.current[2]} />
          <PhilosophySection ref={sectionsRef.current[3]} />
          <FounderStorySection ref={sectionsRef.current[4]} />
          <ContactCTA ref={sectionsRef.current[5]} />

        </main>
        
      </div>
    </div>
  );
};

export default Home;