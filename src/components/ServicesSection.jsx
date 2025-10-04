// src/components/ServicesSection.jsx (FINAL COLOR-CORRECTED VERSION)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { colors, serviceData } from './UIMain'; // Assuming colors object exists for general use

// Defined the hex codes based on your input for direct use
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA';
const DARK_TEXT = '#1a1a1a'; // Assuming this is your dark text color

const ServicesSection = React.forwardRef((props, ref) => (
  // Light Background (inherits from Home.jsx body), explicitly dark text
  <FullPageSection id="services" ref={ref} bgClass="text-gray-800">
    <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
      <motion.h2
        // Using PRIMARY_COLOR for the heading
        className={`text-3xl md:text-5xl font-extrabold text-center mb-16 text-[${PRIMARY_COLOR}]`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Our Digital Services
      </motion.h2>
      
      {/* Container for scrollable service cards */}
      <div className="flex flex-row md:flex-row overflow-x-auto gap-8 max-w-6xl mx-auto no-scrollbar pb-4 md:pb-0">
        {serviceData.map((service, index) => (
          <motion.div
            key={index}
            // Card Style: White background, subtle shadow, hover effect uses PRIMARY_COLOR
            className={`relative p-8 rounded-2xl bg-white border-b-4 border-transparent shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-b-4 hover:border-[${PRIMARY_COLOR}] min-w-[300px]`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            viewport={{ once: true }}
          >
            
            {/* Aesthetic Element: Alternating Primary/Secondary Vertical Ribbon */}
            <div 
                className={`absolute top-0 left-0 w-2 h-full rounded-l-2xl ${index % 2 === 0 ? `bg-[${PRIMARY_COLOR}]` : `bg-[${SECONDARY_COLOR}]`}`}
            />
            
            {/* Icon color uses the PRIMARY_COLOR */}
            <div className={`mb-6 text-[${PRIMARY_COLOR}]`}>
              {service.icon}
            </div>
            
            {/* Title uses the general dark text color */}
            <h3 className={`text-xl md:text-2xl font-bold mb-2 text-[${DARK_TEXT}]`}>{service.title}</h3>
            
            {/* Description uses muted dark gray */}
            <p className={`text-sm text-gray-600 mb-4`}>{service.description}</p>
            
            {/* Tagline uses the SECONDARY_COLOR for visual pop */}
            <p className={`text-base font-bold text-[${SECONDARY_COLOR}] mt-auto`}>{service.tagline}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </FullPageSection>
));

export default ServicesSection;