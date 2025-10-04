// src/components/ServicesSection.jsx (FINAL FIX: USING INLINE STYLES FOR COLOR)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { serviceData } from './UIMain'; // Assuming serviceData is imported correctly

// Defined the hex codes based on your input for direct use
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA';
const DARK_TEXT = '#1a1a1a';

const ServicesSection = React.forwardRef((props, ref) => (
  // Light Background (inherits from Home.jsx body), explicitly dark text
  <FullPageSection id="services" ref={ref} bgClass="text-gray-800">
    <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
      <motion.h2
        // Using inline style for the heading color
        style={{ color: PRIMARY_COLOR }}
        className={`text-3xl md:text-5xl font-extrabold text-center mb-16`}
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
            // Card Style: Using Tailwind classes where possible, and inline style for hover border
            className={`relative p-8 rounded-2xl bg-white border-b-4 border-transparent shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-b-4`}
            style={{ 
                // Set the hover border color using inline style
                '--tw-border-opacity': 1, 
                borderColor: 'transparent',
                '--tw-shadow-color': 'rgba(0, 0, 0, 0.1)', // Optional: subtle shadow color
                ...(index % 2 === 0 ? { '--hover-border-color': PRIMARY_COLOR } : { '--hover-border-color': SECONDARY_COLOR }),
                
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = e.currentTarget.style.getPropertyValue('--hover-border-color')}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            viewport={{ once: true }}
          >
            
            {/* Aesthetic Element: Alternating Primary/Secondary Vertical Ribbon (using inline style) */}
            <div 
                className={`absolute top-0 left-0 w-2 h-full rounded-l-2xl`}
                style={{ backgroundColor: index % 2 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR }}
            />
            
            {/* Icon color uses the PRIMARY_COLOR (using inline style) */}
            <div className={`mb-6`} style={{ color: PRIMARY_COLOR }}>
              {service.icon}
            </div>
            
            {/* Title uses the general dark text color (using inline style) */}
            <h3 className={`text-xl md:text-2xl font-bold mb-2`} style={{ color: DARK_TEXT }}>{service.title}</h3>
            
            {/* Description uses muted dark gray (Tailwind class is fine) */}
            <p className={`text-sm text-gray-600 mb-4`}>{service.description}</p>
            
            {/* Tagline uses the SECONDARY_COLOR (using inline style) */}
            <p className={`text-base font-bold mt-auto`} style={{ color: SECONDARY_COLOR }}>{service.tagline}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </FullPageSection>
));

export default ServicesSection;