// src/components/ServicesSection.jsx (DARK MODE GLOW EDITION)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
// Assuming you have defined these colors in your scope or a theme file
const PRIMARY_COLOR = '#00EAFF'; // Cyan
const SECONDARY_COLOR = '#FF00EA'; // Magenta
const BACKGROUND_DARK = '#0a0a0a'; // Deep background color
const CARD_DARK = '#1f1f1f'; // Dark card color

// --- Service Data (Based on your provided screenshot) ---
const serviceData = [
  {
    tag: "FOUNDERS",
    title: "ACHIEVE PRODUCT-MARKET FIT.  FASTER.",
    description: "Missing CTO or CPO to lead your tech and product strategy?? Let us plug-in with interim services.",
    tagline: "MAXIMIZE RUNWAY. MINIMIZE ITERATION.",
    color: PRIMARY_COLOR,
  },
  {
    tag: "INVESTORS",
    title: "DE-RISK YOUR INVESTMENTS.",
    description: "Looking for a deep technical due-diligence for your next investment?? Lets unpack the parcel.",
    tagline: "TECHNICAL DILIGENCE. CONFIDENT INVESTMENT.",
    color: SECONDARY_COLOR,
  },
  {
    tag: "CORPORATES",
    title: "EMPOWER INTERNAL INNOVATION.",
    description: "Want to innovate like a startup but still meet your organization standards?? Say no more.",
    tagline: "FROM IDEA TO IPO (Internal Product Offering).",
    color: PRIMARY_COLOR,
  },
];
// --------------------------------------------------------

const ServicesSection = React.forwardRef((props, ref) => (
  <>
    {/* CSS for the Glowing Cards and Global Animated Title */}
    <style>
      {`
        @keyframes global-gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* --- GLOWING CARD STYLES --- */
        .glowing-card {
            position: relative;
            background: ${CARD_DARK};
            border: 2px solid transparent;
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
            transition: all 0.4s ease;
        }
        /* Hover effects use Primary/Secondary colors for the glow */
        .glowing-card-hover-primary:hover {
            box-shadow: 0 0 30px rgba(0, 234, 255, 0.5); /* Cyan glow */
            border-image: linear-gradient(45deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}) 1;
        }
        .glowing-card-hover-secondary:hover {
            box-shadow: 0 0 30px rgba(255, 0, 234, 0.5); /* Magenta glow */
            border-image: linear-gradient(45deg, ${SECONDARY_COLOR}, ${PRIMARY_COLOR}) 1;
        }

        /* Tag Box style (Black box on top of the card) */
        .tag-box {
            background-color: #000;
            color: #fff;
            padding: 8px 16px;
            font-weight: bold;
            font-size: 0.75rem;
            letter-spacing: 1px;
            border-bottom: 2px solid;
        }
      `}
    </style>

    {/* Section Background: Deep Dark Mode */}
    <FullPageSection 
        id="services" 
        ref={ref} 
        style={{ backgroundColor: BACKGROUND_DARK }}
        bgClass="text-white"
    >
      <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-20 px-4">
        
        {/* Title: Uses the consistent global animated gradient class */}
        <motion.h2
          className={`text-4xl md:text-6xl font-extrabold mb-6 animated-gradient h-[unset] h-auto`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          SERVICES & OFFERINGS
        </motion.h2>
        
        {/* === SERVICES GRID CONTAINER === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              // Apply dark card style and glowing hover effect
              className={`glowing-card p-8 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.03] ${index % 2 === 0 ? 'glowing-card-hover-primary' : 'glowing-card-hover-secondary'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
              viewport={{ once: true }}
            >
              
              {/* Tag Box (FOUNDER, INVESTOR, ENTERPRISE) */}
              <div 
                className="tag-box mb-8" 
                style={{ borderBottomColor: service.color }}
              >
                {service.tag}
              </div>
              
              {/* Main Title: Uses accent color */}
              <h3 className="text-2xl font-extrabold mb-3 tracking-widest" style={{ color: service.color }}>{service.title}</h3>
              
              {/* Description: Subtler white text */}
              <p className="text-base text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>
              
              {/* Tagline/Call to Action: Bright accent color */}
              <p className="text-sm font-bold mt-auto" style={{ color: service.color }}>
                {service.tagline}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </FullPageSection>
  </>
));

export default ServicesSection;