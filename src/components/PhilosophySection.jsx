// src/components/PhilosophySection.jsx (D.I.V.E. FRAMEWORK WITH MODAL - H-SCREEN SAFE)

import React, { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection';
// Updated Icons to represent the new framework concepts
import { FaBrain, FaRocket, FaChartLine, FaCogs, FaTimes } from 'react-icons/fa'; 

// --- Color Constants (Imported from UIMain, but redefined here for component-level control) ---
const PRIMARY_COLOR = '#00EAFF'; // Cyan
const SECONDARY_COLOR = '#FF00EA'; // Magenta
const BACKGROUND_DARK = '#0a0a0a'; // Deep background color
const CARD_DARK = '#1f1f1f'; // Dark card color
const LIGHT_TEXT = '#ffffff'; // White text

// --- New D.I.V.E. Philosophy Data ---
const diveData = [
  {
    step: 1,
    acronym: 'D',
    icon: FaBrain, 
    title: "Decision: Hypothesis-Led Strategy",
    fullDescription: "We build sharp, data-backed hypotheses based on our best knowledge and technical expertise. This systematic approach ensures we are always investigating the **highest-leverage problems**, giving your project a clear strategic axis from day one. (This aligns with your Data-Informed Direction and Hypothesis-Driven Design initial concepts.)",
    color: PRIMARY_COLOR,
  },
  {
    step: 2,
    acronym: 'I',
    icon: FaRocket,
    title: "Iteration: Velocity-Focused Design",
    fullDescription: "Our process demands **rapid, high-quality iteration** to quickly test our core assumptions. We leverage our scalable methods and hypothesis-driven design to maximize learning and minimize time-to-market for every feature. (This clearly addresses the need for speed, tested methods, and hypothesis-driven design.)",
    color: '#00FFC2', // ACCENT_COLOR_1
  },
  {
    step: 3,
    acronym: 'V',
    icon: FaChartLine,
    title: "Verification: Analytics-Driven Learning",
    fullDescription: "We verify every learning and pivot with **rigorous data analytics**. This step eliminates guesswork and confirms that your iterative efforts are driving measurable growth, not just activity. (This reinforces your technical rigor and the importance of data/analytics.)",
    color: '#FF52A3', // ACCENT_COLOR_2
  },
  {
    step: 4,
    acronym: 'E',
    icon: FaCogs,
    title: "Execution: Scalable Delivery",
    fullDescription: "Once verified, we devise the long-term execution plan with our tested, **scalable methods**. We build a clean, robust foundation that is future-proofed for growth and ensures your vision transforms into a tangible, successful product. (This closes the loop, promising the ultimate outcome: expert, scalable execution.)",
    color: SECONDARY_COLOR,
  },
];
// -----------------------

// --- Modal Component for Details ---
const DiveModal = ({ item, onClose }) => {
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
    };

    return (
        <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-gray-900 border-t-4 p-8 rounded-xl shadow-2xl max-w-2xl w-full relative overflow-hidden"
                style={{ borderColor: item.color }}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()} 
            >
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                    onClick={onClose}
                >
                    <FaTimes size={20} />
                </button>

                <div className="flex items-center mb-4">
                    <item.icon size={36} style={{ color: item.color }} className="mr-3" />
                    <h3 className="text-3xl font-extrabold text-white">
                        {item.acronym} - {item.title}
                    </h3>
                </div>
                
                <hr className="border-gray-700 mb-6" />

                <div className="text-gray-300 space-y-4 text-base overflow-y-auto max-h-[60vh] pr-2">
                    <p className="font-light">{item.fullDescription}</p>
                </div>
                
            </motion.div>
        </motion.div>
    );
};


// --- Clickable Step Card Component ---
const StepCard = ({ item, onClick }) => (
    <motion.div
        className={`glowing-card p-6 rounded-xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl`}
        style={{ borderBottom: `4px solid ${item.color}` }}
        onClick={() => onClick(item)}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.4 }}
    >
        {/* Acronym and Icon */}
        <div className="flex items-center justify-between mb-4">
            <span className="text-5xl font-extrabold" style={{ color: item.color }}>
                {item.acronym}
            </span>
            <div className="text-4xl text-gray-400">
                <item.icon /> 
            </div>
        </div>
        
        {/* Title */}
        <p className="text-base font-semibold text-white tracking-wide">
            {item.title.split(': ')[1]}
        </p>

        <p className="text-xs text-gray-500 mt-2">
            Click for full details
        </p>
    </motion.div>
);


// --- Main Philosophy Section Component ---
const PhilosophySection = forwardRef((props, ref) => {
    const [activeItem, setActiveItem] = useState(null);

    return (
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
                
                /* --- GLOWING CARD STYLES --- */
                .glowing-card {
                    background: ${CARD_DARK};
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); 
                }
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
                <div className="w-full relative z-10 flex flex-col items-center justify-center h-full max-h-full py-16 px-4 overflow-hidden">
                    
                    {/* Title */}
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
                        className="text-base md:text-lg text-gray-400 max-w-2xl text-center mb-8 flex-shrink-0"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        The **D.I.V.E. Framework**: Combining deep tech excellence with expert process execution, we ensure every step of your innovation journey is strategic, measured, and built for scale.
                    </motion.p>


                    {/* === D.I.V.E. FRAMEWORK CARD GRID === */}
                    <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 flex-grow overflow-y-auto pt-4 pb-4">
                        {diveData.map((item, index) => (
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