// src/components/PhilosophySection.jsx 
// Component: D.I.V.E. FRAMEWORK WITH MODAL - LIGHT MODE DEFAULT

import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Foreign Link: Imports the section wrapper component for consistent layout and scroll behavior.
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
    fullDescription: "Our process demands rapid, high-quality iteration to quickly test core assumptions, maximizing learning and minimizing time-to-market for every feature. We prioritize a clean codebase to ensure all velocity is maintained sustainably.",
    color: SECONDARY_COLOR,
  },
  {
    step: 3,
    acronym: 'V',
    icon: FaChartLine,
    title: "Validation: Data-Driven Analytics",
    fullDescription: "Every decision is validated through rigorous analytics and metric-tracking. We close the loop on every feature, ensuring that the results achieved match the initial hypothesis and inform the next strategic 'Decision'.",
    color: PRIMARY_COLOR,
  },
  {
    step: 4,
    acronym: 'E',
    icon: FaCogs,
    title: "Execution: Future-Proof Engineering",
    fullDescription: "High-quality, scalable code is the foundation. We employ best-in-class engineering practices, automated testing, and robust architecture to ensure your product is not just built today, but ready to grow exponentially tomorrow.",
    color: SECONDARY_COLOR,
  },
];

// --- Step Card Component (Local Helper) ---
const StepCard = ({ item, onClick }) => {
    return (
        <motion.div
            className="flex flex-col items-center p-4 sm:p-6 rounded-xl shadow-lg border cursor-pointer h-full justify-center"
            style={{ 
                backgroundColor: CARD_LIGHT, 
                borderColor: `${item.color}50`,
                color: TEXT_DARK 
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            onClick={() => onClick(item)}
            whileHover={{ scale: 1.05, boxShadow: `0 10px 15px -3px ${item.color}40` }}
        >
            <item.icon size={40} className="mb-3" style={{ color: item.color }} />
            <span className="text-3xl font-extrabold mb-1" style={{ color: TEXT_DARK }}>{item.acronym}</span>
            <p className="text-center text-sm font-semibold leading-tight" style={{ color: item.color }}>{item.title.split(': ')[1]}</p>
        </motion.div>
    );
};

// --- Dive Modal Component (Local Helper) ---
const DiveModal = ({ item, onClose }) => {
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };
    
    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm" 
            onClick={onClose}
        >
            <motion.div
                className="bg-white p-8 rounded-xl shadow-2xl max-w-xl w-full m-4 relative text-left"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()} 
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 transition-colors"
                    aria-label="Close modal"
                >
                    <FaTimes size={20} />
                </button>
                
                <item.icon size={50} className="mb-4" style={{ color: item.color }} />

                <h3 className="text-3xl font-extrabold mb-2 leading-snug" style={{ color: TEXT_DARK }}>
                    {item.acronym}: {item.title.split(': ')[1]}
                </h3>
                
                <div className="text-lg font-semibold mb-6" style={{ color: item.color }}>
                    {item.title}
                </div>
                
                <p className="text-gray-700 text-base leading-relaxed">
                    {item.fullDescription}
                </p>
                
                <button
                    onClick={onClose}
                    className={`mt-8 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:opacity-80`}
                    style={{ backgroundColor: item.color, color: TEXT_DARK }}
                >
                    Understood
                </button>
            </motion.div>
        </div>
    );
};


// --- Main PhilosophySection Component ---
const PhilosophySection = forwardRef((props, ref) => {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <>
            <FullPageSection 
                id="philosophy" 
                ref={ref} 
                bgClass="text-center bg-[#f7f7f7] text-[#1a1a1a]" // Light background
            >
                <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
                    
                    {/* Title: Uses the globally injected 'animated-gradient' class from Home.jsx */}
                    <motion.h2
                        className={`text-3xl md:text-5xl font-extrabold mb-4 animated-gradient flex-shrink-0`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        THE RECURSIVE AXIS
                    </motion.h2>

                    {/* Subtitle/Motto */}
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