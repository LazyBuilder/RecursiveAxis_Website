// src/components/PhilosophySection.jsx 
// Component: D.I.V.E. FRAMEWORK WITH MODAL - LIGHT MODE DEFAULT

import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Foreign Link: Imports the section wrapper component
import FullPageSection from './FullPageSection'; 
// Imported Icons
import { FaBrain, FaRocket, FaChartLine, FaCogs, FaTimes } from 'react-icons/fa'; 

// --- Color Constants: Defined locally for component styling ---
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA'; 
const CARD_LIGHT = '#ffffff'; // Light card color
const TEXT_DARK = '#1a1a1a';
const TEXT_GRAY = '#6b7280'; 

// --- D.I.V.E. Philosophy Data ---
const diveData = [
  // ... (data remains the same)
  {
    step: 1,
    acronym: 'D',
    icon: FaBrain, 
    title: "Decision: Hypothesis-Led Strategy",
    fullDescription: "We build sharp, data-backed hypotheses based on our best knowledge and technical expertise. This systematic approach ensures we are always investigating the **highest-leverage problems**, giving your project a clear strategic axis from day one.",
    color: PRIMARY_COLOR,
  },
  {
    step: 2,
    acronym: 'I',
    icon: FaRocket,
    title: "Iteration: Velocity-Focused Delivery",
    fullDescription: "Our process demands rapid, high-quality iteration to quickly test core assumptions, maximizing learning and minimizing time-to-market for every feature. We prioritize a lean, fast approach.",
    color: SECONDARY_COLOR,
  },
  {
    step: 3,
    acronym: 'V',
    icon: FaChartLine,
    title: "Validation: Data-Informed Direction",
    fullDescription: "Every iteration is measured against clear, predefined metrics. We use rigorous analytics to validate or pivot hypotheses, ensuring development is always guided by market reality, not just assumption.",
    color: PRIMARY_COLOR,
  },
  {
    step: 4,
    acronym: 'E',
    icon: FaCogs,
    title: "Execution: Technical Excellence",
    fullDescription: "We commit to scalable, robust, and maintainable code architecture. Our focus on technical rigor means the solutions we build are future-proof, easy to deploy, and ready for exponential growth.",
    color: SECONDARY_COLOR,
  },
];
// -------------------------------------------------------------------

// --- 1. Modal Component for Details (Used when a StepCard is clicked) ---
const DiveModal = ({ item, onClose }) => {
    // Framer Motion variants for the modal content
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };
    
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full relative text-gray-900 border border-gray-200"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
            >
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Close"
                >
                    <FaTimes size={24} />
                </button>

                {/* Acronym and Title */}
                <span className="text-8xl font-black mb-4 inline-block" style={{ color: item.color, lineHeight: 0.8 }}>
                    {item.acronym}
                </span>
                <h3 className="text-3xl font-extrabold mb-4 mt-2" style={{ color: TEXT_DARK }}>
                    {item.title}
                </h3>
                
                {/* Full Description */}
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.fullDescription}
                </p>

            </motion.div>
        </motion.div>
    );
};

// --- 2. Clickable Step Card Component (Used in the grid) ---
const StepCard = ({ item, onClick }) => (
    <motion.div
        className="bg-white relative p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl"
        onClick={() => onClick(item)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
    >
        
        {/* Acronym: Large and central */}
        <span className="text-7xl font-black mb-2" style={{ color: item.color }}>
            {item.acronym}
        </span>
        
        {/* Icon: Small and positioned subtly */}
        <div className="absolute top-4 right-4 text-2xl text-gray-400 opacity-80">
            <item.icon /> 
        </div>

        {/* Title */}
        <h4 className="text-lg font-bold mt-2" style={{ color: TEXT_DARK }}>
            {item.title.split(': ')[0]} {/* Show only the first word before the colon */}
        </h4>

        {/* Action Text */}
        <p className="text-xs text-gray-500 mt-4 absolute bottom-2 tracking-wider">
            VIEW DETAILS
        </p>

    </motion.div>
);


// --- 3. Main Philosophy Section Component ---
const PhilosophySection = forwardRef((props, ref) => {
    const [activeItem, setActiveItem] = useState(null); // State to control the modal

    return (
        <>
            {/* Removed explicit dark style prop. It will now inherit the light background from Home.jsx. */}
            <FullPageSection 
                id="philosophy" 
                ref={ref} 
                bgClass="text-gray-800" // Ensures text inside is dark
            >
                <div className="w-full relative z-10 flex flex-col items-center justify-center h-full max-h-full py-16 px-4">
                    
                    {/* Title: Uses the globally injected 'animated-gradient' class (from Home.jsx) */}
                    <motion.h2
                        className={`text-3xl md:text-5xl font-extrabold mb-4 animated-gradient flex-shrink-0`}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        OUR CORE PHILOSOPHY
                    </motion.h2>

                    {/* Subtitle/Summary Text */}
                    <motion.p
                        className="text-base md:text-lg text-gray-600 max-w-3xl text-center mb-12 flex-shrink-0"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        The **D.I.V.E. Framework**: Combining deep tech excellence with expert process execution, we ensure every step of your innovation journey is strategic, measured, and built for scale.
                    </motion.p>


                    {/* === D.I.V.E. FRAMEWORK CARD GRID (Compact) === */}
                    <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 lg:gap-8 flex-shrink">
                        {diveData.map((item) => (
                            <StepCard 
                                key={item.step} 
                                item={item} 
                                onClick={setActiveItem} 
                            />
                        ))}
                    </div>
                </div>
            </FullPageSection>

            {/* Modal Renderer */}
            <AnimatePresence>
                {activeItem && (
                    <DiveModal item={activeItem} onClose={() => setActiveItem(null)} />
                )}
            </AnimatePresence>
        </>
    );
});

export default PhilosophySection;