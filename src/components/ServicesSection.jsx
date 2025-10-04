// src/components/ServicesSection.jsx (INTERNET DESIGN INSPIRED - GRADIENT OUTLINE)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { serviceData } from './UIMain'; 

// Defined the hex codes based on your input for direct use
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA';
const DARK_TEXT = '#1a1a1a';

const ServicesSection = React.forwardRef((props, ref) => (
  <>
    {/* Define custom CSS styles here for Tailwind JIT to pick up the gradient animation */}
    <style>
      {`
        .animated-heading-gradient {
          background: linear-gradient(45deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}, ${PRIMARY_COLOR});
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-animation-fast 10s ease infinite;
        }

        @keyframes gradient-animation-fast {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Custom class for the card gradient border on hover */
        .gradient-border-hover:hover {
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(45deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}) border-box;
          border: 2px solid transparent;
        }
      `}
    </style>

    <FullPageSection id="services" ref={ref} bgClass="text-gray-800">
      <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
        
        {/* H2 using the new animated gradient class */}
        <motion.h2
          className={`text-3xl md:text-5xl font-extrabold text-center mb-16 animated-heading-gradient`}
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
              // Card Style: White background, subtle shadow, modern gradient border on hover
              className={`relative p-8 rounded-2xl bg-white shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] gradient-border-hover min-w-[300px]`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              viewport={{ once: true }}
            >
              
              {/* Icon color uses the PRIMARY_COLOR (inline style) */}
              <div className={`mb-6`} style={{ color: PRIMARY_COLOR }}>
                {service.icon}
              </div>
              
              {/* Title uses the dark text color (inline style) */}
              <h3 className={`text-xl md:text-2xl font-bold mb-2`} style={{ color: DARK_TEXT }}>{service.title}</h3>
              
              {/* Description uses muted dark gray (Tailwind class) */}
              <p className={`text-sm text-gray-600 mb-4`}>{service.description}</p>
              
              {/* Tagline uses the SECONDARY_COLOR for visual pop (inline style) */}
              <p className={`text-base font-bold mt-auto`} style={{ color: SECONDARY_COLOR }}>{service.tagline}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </FullPageSection>
  </>
));

export default ServicesSection;