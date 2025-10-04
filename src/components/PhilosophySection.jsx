// src/components/PhilosophySection.jsx (FINAL DESIGN: NEO-BRUTALISM GRID)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { FaCode, FaPaintBrush, FaDatabase } from 'react-icons/fa'; 

// Defined the hex codes based on your input
const PRIMARY_COLOR = '#00EAFF'; // Cyan
const SECONDARY_COLOR = '#FF00EA'; // Magenta
const DARK_BLACK = '#101010'; // Deep Black
const LIGHT_TEXT = '#f0f0f0'; // Used for text on dark backgrounds

// --- Philosophy Data ---
const philosophyData = [
  {
    icon: FaCode, 
    title: "CODE EXCELLENCE",
    description: "Crafting clean, efficient, and scalable code is the heart of robust digital solutions. We mandate engineering standards that stand the test of time.",
    color: PRIMARY_COLOR,
  },
  {
    icon: FaPaintBrush,
    title: "INTUITIVE DESIGN",
    description: "Focusing on user-centric design that seamlessly blends striking aesthetics with intuitive functionality for delightful, effortless user experiences.",
    color: SECONDARY_COLOR,
  },
  {
    icon: FaDatabase,
    title: "DATA-DRIVEN INSIGHTS",
    description: "Leveraging data to inform every decision, optimize strategies, and track measurable growth for maximum market impact and sustained innovation.",
    color: PRIMARY_COLOR,
  },
];
// -----------------------

const PhilosophySection = React.forwardRef((props, ref) => (
  <>
    {/* Custom CSS for Gradient Background and Text/Element Coloring */}
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
        
        /* Heading Gradient: Sharp contrast on the vibrant background */
        .animated-heading-gradient-v3 {
            background: linear-gradient(90deg, ${LIGHT_TEXT}, ${SECONDARY_COLOR} 50%, ${LIGHT_TEXT});
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradient-animation-v3 8s linear infinite;
        }
        @keyframes gradient-animation-v3 {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
      `}
    </style>

    <FullPageSection id="philosophy" ref={ref} bgClass="animated-gradient-bg">
      <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-20 px-4 h-full">
        
        {/* Title: Using the fast, linear gradient for a high-tech feel */}
        <motion.h2
          className={`text-4xl md:text-6xl font-extrabold text-center mb-16 animated-heading-gradient-v3`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          OUR CORE PHILOSOPHY
        </motion.h2>

        {/* === PHILOSOPHY GRID CONTAINER === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {philosophyData.map((item, index) => (
            <motion.div
              key={index}
              // Card Style: Deep black, sharp edges, primary/secondary top border for accent
              className={`relative p-8 pt-10 rounded-none bg-[${DARK_BLACK}] shadow-2xl flex flex-col transition-all duration-300 hover:scale-[1.02] border-t-4 border-l border-r border-b border-white border-opacity-20`}
              // Set the top border color dynamically
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderTopColor: item.color,
                borderTopWidth: '8px' // Thicker top accent bar
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
              viewport={{ once: true }}
            >
              
              {/* Icon: Large and vibrant on the dark background */}
              <div className="mb-6 text-6xl" style={{ color: item.color }}>
                <item.icon /> 
              </div>
              
              {/* Title: White for maximum contrast */}
              <h3 className="text-2xl font-extrabold mb-3 text-white tracking-widest">{item.title}</h3>
              
              {/* Description: Light gray for readability */}
              <p className="text-base text-gray-300 leading-relaxed">
                {item.description}
              </p>
              
              {/* Subtle Bottom Accent Line on Hover */}
              <div 
                className={`absolute bottom-0 left-0 w-0 h-1 transition-all duration-300`} 
                style={{ backgroundColor: item.color }}
                onMouseEnter={e => e.currentTarget.style.width = '100%'}
                onMouseLeave={e => e.currentTarget.style.width = '0'}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </FullPageSection>
  </>
));

export default PhilosophySection;