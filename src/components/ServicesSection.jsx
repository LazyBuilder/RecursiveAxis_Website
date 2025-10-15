// src/components/ServicesSection.jsx 
// Component: Services Section (LIGHT MODE DEFAULT)

import React from 'react';
import { motion } from 'framer-motion';
// Foreign Link: Imports the section wrapper component for consistent layout and scroll behavior.
import FullPageSection from './FullPageSection'; 

// --- Color Constants: Defined locally for clarity but should match UIMain.jsx ---
const PRIMARY_COLOR = '#00EAFF'; // Cyan (for accent)
const SECONDARY_COLOR = '#FF00EA'; // Magenta (for accent)
const CARD_LIGHT = '#ffffff'; // Light card color
const TEXT_DARK = '#1a1a1a';
const TEXT_GRAY = '#6b7280';

// --- Service Data (Top 3 focus areas) ---
const serviceData = [
  {
    tag: "FOUNDERS",
    title: "ACHIEVE PRODUCT-MARKET FIT. FASTER.",
    description: "Missing a CTO or CPO to lead your tech and product strategy? Let us plug-in with interim services.",
    tagline: "MAXIMIZE RUNWAY. MINIMIZE ITERATION.",
    color: PRIMARY_COLOR,
  },
  {
    tag: "INVESTORS",
    title: "DE-RISK YOUR INVESTMENTS.",
    description: "Looking for deep technical due diligence for your next investment? Let's unpack the parcel.",
    tagline: "TECHNICAL DILIGENCE. CONFIDENT INVESTMENT.",
    color: SECONDARY_COLOR,
  },
  {
    tag: "CORPORATES",
    title: "EMPOWER INTERNAL INNOVATION.",
    description: "Want to innovate like a startup but still meet your organization's standards? Say no more.",
    tagline: "FROM IDEA TO IPO (Internal Product Offering).",
    color: PRIMARY_COLOR,
  },
];

// --- Service Card Component (Local Helper) ---
const ServiceCard = ({ service, index }) => {
    // Animation variant for staggered entry
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { 
                duration: 0.6, 
                delay: index * 0.1, 
                ease: "easeOut" 
            } 
        }
    };

    return (
        <motion.div
            className="flex flex-col p-8 rounded-2xl shadow-xl border-t-4 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02] cursor-pointer"
            style={{ 
                backgroundColor: CARD_LIGHT, 
                borderColor: service.color, 
                color: TEXT_DARK 
            }}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            
            {/* Tag Box (FOUNDER, INVESTOR, CORPORATE) */}
            <div 
              className="px-3 py-1 mb-8 text-xs font-bold tracking-widest uppercase rounded-full inline-block self-start" 
              style={{ backgroundColor: service.color, color: TEXT_DARK }}
            >
              {service.tag}
            </div>
            
            {/* Main Title: Uses accent color */}
            <h3 className="text-2xl font-extrabold mb-3 leading-snug" style={{ color: TEXT_DARK }}>{service.title}</h3>
            
            {/* Description: Subtler gray text */}
            <p className="text-base text-gray-700 leading-relaxed mb-6 flex-grow">
              {service.description}
            </p>
            
            {/* Tagline/Call to Action: Bright accent color */}
            <p className="text-sm font-bold mt-auto" style={{ color: service.color }}>
              {service.tagline}
            </p>
        </motion.div>
    );
};


// --- Main ServicesSection Component ---
const ServicesSection = React.forwardRef((props, ref) => (
  <>
    <FullPageSection 
        id="services" 
        ref={ref} 
        bgClass="text-center bg-[#f7f7f7]" // Light background
    >
      <div className="container mx-auto px-4 py-16">
        
        {/* Title: Uses the globally injected 'animated-gradient' class from Home.jsx */}
        <motion.h2
            className={`text-3xl md:text-5xl font-extrabold mb-10 animated-gradient`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            OUR KEY SERVICES
        </motion.h2>

        {/* Services Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {serviceData.map((service, index) => (
            <ServiceCard 
                key={service.title} 
                service={service} 
                index={index} 
            />
          ))}
          
        </div>
        
        {/* Call to Action Button */}
        <motion.a
            href="https://cal.com/asitdeva"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-3 text-lg rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-black`}
            style={{ backgroundColor: PRIMARY_COLOR }} // Primary accent color button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            viewport={{ once: true }}
        >
            Book a Discovery Call.
        </motion.a>
      </div>
    </FullPageSection>
  </>
));

export default ServicesSection;