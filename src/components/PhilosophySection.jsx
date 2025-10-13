// src/components/PhilosophySection.jsx (D.I.V.E. FRAMEWORK VISUAL)

import React from 'react';
import { motion } from 'framer-motion';
import FullPageSection from './FullPageSection';
// Updated Icons to represent the new framework concepts
import { FaBrain, FaRocket, FaChartLine, FaCogs } from 'react-icons/fa'; 

// Defined the hex codes based on your input
const PRIMARY_COLOR = '#00EAFF'; // Cyan
const SECONDARY_COLOR = '#FF00EA'; // Magenta
const BACKGROUND_DARK = '#0a0a0a'; // Deep background color
const CARD_DARK = '#1f1f1f'; // Dark card color
const LIGHT_TEXT = '#ffffff'; // White text
const ACCENT_COLOR_1 = '#00FFC2'; // Lighter accent for steps
const ACCENT_COLOR_2 = '#FF52A3'; // Brighter accent for steps

// --- New D.I.V.E. Philosophy Data ---
const diveData = [
  {
    step: 1,
    icon: FaBrain, 
    title: "D - Decision: Hypothesis-Led Strategy",
    description: "We build sharp, data-backed hypotheses based on our best knowledge and technical expertise, ensuring we investigate the highest-leverage problems.",
    color: PRIMARY_COLOR,
  },
  {
    step: 2,
    icon: FaRocket,
    title: "I - Iteration: Velocity-Focused Design",
    description: "Our process demands rapid, high-quality iteration to quickly test core assumptions, maximizing learning and minimizing time-to-market for every feature.",
    color: ACCENT_COLOR_1,
  },
  {
    step: 3,
    icon: FaChartLine,
    title: "V - Verification: Analytics-Driven Learning",
    description: "We verify every learning and pivot with rigorous data analytics. This step eliminates guesswork and confirms that efforts drive measurable growth, not just activity.",
    color: ACCENT_COLOR_2,
  },
  {
    step: 4,
    icon: FaCogs,
    title: "E - Execution: Scalable Delivery",
    description: "Once verified, we devise the long-term execution plan with our tested, scalable methods. We build a robust foundation, future-proofed for growth and success.",
    color: SECONDARY_COLOR,
  },
];
// -----------------------

// --- New: Component for the Animated Step Card ---
const StepCard = ({ item, index }) => (
    <motion.div
        // Card Style: Applies dark card style and glowing hover effect
        className={`glowing-card p-6 md:p-8 rounded-xl flex flex-col transition-all duration-300 hover:scale-[1.03] overflow-hidden`}
        style={{ borderTop: `4px solid ${item.color}` }}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
        viewport={{ once: true }}
    >
        {/* Step Number and Icon */}
        <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-black" style={{ color: item.color }}>
                {`0${item.step}`}
            </span>
            <div className="text-4xl" style={{ color: item.color }}>
                <item.icon /> 
            </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-extrabold mb-2" style={{ color: LIGHT_TEXT }}>
            {item.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed">
            {item.description}
        </p>
    </motion.div>
);

const PhilosophySection = React.forwardRef((props, ref) => (
  <>
    {/* Custom CSS for the Glowing Cards AND the Global Header Gradient */}
    <style>
      {`
        /* --- GLOBAL TITLE STYLE (For all section headers) --- */
        .global-animated-title {
            background: linear-gradient(45deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR}, ${PRIMARY_COLOR});
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: global-gradient-shift 10s ease infinite;
        }
        @keyframes global-gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* --- GLOWING CARD STYLES (Simplified for the process view) --- */
        .glowing-card {
            background: ${CARD_DARK};
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); 
        }
        /* Add subtle, consistent glow on hover */
        .glowing-card:hover {
            box-shadow: 0 0 15px 3px rgba(0, 234, 255, 0.4); 
        }
      `}
    </style>

    {/* Section Background: Deep Dark Mode */}
    <FullPageSection 
        id="philosophy" 
        ref={ref} 
        style={{ backgroundColor: BACKGROUND_DARK }}
        bgClass="text-white"
    >
      <div className="w-full relative z-10 flex flex-col items-center justify-center pt-24 pb-20 px-4">
        
        {/* Title: Uses the consistent global animated gradient class */}
        <motion.h2
          className={`text-3xl md:text-5xl font-extrabold mb-4 animated-gradient`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          OUR CORE PHILOSOPHY
        </motion.h2>

        {/* Subtitle/Summary Text */}
        <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl text-center mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
        >
            The **D.I.V.E. Framework**: Combining deep tech excellence with expert process execution, we ensure every step of your innovation journey is strategic, measured, and built for scale.
        </motion.p>


        {/* === D.I.V.E. FRAMEWORK VISUAL CONTAINER (Multi-Column Layout) === */}
        <div className="max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* 1. Left Column: Framework Overview/High-Level Context */}
                <motion.div 
                    className="hidden lg:flex flex-col justify-center p-8 rounded-xl"
                    style={{ backgroundColor: CARD_DARK }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-3xl font-extrabold mb-4" style={{ color: PRIMARY_COLOR }}>
                        Recursive Axis
                    </h3>
                    <p className="text-lg text-gray-300 mb-6">
                        We transform ambitious vision into scalable reality by embedding technical rigor at the heart of our strategy. The D.I.V.E. process ensures a systematic transition from hypothesis to robust, market-ready product.
                    </p>
                    <div className="text-sm text-gray-500 border-l-4 pl-4" style={{ borderColor: SECONDARY_COLOR }}>
                        Focus: Hypothesis-Led Strategy, Velocity, Rigorous Analytics, and Future-Proof Execution.
                    </div>
                </motion.div>

                {/* 2. Right Column: The 4 Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                    {diveData.map((item, index) => (
                        <StepCard key={item.step} item={item} index={index} />
                    ))}
                </div>

            </div>
        </div>
      </div>
    </FullPageSection>
  </>
));

export default PhilosophySection;