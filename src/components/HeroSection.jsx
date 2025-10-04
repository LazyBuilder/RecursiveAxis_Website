// src/components/HeroSection.jsx

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { colors } from './UIMain';

const HeroSection = React.forwardRef((props, ref) => (
  <FullPageSection id="home" ref={ref} alwaysVisible={true}>
    <motion.div className="text-center w-full relative z-10 p-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl lg:text-8xl max-w-4xl mx-auto leading-tight font-bold animated-gradient"
      >
        Accelerate Your Innovation Story.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`mt-6 md:mt-8 max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-[${colors.mutedText}]`}
      >
        We help founders, investors, and enterprises write their innovation story through powerful code, elegant design, and insightful data.
      </motion.p>
    </motion.div>
  </FullPageSection>
));

export default HeroSection;