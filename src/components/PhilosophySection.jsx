// src/components/PhilosophySection.jsx (FINAL WORLD-CLASS DESIGN: DARK MODE GLOW)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { FaCode, FaPaintBrush, FaDatabase } from 'react-icons/fa'; 

// Defined the hex codes based on your input
const PRIMARY_COLOR = '#00EAFF'; // Cyan
const SECONDARY_COLOR = '#FF00EA'; // Magenta
const BACKGROUND_DARK = '#0a0a0a'; // Deep background color
const CARD_DARK = '#1f1f1f'; // Dark card color
const LIGHT_TEXT = '#ffffff'; // White text

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
    {/* Custom CSS for the Glowing Border Effect */}
    <style>
      {`
        /* This class creates the gradient border effect */
        .glowing-card {
            position: relative;
            background: ${CARD_DARK};
            border: 2px solid transparent;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            /* Default subtle shadow */
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
            transition: all 0.4s ease;
        }

        /* Hover effect: Apply the glowing shadow and a subtle inner gradient border */
        .glowing-card-hover-primary:hover {
            box-shadow: 0 0 30px rgba(0, 234, 255, 0.5); /* Cyan glow */
            border-image: linear-gradient(45deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}) 1;
        }
        .glowing-card-hover-secondary:hover {
            box-shadow: 0 0 30px rgba(255, 0, 234, 0.5); /* Magenta glow */
            border-image: linear-gradient(45deg, ${SECONDARY_COLOR}, ${PRIMARY_COLOR}) 1;
        }
      `}
    </style>

    {/* Section Background: Deep Dark Mode */}
    <FullPageSection 
        id="philosophy" 
        ref={ref} 
        style={{ backgroundColor: BACKGROUND_DARK }}
        bgClass="text-white"
    >
      <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-20 px-4 h-full">
        
        {/* Title: Clean, Static, Primary-Colored Glow */}
        <motion.h2
          className={`text-4xl md:text-6xl font-extrabold text-center mb-16`}
          style={{ color: PRIMARY_COLOR, textShadow: `0 0 15px rgba(0, 234, 255, 0.4)` }}
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
              // Card Style: Dark background, rounded, applies the glowing effect class
              className={`glowing-card p-10 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] ${index % 2 === 0 ? 'glowing-card-hover-primary' : 'glowing-card-hover-secondary'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
              viewport={{ once: true }}
            >
              
              {/* Icon: Large, White, Simple */}
              <div className="mb-6 text-6xl text-white">
                <item.icon /> 
              </div>
              
              {/* Title: Vibrant Accent Color */}
              <h3 className="text-2xl font-extrabold mb-3 tracking-widest" style={{ color: item.color }}>{item.title}</h3>
              
              {/* Description: Subtler white text */}
              <p className="text-base text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </FullPageSection>
  </>
));

export default PhilosophySection;