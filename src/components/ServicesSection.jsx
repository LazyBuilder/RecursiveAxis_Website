// src/components/ServicesSection.jsx (REVISED FOR LIGHT BACKGROUND & ENHANCED CARDS)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { colors, serviceData } from './UIMain';

const ServicesSection = React.forwardRef((props, ref) => (
  // Removed bg-[#0a0a0a]. It now inherits the light body background from Home.jsx.
  // We explicitly set the text color to dark gray for contrast.
  <FullPageSection id="services" ref={ref} bgClass="text-gray-800">
    <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
      <motion.h2
        // Removed animated-gradient class here to ensure dark text on light BG.
        // Using a solid color for high visibility.
        className={`text-3xl md:text-5xl font-extrabold text-center mb-16 text-[${colors.primary}]`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Our Digital Services
      </motion.h2>
      <div className="flex flex-row md:flex-row overflow-x-auto gap-8 max-w-6xl mx-auto no-scrollbar pb-4 md:pb-0">
        {serviceData.map((service, index) => (
          <motion.div
            key={index}
            // === CARD STYLE CHANGE ===
            // 1. Light Card Background (white) with a subtle primary border.
            // 2. Used a slight box-shadow for a floating effect.
            className={`relative p-8 rounded-2xl bg-white border-b-4 border-transparent shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-b-4 hover:border-[${colors.primary}] min-w-[300px]`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Aesthetic element: Colored ribbon/flag on one side */}
            {/* The primary/secondary is alternated for visual interest */}
            <div 
                className={`absolute top-0 left-0 w-2 h-full rounded-l-2xl ${index % 2 === 0 ? `bg-[${colors.primary}]` : `bg-[${colors.secondary}]`}`}
            />
            
            {/* Icon color uses the accent color */}
            <div className={`mb-6 text-[${colors.primary}]`}>
              {service.icon}
            </div>
            
            {/* Title uses a dark color */}
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
            
            {/* Description uses muted dark gray */}
            <p className={`text-sm text-gray-600 mb-4`}>{service.description}</p>
            
            {/* Tagline uses the alternate accent color */}
            <p className={`text-base font-bold text-[${colors.secondary}] mt-auto`}>{service.tagline}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </FullPageSection>
));

export default ServicesSection;