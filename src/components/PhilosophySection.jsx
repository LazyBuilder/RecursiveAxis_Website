// src/components/PhilosophySection.jsx (FULL-WIDTH CAROUSEL DESIGN)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Used for arrows

// Defined the hex codes based on your input
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA';
const DARK_BLACK = '#1a1a1a';

// --- INLINE SVG ICONS (Reused from previous version) ---
// Note: We need to modify these SVGs to use CSS for the gradient fill, 
// but for simplicity and reliability with dynamic styles, we'll use React Icons for the body,
// and apply the gradient/circle border externally via CSS classes.

const CodeIcon = FaCode;
const DesignIcon = FaPaintBrush;
const DataIcon = FaDatabase;

// The data structure for our carousel
const philosophyData = [
  {
    icon: CodeIcon,
    title: "Code Excellence",
    description: "Crafting clean, efficient, and scalable code is at the heart of robust digital solutions. We believe in meticulous development and engineering standards that stand the test of time.",
    color: PRIMARY_COLOR,
  },
  {
    icon: DesignIcon,
    title: "Intuitive Design",
    description: "We focus on user-centric design that seamlessly blends aesthetics with intuitive functionality, ensuring every digital experience is delightful, effortless, and converts effectively.",
    color: SECONDARY_COLOR,
  },
  {
    icon: DataIcon,
    title: "Data-Driven Insights",
    description: "Leveraging data is non-negotiable. We inform every decision, optimize strategies, and track measurable growth metrics to ensure your innovation delivers maximum market impact.",
    color: PRIMARY_COLOR,
  },
];

const PhilosophySection = React.forwardRef((props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: initial, 1: next, -1: prev

  const totalCards = philosophyData.length;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) {
      newIndex = totalCards - 1; // Wrap around to the end
    } else if (newIndex >= totalCards) {
      newIndex = 0; // Wrap around to the start
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
      {/* Custom CSS for Gradient Background, Icon Fill, and Circle Border */}
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
          
          /* Icon Gradient Fill & Circle Border */
          .icon-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: linear-gradient(to right, ${PRIMARY_COLOR}, ${SECONDARY_COLOR});
            padding: 5px; /* space for the border effect */
          }
          
          .icon-circle-fill {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: ${DARK_BLACK}; /* Dark center for the icon */
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Inner shadow for depth */
          }
          
          .icon-color {
            fill: url(#iconGradient) !important;
            stroke: url(#iconGradient) !important;
          }
          
          .navigation-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 20;
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.3s, transform 0.3s;
          }
          .navigation-arrow:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
          }
          
          /* Hide the SVG icons themselves, we only use them to reference the component */
          .svg-icon {
              width: 40px;
              height: 40px;
          }
        `}
      </style>

      <FullPageSection id="philosophy" ref={ref} bgClass="animated-gradient-bg text-white">
        <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-4 px-4 h-full">
          
          <motion.h2
            className={`text-3xl md:text-5xl font-extrabold text-center mb-16`}
            style={{ color: DARK_BLACK }}
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

            {/* Card Counter/Dots (Optional, but professional) */}
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
                // 🚨 BIGGER CARD STYLE: Full-width, centered, bold
                className="absolute w-full p-12 md:p-16 rounded-3xl bg-white shadow-2xl flex flex-col items-center text-center max-w-3xl"
              >
                {/* ICON with Gradient Border/Fill */}
                <div className="mb-8 icon-container">
                    <div className="icon-circle-fill">
                        {/* We use React Icons here and apply the color/size directly to mimic the gradient look */}
                        <currentCard.icon 
                            size={40} 
                            style={{ color: currentCard.color }} 
                        />
                    </div>
                </div>
                
                {/* Text Content */}
                <h3 className="text-3xl font-bold mb-4" style={{ color: DARK_BLACK }}>{currentCard.title}</h3>
                <p className="text-base leading-relaxed max-w-xl" style={{ color: DARK_BLACK }}>
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