// src/components/PhilosophySection.jsx (WORLD-CLASS GRADIENT DESIGN)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
// Assuming React Icons is installed: npm install react-icons
import { FaCode, FaPaintBrush, FaDatabase } from 'react-icons/fa'; 

// Defined the hex codes based on your input
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA';
const DARK_TEXT = '#1a1a1a';
const LIGHT_TEXT = '#f0f0f0'; // For text that sits on a dark gradient background

const PhilosophySection = React.forwardRef((props, ref) => (
  <>
    {/* Define custom CSS styles here for Tailwind JIT to pick up the gradient animation */}
    <style>
      {`
        .animated-gradient-bg {
          background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 50%, ${PRIMARY_COLOR} 100%);
          background-size: 300% 300%; /* Make gradient larger than container */
          animation: gradient-shift 20s ease infinite; /* Slow, smooth shift */
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Gradient for text (similar to Hero, but can be reused) */
        .animated-gradient-text {
            background: linear-gradient(45deg, ${LIGHT_TEXT}, ${PRIMARY_COLOR}, ${LIGHT_TEXT});
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
      `}
    </style>

    {/* The FullPageSection now applies the animated gradient background */}
    <FullPageSection id="philosophy" ref={ref} bgClass="animated-gradient-bg text-white">
      <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-4 px-4">
        
        <motion.h2
          // Using a new gradient for the heading text, designed to stand out on the gradient background
          className={`text-3xl md:text-5xl font-extrabold text-center mb-16 animated-gradient-text`}
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
            className="p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl border border-white border-opacity-20 min-w-[300px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 text-5xl" style={{ color: PRIMARY_COLOR }}>
              <FaCode /> {/* Icon for Code */}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Code Excellence</h3>
            <p className="text-sm text-gray-200">
              Crafting clean, efficient, and scalable code is at the heart of robust digital solutions. We believe in meticulous development.
            </p>
          </motion.div>

          {/* Philosophy Card 2: Design */}
          <motion.div
            className="p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl border border-white border-opacity-20 min-w-[300px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 text-5xl" style={{ color: SECONDARY_COLOR }}>
              <FaPaintBrush /> {/* Icon for Design */}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Intuitive Design</h3>
            <p className="text-sm text-gray-200">
              User-centric design that blends aesthetics with functionality, ensuring delightful and effortless user experiences.
            </p>
          </motion.div>

          {/* Philosophy Card 3: Data */}
          <motion.div
            className="p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl border border-white border-opacity-20 min-w-[300px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 text-5xl" style={{ color: PRIMARY_COLOR }}>
              <FaDatabase /> {/* Icon for Data */}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Data-Driven Insights</h3>
            <p className="text-sm text-gray-200">
              Leveraging data to inform decisions, optimize strategies, and drive measurable growth for your innovation.
            </p>
          </motion.div>
        </div>
      </div>
    </FullPageSection>
  </>
));

export default PhilosophySection;