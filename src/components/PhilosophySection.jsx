// src/components/PhilosophySection.jsx (HIGH CONTRAST DESIGN)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
// Assuming React Icons is installed now. If not, use the inline SVGs from previous version.
import { FaCode, FaPaintBrush, FaDatabase } from 'react-icons/fa'; 

// Defined the hex codes based on your input
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA';
const DARK_BLACK = '#1a1a1a'; // Explicitly dark black for text
const LIGHT_TEXT_ON_GRADIENT = '#f0f0f0'; // Used for gradient text (if needed, or replaced by DARK_BLACK)


const PhilosophySection = React.forwardRef((props, ref) => (
  <>
    {/* Define custom CSS styles here for Tailwind JIT to pick up the gradient animation */}
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

        /* If you still want gradient text, this can be reused, otherwise, it's not needed for dark black text */
        /*
        .animated-gradient-text {
            background: linear-gradient(45deg, ${LIGHT_TEXT_ON_GRADIENT}, ${PRIMARY_COLOR}, ${LIGHT_TEXT_ON_GRADIENT});
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-animation-text 15s ease infinite;
        }
        @keyframes gradient-animation-text {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        */
      `}
    </style>

    <FullPageSection id="philosophy" ref={ref} bgClass="animated-gradient-bg"> {/* Removed text-white here */}
      <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-4 px-4">
        
        <motion.h2
          // 🚨 CHANGE 1: Set heading to DARK_BLACK solid color
          className={`text-3xl md:text-5xl font-extrabold text-center mb-16`}
          style={{ color: DARK_BLACK }} // Direct inline style for dark black
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Core Philosophy
        </motion.h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
          {/* Philosophy Card 1: Code */}
          <motion.div
            // 🚨 CHANGE 2: Card background is now solid white, removed opacity and blur
            className="p-8 rounded-2xl bg-white shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl border border-transparent min-w-[300px]" // Removed border, added hover border via style
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ 
                // Adding a subtle border on hover that uses primary color
                border: '2px solid transparent', // Default transparent border
                '--hover-border-color': PRIMARY_COLOR 
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = e.currentTarget.style.getPropertyValue('--hover-border-color')}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div className="mb-6 text-5xl" style={{ color: PRIMARY_COLOR }}>
              <FaCode /> 
            </div>
            {/* 🚨 CHANGE 3: Text color to DARK_BLACK */}
            <h3 className="text-2xl font-bold mb-2" style={{ color: DARK_BLACK }}>Code Excellence</h3>
            <p className="text-sm" style={{ color: DARK_BLACK }}>
              Crafting clean, efficient, and scalable code is at the heart of robust digital solutions. We believe in meticulous development.
            </p>
          </motion.div>

          {/* Philosophy Card 2: Design */}
          <motion.div
            // 🚨 CHANGE 2: Card background is now solid white, removed opacity and blur
            className="p-8 rounded-2xl bg-white shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl border border-transparent min-w-[300px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            style={{ 
                // Adding a subtle border on hover that uses secondary color
                border: '2px solid transparent', 
                '--hover-border-color': SECONDARY_COLOR 
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = e.currentTarget.style.getPropertyValue('--hover-border-color')}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div className="mb-6 text-5xl" style={{ color: SECONDARY_COLOR }}>
              <FaPaintBrush /> 
            </div>
            {/* 🚨 CHANGE 3: Text color to DARK_BLACK */}
            <h3 className="text-2xl font-bold mb-2" style={{ color: DARK_BLACK }}>Intuitive Design</h3>
            <p className="text-sm" style={{ color: DARK_BLACK }}>
              User-centric design that blends aesthetics with functionality, ensuring delightful and effortless user experiences.
            </p>
          </motion.div>

          {/* Philosophy Card 3: Data */}
          <motion.div
            // 🚨 CHANGE 2: Card background is now solid white, removed opacity and blur
            className="p-8 rounded-2xl bg-white shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl border border-transparent min-w-[300px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            style={{ 
                // Adding a subtle border on hover that uses primary color
                border: '2px solid transparent', 
                '--hover-border-color': PRIMARY_COLOR 
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = e.currentTarget.style.getPropertyValue('--hover-border-color')}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
          >
            <div className="mb-6 text-5xl" style={{ color: PRIMARY_COLOR }}>
              <FaDatabase /> 
            </div>
            {/* 🚨 CHANGE 3: Text color to DARK_BLACK */}
            <h3 className="text-2xl font-bold mb-2" style={{ color: DARK_BLACK }}>Data-Driven Insights</h3>
            <p className="text-sm" style={{ color: DARK_BLACK }}>
              Leveraging data to inform decisions, optimize strategies, and drive measurable growth for your innovation.
            </p>
          </motion.div>
        </div>
      </div>
    </FullPageSection>
  </>
));

export default PhilosophySection;