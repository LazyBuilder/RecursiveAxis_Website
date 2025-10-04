// src/components/ServicesSection.jsx (REPLACE COMPLETELY)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
import { colors, serviceData } from './UIMain';

const ServicesSection = React.forwardRef((props, ref) => (
  // Dark Background and white text
  <FullPageSection id="services" ref={ref} bgClass="bg-[#0a0a0a] text-white">
    <div className="w-full relative z-10 flex flex-col items-center justify-center p-4">
      <motion.h2
        className={`text-3xl md:text-5xl font-extrabold text-center mb-16 animated-gradient`}
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
            className={`relative p-8 rounded-2xl bg-[${colors.cardBg}] border border-transparent backdrop-blur-sm shadow-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-[${colors.cardBorder}] min-w-[300px]`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className={`mb-6 text-[${colors.primary}]`}>
              {service.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{service.title}</h3>
            <p className={`text-sm text-[${colors.mutedText}] mb-4`}>{service.description}</p>
            <p className={`text-base font-bold text-[${colors.primary}] mt-auto`}>{service.tagline}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </FullPageSection>
));

export default ServicesSection;