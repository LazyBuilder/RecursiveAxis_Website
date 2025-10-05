// src/components/FounderStorySection.jsx (REPLACE COMPLETELY)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { colors, CodeSVG, DesignSVG, DataSVG } from './UIMain';

const FounderStorySection = React.forwardRef((props, ref) => (
  // Dark Background and white text
  <FullPageSection id="founder-story" ref={ref} bgClass="bg-[#0a0a0a] text-white">
    <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
      <motion.h2 
          className={`text-4xl md:text-6xl font-extrabold text-center mb-16 leading-relaxed global-animated-title`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
      >
          Founder Story
      </motion.h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl">
        <div className="md:w-1/2 flex flex-col items-center text-center max-w-lg leading-relaxed text-base md:text-lg lg:text-xl text-[${colors.mutedText}]">
          <p className="mb-8">
            Asit Deva is a seasoned expert dedicated to helping businesses navigate the complexities of technology and innovation. With a passion for building, advising, and strategizing, he transforms ideas into tangible, successful products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-auto">
            <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <CodeSVG />
              <span className="mt-2 text-2xl md:text-3xl font-bold animated-gradient">12+</span>
              <p className={`text-xs text-[${colors.mutedText}]`}>Years in Software</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <DataSVG />
              <span className="mt-2 text-2xl md:text-3xl font-bold animated-gradient">8+</span>
              <p className={`text-xs text-[${colors.mutedText}]`}>Years in Analytics</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl">
              <DesignSVG />
              <span className="mt-2 text-2xl md:text-3xl font-bold animated-gradient">5+</span>
              <p className={`text-xs text-[${colors.mutedText}]`}>Years in Business</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <motion.div
            className="w-full max-w-md h-auto p-4 bg-white/5 border border-white/10 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden"
            initial={{ rotateY: -10, scale: 0.9 }}
            whileInView={{ rotateY: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,234,255,0.2),transparent_70%)] rounded-full"
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <img src="https://placehold.co/800x600/1a1a1a/fff?text=ASIT+DEVA" alt="Asit Deva" className="w-full h-full object-cover rounded-xl relative z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  </FullPageSection>
));

export default FounderStorySection;