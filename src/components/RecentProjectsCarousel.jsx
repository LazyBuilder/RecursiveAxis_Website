// src/components/RecentProjectsCarousel.jsx (High-Quality, Robust RENDER)

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FullPageSection from './FullPageSection'; // Assumed to exist
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// ==========================================================
// 🚨 CRITICAL: LOCAL IMAGE IMPORTS - MUST BE 100% CORRECT
// Please confirm the filenames and casing are EXACTLY as below in src/photos/
import MSHImage from '../photos/mshcg-dugapuja.png';    
import VerveImage from '../photos/verve-photography.png';  
// ==========================================================

// Define global constants
const PRIMARY_COLOR = '#00EAFF'; 
const SECONDARY_COLOR = '#FF00EA'; 
const BACKGROUND_LIGHT = '#f7f7f7'; // Slightly off-white for contrast
const TEXT_DARK = '#1a1a1a'; 

// --- PROJECT DATA ---
const projectData = [
  {
    id: 1,
    title: "MSH Cultural Group",
    subheading: "High-Volume Ticketing & Multi-Language Support",
    uniqueAspect: "Seamless **Multi-Language** Support and **High-Volume Ticketing** integrated into a sleek, cultural platform. Built for global scalability.",
    imageSrc: MSHImage, // The imported module
    link: 'https://www.mshculturalgroup.com/',
    color: PRIMARY_COLOR,
  },
  {
    id: 2,
    title: "Verve Photography",
    subheading: "Custom CDN & Immersive Portfolio Delivery",
    uniqueAspect: "An **immersive, high-resolution** image delivery system built on a custom CDN, ensuring zero-latency portfolio viewing worldwide.",
    imageSrc: VerveImage, // The imported module
    link: 'https://verve.photography/',
    color: SECONDARY_COLOR,
  },
];

// Framer Motion carousel configuration
const carouselVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 500 : -500, // Faster, smoother movement
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] } 
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction < 0 ? 500 : -500, 
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] }
  })
};

const RecentProjectsCarousel = React.forwardRef((props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const totalProjects = projectData.length;

    const paginate = (newDirection) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        // Circular logic
        if (newIndex < 0) {
            newIndex = totalProjects - 1; 
        } else if (newIndex >= totalProjects) {
            newIndex = 0; 
        }
        setCurrentIndex(newIndex);
    };

    const currentProject = projectData[currentIndex];

    // Check if image import failed. This helps debug a blank image.
    const isImageValid = currentProject.imageSrc && typeof currentProject.imageSrc === 'string';

    return (
        <>
            {/* CSS STYLES - Encapsulated for cleanliness */}
            <style>
            {`
                /* Title Gradient */
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

                /* --- CLEANED UP PHONE FRAME STYLING --- */
                .responsive-phone-frame {
                    position: relative;
                    width: 25vmin; 
                    max-width: 320px; 
                    aspect-ratio: 9/18; /* Standard mobile ratio */
                    margin: 0 auto;
                    border: 12px solid ${TEXT_DARK}; 
                    border-radius: 48px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                    background-color: ${TEXT_DARK}; 
                    overflow: hidden;
                    transition: all 0.5s ease-in-out;
                }
                .responsive-phone-screen {
                    width: calc(100% + 2px); 
                    height: 100%;
                    border-radius: 36px; 
                    overflow: hidden;
                    transform: translate(-1px, -1px);
                    background-color: white; 
                }
                .responsive-phone-frame::before {
                    content: '';
                    position: absolute;
                    top: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 70px;
                    height: 8px;
                    background-color: #333; /* Notch color */
                    border-radius: 8px;
                    z-index: 10;
                }
                .image-error-box {
                    background-color: #fcebeb;
                    color: #cc0000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    padding: 10px;
                    text-align: center;
                }
            `}
            </style>

            <FullPageSection 
                id="projects" 
                ref={ref} 
                style={{ backgroundColor: BACKGROUND_LIGHT, color: TEXT_DARK }}
                bgClass="text-dark" 
            >
                <div className="w-full relative z-10 flex flex-col pt-16 pb-16 px-4 h-full overflow-hidden">
                    
                    {/* === MAIN TITLE === */}
                    <motion.h2
                        className={`text-4xl md:text-6xl font-extrabold text-center mb-16 global-animated-title`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Recent Projects
                    </motion.h2>

                    {/* === CAROUSEL SLIDE CONTAINER === */}
                    <div className="relative w-full h-full flex items-center justify-center py-8">
                        <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={carouselVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                // Use absolute positioning for carousel item over grid for transition
                                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl mx-auto h-full items-center"
                            >
                                
                                {/* === RIGHT SIDE: PROJECT VISUAL (PHONE FRAME) === */}
                                {/* Place visual first on small screens */}
                                <div className="relative flex flex-col justify-center items-center h-full order-1 md:order-2">
                                    <motion.div 
                                        className="responsive-phone-frame"
                                        whileHover={{ scale: 1.05, rotate: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                    >
                                        <div className="responsive-phone-screen">
                                            {isImageValid ? (
                                                <a 
                                                    href={currentProject.link || '#'}
                                                    target={currentProject.link ? '_blank' : '_self'}
                                                    rel="noopener noreferrer"
                                                    className="absolute inset-0 block"
                                                >
                                                    <img 
                                                        src={currentProject.imageSrc} 
                                                        alt={currentProject.title} 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                </a>
                                            ) : (
                                                <div className="image-error-box w-full h-full">
                                                    <p>IMAGE PATH ERROR: Check imports in **RecentProjectsCarousel.jsx**</p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* === LEFT SIDE: PROJECT TEXT / DESCRIPTION === */}
                                <div className="flex flex-col justify-center p-4 md:p-8 text-center md:text-left order-2 md:order-1">
                                    <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: currentProject.color }}>
                                        {currentProject.title}
                                    </p>
                                    <h3 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-800">
                                        {currentProject.subheading}
                                    </h3>

                                    <div className="mb-6 text-xl text-gray-700 leading-relaxed font-bold">
                                        <p dangerouslySetInnerHTML={{ __html: currentProject.uniqueAspect }}></p>
                                    </div>
                                    
                                    <p className="text-base text-gray-500 italic">
                                        {currentProject.description}
                                    </p>
                                    
                                    {/* Link button (Optional) */}
                                    {currentProject.link && (
                                        <a 
                                            href={currentProject.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-8 self-center md:self-start px-8 py-3 text-base rounded-full font-semibold transition-all duration-300 shadow-xl hover:scale-[1.02] hover:shadow-2xl"
                                            style={{ backgroundColor: currentProject.color, color: TEXT_DARK }}
                                        >
                                            Explore Project &rarr;
                                        </a>
                                    )}
                                </div>

                            </motion.div>
                        </AnimatePresence>

                        {/* === CAROUSEL NAVIGATION (Arrows) === */}
                        <motion.div 
                            className="absolute z-20 left-4 md:left-2 cursor-pointer p-4 rounded-full bg-white hover:bg-gray-200 transition-colors shadow-lg"
                            onClick={() => paginate(-1)}
                        >
                            <FaChevronLeft size={20} color={TEXT_DARK} />
                        </motion.div>
                        <motion.div 
                            className="absolute z-20 right-4 md:right-2 cursor-pointer p-4 rounded-full bg-white hover:bg-gray-200 transition-colors shadow-lg"
                            onClick={() => paginate(1)}
                        >
                            <FaChevronRight size={20} color={TEXT_DARK} />
                        </motion.div>
                        
                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 z-30 flex space-x-2">
                            {projectData.map((_, index) => (
                                <div 
                                    key={index}
                                    className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                                        currentIndex === index ? 'bg-black scale-125 shadow-md' : 'bg-gray-400 opacity-60 hover:opacity-80'
                                    }`}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </FullPageSection>
        </>
    );
});

export default RecentProjectsCarousel;