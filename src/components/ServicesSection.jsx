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

// --- Service Data (Top 3 focus areas) ---
const serviceData = [
  // ... (service data remains the same)
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

// --- Service Card Component (Used internally) ---
const ServiceCard = ({ service, index }) => (
    <motion.div
      // Card component styling using local constants
      className={`p-6 rounded-xl shadow-lg flex flex-col items-start h-full transition-shadow duration-300 hover:shadow-xl`} 
      style={{ backgroundColor: CARD_LIGHT }} // Use light card background
      // Framer Motion for entrance animation
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      
      {/* Tag Box: Uses the global 'tag-box' CSS class injected in Home.jsx */}
      <div 
        className="tag-box mb-8" 
        style={{ borderBottomColor: service.color, color: TEXT_DARK }} // Text color is dark
      >
        {service.tag}
      </div>
      
      {/* Main Title: Uses accent color */}
      <h3 className="text-2xl font-extrabold mb-3 tracking-widest" style={{ color: TEXT_DARK }}>
        {service.title}
      </h3>
      
      {/* Description */}
      <p className="text-base text-gray-700 leading-relaxed mb-6">
        {service.description}
      </p>
      
      {/* Tagline/Call to Action */}
      <p className="text-sm font-bold mt-auto" style={{ color: service.color }}>
        {service.tagline}
      </p>
    </motion.div>
);


const ServicesSection = React.forwardRef((props, ref) => (
  <>
    {/* 🚨 FIX: Removed explicit dark style prop. It will now inherit the light background from Home.jsx. */}
    <FullPageSection 
      id="services" 
      ref={ref} 
      bgClass="text-gray-800" // Ensures all text inside is dark on light background
    >
      <div className="w-full relative z-10 flex flex-col items-center justify-center h-full max-w-7xl px-4 py-20">
        
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