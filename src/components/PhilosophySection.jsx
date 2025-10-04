// src/components/PhilosophySection.jsx (WORLD-CLASS CREATIVE REDESIGN: GLASSMORPHISM)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { FaCode, FaPaintBrush, FaDatabase, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

// Defined the hex codes based on your input
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA';
const DARK_BLACK = '#1a1a1a';
const LIGHT_TEXT = '#f0f0f0'; // Used for text on dark/gradient backgrounds

const PhilosophySection = React.forwardRef((props, ref) => {
  
  // --- CAROUSEL DATA (Defined inside the component scope) ---
  const philosophyData = [
    {
      icon: FaCode, 
      title: "Code Excellence",
      description: "Crafting clean, efficient, and scalable code is at the heart of robust digital solutions. We believe in meticulous development and engineering standards that stand the test of time.",
      color: PRIMARY_COLOR,
    },
    {
      icon: FaPaintBrush,
      title: "Intuitive Design",
      description: "We focus on user-centric design that seamlessly blends aesthetics with intuitive functionality, ensuring every digital experience is delightful, effortless, and converts effectively.",
      color: SECONDARY_COLOR,
    },
    {
      icon: FaDatabase,
      title: "Data-Driven Insights",
      description: "Leveraging data is non-negotiable. We inform every decision, optimize strategies, and track measurable growth metrics to ensure your innovation delivers maximum market impact.",
      color: PRIMARY_COLOR,
    },
  ];
  // --------------------------------------------------------
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); 
  const totalCards = philosophyData.length;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) {
      newIndex = totalCards - 1; 
    } else if (newIndex >= totalCards) {
      newIndex = 0; 
    }
    setCurrentIndex(newIndex);
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.5 }
    })
  };

  const currentCard = philosophyData[currentIndex];

  return (
    <>
      {/* Custom CSS for Gradient Background and Icon Styling */}
      <style>
        {`
          .animated-gradient-bg {
            background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 50%, ${PRIMARY_COLOR} 100%);
            background-size: 300% 300%;
            animation: gradient-shift 20s ease infinite;
          }
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          /* Title Gradient: White/Cyan glow for harmony */
          .animated-heading-gradient-v2 {
              background: linear-gradient(45deg, ${LIGHT_TEXT} 10%, ${PRIMARY_COLOR} 50%, ${LIGHT_TEXT} 90%);
              background-size: 300% 300%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradient-animation-v2 12s ease infinite;
          }
          @keyframes gradient-animation-v2 {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
          }
          
          /* Icon Container: Refined glowing ring */
          .icon-container {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR});
            padding: 3px; /* Smaller border thickness */
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.4); /* Subtle white glow */
          }
          
          .icon-circle-fill {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: ${DARK_BLACK};
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .card-content-text {
            color: ${DARK_BLACK};
          }
        `}
      </style>

      <FullPageSection id="philosophy" ref={ref} bgClass="animated-gradient-bg">
        <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-4 px-4 h-full">
          
          {/* 🚨 CHANGE 1: Use the harmonizing gradient title */}
          <motion.h2
            className={`text-4xl md:text-6xl font-extrabold text-center mb-16 animated-heading-gradient-v2`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our Core Philosophy
          </motion.h2>

          {/* === CAROUSEL CONTAINER === */}
          <div className="relative w-full max-w-5xl h-96 flex items-center justify-center">

            {/* Navigation Arrows */}
            <div 
              className="navigation-arrow left-4 md:left-0" 
              onClick={() => paginate(-1)}
            >
              <FaChevronLeft size={20} />
            </div>
            
            <div 
              className="navigation-arrow right-4 md:right-0" 
              onClick={() => paginate(1)}
            >
              <FaChevronRight size={20} />
            </div>

            {/* Card Counter/Dots */}
            <div className="absolute -bottom-8 md:bottom-2 z-30 flex space-x-2">
                {philosophyData.map((_, index) => (
                    <div 
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                            currentIndex === index ? 'bg-white scale-125' : 'bg-white opacity-40 hover:opacity-80'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

            {/* ANIMATED CARD */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                // 🚨 CHANGE 2: Glassmorphism Card Style (Subtle transparency and blur)
                className="absolute w-full p-12 md:p-16 rounded-3xl bg-white bg-opacity-20 backdrop-blur-md shadow-2xl flex flex-col items-center text-center max-w-3xl border border-white border-opacity-30"
              >
                {/* ICON with Gradient Border/Fill */}
                <div className="mb-8 icon-container">
                    <div className="icon-circle-fill">
                        <currentCard.icon 
                            size={45} // Slightly bigger icon
                            style={{ color: currentCard.color }} 
                        />
                    </div>
                </div>
                
                {/* Text Content: White text for contrast on the semi-transparent card */}
                <h3 className="text-3xl font-bold mb-4 text-white">{currentCard.title}</h3>
                <p className="text-base leading-relaxed max-w-xl text-gray-200">
                  {currentCard.description}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </FullPageSection>
    </>
  );
});

export default PhilosophySection;