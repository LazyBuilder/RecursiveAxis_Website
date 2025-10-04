// src/components/PhilosophySection.jsx (REPLACE COMPLETELY)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { colors, philosophyData } from './UIMain';

const PhilosophySection = React.forwardRef((props, ref) => {
  const [activePillar, setActivePillar] = useState('code');

  return (
    // Inherits light body background. Ensure text is dark-ish.
    // NOTE: bgClass here is still used for the internal gradient effect
    <FullPageSection id="philosophy" ref={ref} bgClass={`${philosophyData[activePillar].bgClass} text-gray-800`}>
      <div className="w-full flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-8 animated-gradient">Our Core Philosophy</h2>
        <div className="flex space-x-2 md:space-x-4 mb-12">
          {Object.keys(philosophyData).map((key) => (
            <motion.button
              key={key}
              onClick={() => setActivePillar(key)}
              // Switched button colors for light background visibility
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${activePillar === key ? `bg-[${colors.primary}] text-black shadow-xl` : `bg-gray-300 text-gray-700 hover:bg-gray-400`}`}
            >
              {philosophyData[key].title}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`text-[${colors.primary}] mb-8`}>{philosophyData[activePillar].icon}</div>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">{philosophyData[activePillar].title}</h3>
            <p className={`text-lg md:text-xl text-gray-600 text-center max-w-md`}>{philosophyData[activePillar].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </FullPageSection>
  );
});

export default PhilosophySection;