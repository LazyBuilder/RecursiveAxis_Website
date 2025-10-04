// src/components/ContactCTA.jsx (REPLACE COMPLETELY)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { colors } from './UIMain';

const ContactCTA = React.forwardRef((props, ref) => (
  // Inherits light body background. Ensure text is dark-ish.
  <FullPageSection id="contact" ref={ref} bgClass="bg-radiant-pulse text-gray-800">
    <motion.div
      className="w-full relative z-10 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-4 animated-gradient">Ready to write your story?</h2>
      <p className={`text-base md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12`}>
        Let's connect and begin shaping your innovation journey.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <a
          href="https://cal.com/asitdeva"
          target="_blank"
          rel="noopener noreferrer"
          className={`px-10 py-4 bg-[${colors.primary}] text-black text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-opacity-90 transform-gpu`}
        >
          Book a Call Today
        </a>
        <a
          href="mailto:ASITDEVA.TORONTO@GMAIL.COM"
          className={`px-10 py-4 bg-[${colors.secondary}] text-black text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform-gpu`}
        >
          Send an Email
        </a>
      </div>
    </motion.div>
  </FullPageSection>
));

export default ContactCTA;